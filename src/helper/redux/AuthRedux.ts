import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export interface State {
  accessToken?: string
  user?: {
    firstname: string
    lastname: string
    username: string
    role?: string[]
    profile?: string
    accessToken: string
  }
}
interface Action {
  type: any
  payload?: any
}

const initialState = {
  user: undefined,
  accessToken: undefined
}

export const authReducer =
  persistReducer(
    { storage, key: 'v100-demo1-auth', whitelist: ['user', 'accessToken'] },
    (state: State = initialState, action: Action) => {
      switch (action.type) {
        case 'LOGIN':
          return { ...state, accessToken: action.payload, user: undefined }
        case 'USERLOAD':
          return { ...state, user: action?.payload }
        case 'LOGOUT':
          localStorage.clear()
          return initialState
        default:
          return state
      }
    }
  )