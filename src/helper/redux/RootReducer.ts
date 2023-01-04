import { combineReducers } from 'redux'

import { authReducer } from './AuthRedux'

export const reducers = combineReducers({
  auth: authReducer
})

export type RootState = ReturnType<typeof reducers>