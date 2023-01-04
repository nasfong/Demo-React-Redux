import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './assets/sass/style.scss'

import { Provider } from 'react-redux'
import store, { persistor } from './helper/redux/ReduxStore'
import axios from 'axios'
import setupAxios from './helper/redux/SetupAxios'
import { PersistGate } from 'redux-persist/integration/react'

setupAxios(axios, store)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
