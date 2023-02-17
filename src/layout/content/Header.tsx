import { shallowEqual, useSelector } from "react-redux"
import { State } from "../../helper/redux/AuthRedux"
import { RootState } from "../../helper/redux/RootReducer"

const Header = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useSelector<RootState>(({ auth }) => auth, shallowEqual) as State
  
  return (
    <div className="content-header d-flex justify-content-center align-items-center px-5 position-relative">
      <div className="">
        <span className="badge badge-primary">Typescript</span>
        <span className="badge badge-danger">Sass</span>
        <span className="badge badge-success">React-bootstrap + Bootstrap5</span>
      </div>
      <div className="position-absolute top-0 end-0">
        <img src={`${process.env.REACT_APP_API_URL}${user?.profileImage}`} className='h-50px w-50px rounded-circle' />
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Header
