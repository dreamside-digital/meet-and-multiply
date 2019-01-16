import axios from "axios";
import { push } from "gatsby"
import firebase from "../firebase/init";
import slugify from "slugify";
import https from "https";
import { NOTIFICATION_MESSAGES, API_ENDPOINT } from "../utils/constants";

// AUTHENTICATION ------------------------

export function userLoggedIn(user = null) {
  return { type: "USER_LOGGED_IN", user };
}

export function userLoggedOut() {
  return { type: "USER_LOGGED_OUT" };
}

export function toggleRegistrationModal() {
  return { type: "TOGGLE_REGISTRATION_MODAL" };
}

// NOTIFICATIONS ------------------------

export function showNotification(message, color = "success") {
  return { type: "SHOW_NOTIFICATION", message, color };
}

export function closeNotification() {
  return { type: "CLOSE_NOTIFICATION" };
}

export function showNotificationByName(name) {
  return dispatch => {
    const message = NOTIFICATION_MESSAGES[name];
    dispatch((message, "success"));
  };
}

// PAGE EDITING ------------------------

export function toggleEditing() {
  return { type: "TOGGLE_EDITING" };
}

export function toggleNewOriginatorModal() {
  return { type: "TOGGLE_NEW_ORIGINATOR_MODAL" };
}

export function updatePage(pageId, contentId, content) {
  return dispatch => {
    const db = firebase.database();

    db.ref(`pages/${pageId}/content/${contentId}/`).set(content, error => {
      if (error) {
        return dispatch(
          showNotification(
            `There was an error saving your changes: ${error}`,
            "success"
          )
        );
      }

      dispatch(updatePageContent(contentId, content));
      dispatch(
        showNotification(
          "Your changes have been saved. Publish your changes to make them public.",
          "success"
        )
      );
    });
  };
}

export function deploy() {
  return dispatch => {
    const url = `${process.env.GATSBY_DEPLOY_ENDPOINT}`;
    console.log(`Deploy command sent to ${url}`);

    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(token => {
        return axios.get(url, {
          headers: { Authorization: "Bearer " + token }
        });
      })
      .then(res => {
        console.log(res);
        if (res.data.status === "success") {
          dispatch(
            showNotification(
              "The website is being published - this will take a few minutes. Time to go grab a coffee :)",
              "success"
            )
          );
        } else {
          dispatch(
            showNotification(
              `There was an error deploying the site: ${res.data.message}`,
              "danger"
            )
          );
        }
      })
      .catch(err => {
        dispatch(
          showNotification(
            `There was an error deploying the site: ${err}`,
            "danger"
          )
        );
      });
  };
}

export function loadPageData(data) {
  return { type: "LOAD_PAGE_DATA", data };
}

export function updatePageContent(contentId, content) {
  return { type: "UPDATE_PAGE_CONTENT", contentId, content };
}

export function updatePageData(content) {
  return { type: "UPDATE_PAGE_DATA", content };
}

// NAVIGATION ------------------------

export function openMenu() {
  return { type: "OPEN_MENU" };
}

export function closeMenu() {
  return { type: "CLOSE_MENU" };
}

export function showPageLoader() {
  return { type: "SHOW_PAGE_LOADER" };
}

export function hidePageLoader() {
  return { type: "HIDE_PAGE_LOADER" };
}

// FORMS ------------------------

export function submitProjectFormSuccess() {
  return { type: "SUBMIT_PROJECT_FORM_SUCCESS" };
}

export function submitProjectFormError(error) {
  return { type: "SUBMIT_PROJECT_FORM_ERROR" };
}

export function updateForm(data) {
  return { type: "UPDATE_PROJECT_FORM", data };
}

