import { useEffect, useState } from 'react'
import { GlobalStateProvider } from "./helper";
// import MenuAside from "./layout/menu/MenuAside";
import PrivateRoute from "./routes/PrivateRoute";
import { HashRouter } from "react-router-dom";
import Content from "./layout/content/Content";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from "./helper/redux/RootReducer";
import AuthPage from "./layout/auth/AuthPage";
import axios from 'axios';
import { State } from './helper/redux/AuthRedux';
import Sidebar from './layout/menu/Sidebar';
import Chat from './pages/live-chat/Chat';
import { io } from 'socket.io-client';
import { GlobalActivity } from './helper/reducer/GlobalActivity';

// export const socket = io(`${process.env.REACT_APP_API_URL}`)

function App() {
  const { user, accessToken } = useSelector<RootState>(({ auth }) => auth, shallowEqual) as State

  const dispatch = useDispatch()
  useEffect(() => {

    if (accessToken) {
      axios.get('/auth/profile').then((resp) => {
        if (resp.status === 200) {
          dispatch({ type: 'USERLOAD', payload: resp.data })
          // socket.emit('userupdate', resp.data.id)
        }
      })
        .catch(() => dispatch({ type: 'LOGOUT' }))
    } else {
      dispatch({ type: 'LOGOUT' })
    }
  }, [accessToken])
  // useEffect(() => {

  //   socket.on('userpush', (data) => {
  //     console.log(data)
  //   })

  //   console.log('sock')
  // }, [socket])




  return (
    <HashRouter >
      {!user ?
        <>
          <AuthPage />
        </>
        :
        <GlobalActivity>
          <GlobalStateProvider>
            {/* <MenuAside> */}
            <Sidebar>
              <Content>
                <PrivateRoute />
              </Content>

              <Chat />
            </Sidebar>
            {/* </MenuAside> */}
          </GlobalStateProvider>
        </GlobalActivity>
      }
    </HashRouter >
  )

}

export default App;
