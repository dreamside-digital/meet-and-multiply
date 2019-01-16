
export const adminTools = (state={}, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return { ...state, isLoggedIn: true, user: action.user }
    case 'LOCK_FAILURE':
      return { ...state, isLoggedIn: false, error: action.err }
    case 'USER_LOGGED_OUT':
      return { ...state, isLoggedIn: false, isEditingPage: false }
    case 'TOGGLE_EDITING':
      return { ...state, isEditingPage: !state.isEditingPage }
    case 'TOGGLE_REGISTRATION_MODAL':
      return { ...state, showRegistrationModal: !state.showRegistrationModal }
    case 'TOGGLE_NEW_ORIGINATOR_MODAL':
      return { ...state, showNewOriginatorModal: !state.showNewOriginatorModal }
    default:
      return state
  }
}

export const notifications = (state={}, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        message: action.message,
        color: action.color
      }
    case 'CLOSE_NOTIFICATION':
      return {
          ...state,
          message: null,
          color: null
      }
    default:
      return state
  }
}

export const navigation = (state={ isPageLoading: false }, action) => {
  switch (action.type) {
    case 'OPEN_MENU':
      return {
        ...state,
        showMenu: true
      }
    case 'CLOSE_MENU':
      return {
        ...state,
        showMenu: false
      }
    case 'SHOW_PAGE_LOADER':
      return {
        ...state,
        isPageLoading: true
      }
    case 'HIDE_PAGE_LOADER':
      return {
        ...state,
        isPageLoading: false
      }
    default:
      return state
  }
}

export const page = (state={}, action) => {
  switch (action.type) {
    case 'LOAD_PAGE_DATA':
      return {
        ...state,
        data: action.data
      }
    case 'UPDATE_PAGE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.content
        }
      }
    case 'UPDATE_PAGE_CONTENT':
      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            [action.contentId]: action.content
          }
        }
      }
    default:
      return state
  }
}

export const projectForm = (state={}, action) => {
  switch (action.type) {
    case 'UPDATE_PROJECT_FORM':
      return {
        ...state,
        ...action.data
      }
    case 'SUBMIT_PROJECT_FORM_SUCCESS':
      return {
        ...state,
        submitted: true,
      }
    default:
      return state
  }
}

export const originators = (state={}, action) => {
  switch (action.type) {
    case 'UPDATE_ORIGINATOR_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          content: {
            ...state.data.content,
            [action.contentId]: action.content
          }
        }
      }
    default:
      return state
  }
}

const subscriberForm = {
  firstname: "",
  lastname: "",
  company: "",
  position: "",
  email: "",
  referrer: "",
  nationality: "",
  location: "",
  role: "Adopter",
  bmodel: "Choose one",
  orgtype: "",
  interest: "",
  profile: "",
  financing: "",
  additional: "",
  partner_bmodel: [],
  support_region: [],
  partner_sector: [],
  support_type: [],
}

export const subscribers = (state={ form: subscriberForm, subscribers: {} }, action) => {
  switch (action.type) {
    case 'UPDATE_SUBSCRIBERS':
      return {
        ...state,
        subscribers: action.subscribers
      }
    case 'UPDATE_SUBSCRIBER_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          ...action.data
        }
      }
    default:
      return state
  }
}

const applicantForm = {
  firstname: "",
  lastname: "",
  company: "",
  position: "",
  email: "",
  referrer: "",
  nationality: "",
  location: "",
  role: "Adopter",
  bmodel: "",
  orgtype: "",
  interest: "",
  profile: "",
  financing: "",
  additional: "",
  partner_bmodel: [],
  support_region: [],
  partner_sector: [],
  support_type: [],
}

export const applicants = (state={ form: applicantForm, applicants: {}, applicant: {} }, action) => {
  switch (action.type) {
    case 'UPDATE_APPLICANTS':
      return {
        ...state,
        applicants: action.applicants
      }
    case 'UPDATE_APPLICANT':
      return {
        ...state,
        applicant: action.applicant
      }
    case 'UPDATE_APPLICANT_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          ...action.data
        }
      }
    default:
      return state
  }
}

export const appReducers = (state = {}, action) => {
  return {
    notifications: notifications(state.notifications, action),
    adminTools: adminTools(state.adminTools, action),
    navigation: navigation(state.navigation, action),
    page: page(state.page, action),
    projectForm: projectForm(state.projectForm, action),
    subscribers: subscribers(state.subscribers, action),
    applicants: applicants(state.applicants, action),
    originators: originators(state.originators, action),
  }
}

