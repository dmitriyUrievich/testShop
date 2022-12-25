import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
// const initialState = localStorageService.getAccessToken()
//   ? {
//     entities: [],
//     isLoading: true,
//     error: null,
//     auth: { userId: localStorageService.getUserId() },
//     isLoggedIn: true,
//     dataLoaded: false
//   }
//   : {
//     entities: [],
//     isLoading: false,
//     error: null,
//     auth: null,
//     isLoggedIn: false,
//     dataLoaded: false
//   }

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
  },
  // initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.entities.push(action.payload)
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.isLoggedIn = false
      state.error = action.payload
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    userLoggedOut: (state) => {
      state.entities = []
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)] = action.payload
    },
    authRequested: (state) => {
      state.error =null
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
  userUpdateSuccessed
} = actions

const authRequested = createAction('users/authRequested')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const login = (payload) => async(dispatch) => {
  const { email, password } = payload
  dispatch(authRequested())
  try {
    const { tokens, user } = await authService.login({ email, password })

    localStorageService.setTokens(tokens)

    dispatch(authRequestSuccess(user))
  } catch (error) {
    const message = error.response?.data?.error?.message

    dispatch(authRequestFailed(message))
  }
}
export const signUp = (payload) =>
  async(dispatch) => {
    dispatch(authRequested())
    try {
      const { tokens, user } = await authService.register(payload)
      localStorageService.setTokens(tokens)
      dispatch(authRequestSuccess(user))
    } catch (error) {
      const message = error.response.data.error.message
      dispatch(authRequestFailed(message))
    }
  }
export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
}
export const loadUsersList = () => async(dispatch) => {
  dispatch(usersRequested())
  try {
    const content = await userService.get()
    dispatch(usersReceived(content))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}
export const updateUser = (payload) => async(dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const { content } = await userService.update(payload)
    dispatch(userUpdateSuccessed(content))
  } catch (error) {
    dispatch(userUpdateFailed(error.message))
  }
}

export const getUsers = () => (state) => state.users.entities
export const getCurrentUserData = () => (state) => {
  return state.users.entities
}
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => {
      return u._id === userId
    })
  }
}

export const getAuthUser = () => (state) => {
  if (state.users.isLoggedIn) {
    return state.users.entities[0]
  }
}
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getCurrentUserId = () => (state) => state.users.auth.userId
export const getAuthError = () => (state) => state.users.error
export default usersReducer