export function submitProjectForm(formData, e) {
  return dispatch => {
    const db = firebase.database();
    const user = slugify(formData.name);
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getTime()}`;
    const submissionId = `${user}-${dateString}`;
    const status = "pending";

    const data = {
      ...formData,
      "submitted-on": date.toString(),
      status
    };

    db.ref(`projectSubmissions/${submissionId}`).update(data, error => {
      if (error) {
        console.log("Error submitting form", error);
        dispatch(submitProjectFormError(error));

        return dispatch(
          showNotification(
            `There was an error submitting your form: ${error}`,
            "success"
          )
        );
      }

      dispatch(submitProjectFormSuccess());
      e.target.submit();
    });
  };
}

// TRACKS ------------------------

export function createOriginator(data) {
  return dispatch => {
    const db = firebase.database();
    db
      .ref("originators")
      .push(data)
      .then(snap => {
        dispatch(toggleNewOriginatorModal());
        dispatch(
          showNotification(
            "Your page has been saved. Publish your changes to view and edit your new page.",
            "success"
          )
        );
      });
  };
}

export function saveOriginatorContent(pageId, contentId, content) {
  return dispatch => {
    const db = firebase.database();

    db
      .ref(`originators/${pageId}/content/${contentId}/`)
      .set(content, error => {
        if (error) {
          return dispatch(
            showNotification(
              `There was an error saving your changes: ${error}`,
              "success"
            )
          );
        }

        dispatch(updatePageContent(contentId, content));
        dispatch(
          showNotification(
            "Your changes have been saved. Publish your changes to make them public.",
            "success"
          )
        );
      });
  };
}

export function saveOriginatorData(pageId, field, content) {
  return dispatch => {
    const db = firebase.database();

    const data = {
      [field]: content
    };

    db
      .ref(`originators/${pageId}`)
      .set(data)
      .then(res => {
        dispatch(updatePageData({ [field]: content }));
        dispatch(
          showNotification(
            "Your changes have been saved. Publish your changes to make them public.",
            "success"
          )
        );
      })
      .catch(err => {
        dispatch(
          showNotification(
            `There was an error saving your changes: ${err}`,
            "danger"
          )
        );
      });
  };
}

// SUBSCRIBERS ------------------------

export function getSubscribers() {
  return dispatch => {
    const db = firebase.database();

    db
      .ref(`subscribers`)
      .once("value")
      .then(snapshot => {
        const subscribers = snapshot.val();
        dispatch(updateSubscribers(subscribers));
      });
  };
}

export function updateSubscribers(subscribers) {
  return { type: "UPDATE_SUBSCRIBERS", subscribers };
}

export function updateSubscriberForm(data) {
  return { type: "UPDATE_SUBSCRIBER_FORM", data };
}

export function createSubscriber(data) {
  return dispatch => {
    const db = firebase.database();
    db
      .ref("subscribers")
      .push(data)
      .then(snap => {
        dispatch(
          showNotification(
            "Thank you for subscribing. We will notify you when applications for Meet & Multiply are open.",
            "success"
          )
        );
      })
      .catch(err => {
        dispatch(
          showNotification(
            "There was an error saving your submission. Please try again.",
            "success"
          )
        );
      });
  };
}


// APPLICANTS ------------------------

export function getApplicants() {
  return dispatch => {
    dispatch(showPageLoader())
    const options = {
      hostname: API_ENDPOINT,
      path: '/applicants',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${process.env.GATSBY_MNM_API_TOKEN}`,
      }
    }

    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => {
        const applicants = JSON.parse(data)
        dispatch(updateApplicants(applicants));
        dispatch(hidePageLoader())
      })
    })

    req.on('error', (error) => {
      console.error(error)
      dispatch(hidePageLoader())
    })

    req.end()
  };
}

export function getApplicant(id) {
  return dispatch => {
    const options = {
      hostname: API_ENDPOINT,
      path: `/applicants/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${process.env.GATSBY_MNM_API_TOKEN}`,
      }
    }

    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => {
        const applicant = JSON.parse(data)
        dispatch(updateApplicant(applicant));
      })
    })

    req.on('error', (error) => {
      console.error(error)
    })

    req.end()
  };
}

export function updateApplicant(applicant) {
  return { type: "UPDATE_APPLICANT", applicant };
}

export function updateApplicants(applicants) {
  return { type: "UPDATE_APPLICANTS", applicants };
}

export function clearForm() {
  return { type: "CLEAR_FORM" }
}

export function updateApplicantStatus(id, status) {
  return dispatch => {
    dispatch(showPageLoader())
    const jsonData = JSON.stringify({ status })

    const options = {
      hostname: API_ENDPOINT,
      path: `/applicants/${id}/update_status`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': jsonData.length,
        'Authorization': `Token token=${process.env.GATSBY_MNM_API_TOKEN}`,
      }
    }

    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => {
        const body = JSON.parse(data)
        dispatch(updateApplicant(body.applicant));
        dispatch(hidePageLoader())
        dispatch(
          showNotification(
            body.message,
            "success"
          )
        );
      })
    })

    req.on('error', (error) => {
      console.error(error)
      dispatch(hidePageLoader())
    })

    req.write(jsonData)
    req.end()
  }
}

export function createApplicant(data) {
  return dispatch => {
    dispatch(showPageLoader())
    const cleanedData = {
      ...data,
      partner_bmodel: data.partner_bmodel.join(", "),
      support_region: data.support_region.join(", "),
      partner_sector: data.partner_sector.join(", "),
      support_type: data.support_type.join(", "),
    }
    const jsonData = JSON.stringify(cleanedData)

    const options = {
      hostname: API_ENDPOINT,
      path: '/applicants',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': jsonData.length,
        'Authorization': `Token token=${process.env.GATSBY_MNM_API_TOKEN}`,
      }
    }

    const req = https.request(options, (res) => {
      if (res.statusCode === 201) {
        dispatch(hidePageLoader())
        dispatch(clearForm())
        dispatch(
          showNotification(
            "Thank you for your application. We will review it within the next week. You should receive an email from us shortly.",
            "success"
          )
        );
      } else {
        console.error(res.statusMessage)
        dispatch(hidePageLoader())
        dispatch(
          showNotification(
            "We were unable to save your application. Please make sure the form is filled in correctly and try again.",
            "error"
          )
        );
      }
    })

    req.on('error', (error) => {
      dispatch(hidePageLoader())
      console.error(error)
    })

    req.write(jsonData)
    req.end()
  };
}

export function deleteApplicant(id) {
  return dispatch => {
    const options = {
      hostname: API_ENDPOINT,
      path: `/applicants/${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${process.env.GATSBY_MNM_API_TOKEN}`,
      }
    }

    const req = https.request(options, (res) => {
      if (res.statusCode === 204) {
        push('/applicants')
        dispatch(hidePageLoader())
        return dispatch(
          showNotification(
            "The application has been deleted.",
            "success"
          )
        );
      }
    })

    req.on('error', (error) => {
      dispatch(hidePageLoader())
      console.error(error)
    })

    req.end()
  };
}
