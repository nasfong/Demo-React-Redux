import axios from 'axios'
import { useReducer, createContext, useContext, useEffect } from 'react'
import { ActionKind, reducer } from './reducer'

export interface Menu {
  _id: number
  name: string
  url: string
  icon: string
}

//reducer
export const GlobalState = (): {
  dispatch: {} | any
  sideMenu: boolean
  menus: Menu[]
} => {
  const initialState = {
    sideMenu: true,
    menus: [],
    toolbar: ''
  }

  const [{ sideMenu, menus }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios
      .get('/menu')
      .then((resp) => {
        dispatch({ type: ActionKind.MENU, payload: resp.data.data })
      })
  }, [])


  return { dispatch, sideMenu, menus }
}

//DataContext
const DataContext = createContext<ReturnType<typeof GlobalState>>({} as ReturnType<typeof GlobalState>)

export const useGlobal = () => {
  return useContext(DataContext)
}

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataContext.Provider value={GlobalState()}>
      {children}
    </DataContext.Provider>
  )
}
