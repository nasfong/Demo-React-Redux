import { createContext, useContext, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
// import { socket } from "../../App";
import { State } from "../redux/AuthRedux";
import { RootState } from "../redux/RootReducer";



export const OnlineCheck = (): {
  online: string[]
} => {
  const { user, accessToken } = useSelector<RootState>(({ auth }) => auth, shallowEqual) as State
  const [online, setOnline] = useState<string[]>([])

  // useEffect(() => {

  //   socket.on('userpush', (data) => {
  //     setOnline(data)
  //     // console.log(data)
  //   })
  // }, [socket])

  return { online }
}

const DataContext = createContext(null) as any

export const useActivity = () => {
  return useContext(DataContext)
}

export function GlobalActivity({ children }: { children: React.ReactNode }) {
  return (
    <DataContext.Provider value={OnlineCheck()}>
      {children}
    </DataContext.Provider>
  )
}