import { useEffect } from 'react'
import { GlobalStateProvider } from "./helper";
import MenuAside from "./layout/menu/MenuAside";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter } from "react-router-dom";
import Content from "./layout/content/Content";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from "./helper/redux/RootReducer";
import AuthPage from "./layout/auth/AuthPage";
import axios from 'axios';
import { State } from './helper/redux/AuthRedux';

function App() {

  const { user, accessToken } = useSelector<RootState>(({ auth }) => auth, shallowEqual) as State

  const dispatch = useDispatch()
  useEffect(() => {
    if (accessToken) {
      axios.get('/auth/profile').then((resp) => {
        dispatch({ type: 'USERLOAD', payload: resp.data })
      })
        .catch(() => dispatch({ type: 'LOGOUT' }))
    } else {
      dispatch({ type: 'LOGOUT' })
    }
  }, [accessToken])


  return (
    <BrowserRouter>
      {!user ?
        <>
          <AuthPage />
        </>
        :
        <GlobalStateProvider>
          <MenuAside>
            <Content>
              <PrivateRoute />
            </Content>
          </MenuAside>
        </GlobalStateProvider>
      }
    </BrowserRouter>
  )

}

export default App;
