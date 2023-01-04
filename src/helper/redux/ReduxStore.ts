import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { reduxBatch } from '@manaflair/redux-batch'
import { persistStore } from 'redux-persist'
import { reducers } from './RootReducer'

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  sagaMiddleware,
]

const store = configureStore({
  reducer: reducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
})

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export default store
