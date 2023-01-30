import { NavLink, Outlet } from "react-router-dom"
import { CgChevronDoubleLeftR } from 'react-icons/cg'
import { ActionKind, GlobalState, useGlobal } from '../../helper/index'
import { useDispatch } from "react-redux"

const MenuAside = ({ children }: { children: React.ReactNode }) => {

  const { sideMenu, dispatch, menus } = useGlobal() as ReturnType<typeof GlobalState>
  const dispatch1 = useDispatch()

  return (
    <div>
      <div className={`sidebar-1 `} id='aside' >
        <div className="header">
          <h3 className='logo'>React Typescript</h3>
          <div onClick={() => dispatch({ type: ActionKind.SIDE_MENU, payload: !sideMenu })} id='toggle' data-toggle='true'>
            <CgChevronDoubleLeftR className={`menu-arrow-menu ${sideMenu ? 'rotate-180' : 'active-arraow'}`} />
          </div>
        </div>
        <div className="scrollbox mb-auto">
          <div className="scrollbox-inner">
            {menus.map((menu) => (
              <div key={menu._id} className='menu-link'>
                <NavLink to={menu.url} className={({ isActive }) =>
                  isActive ? 'active link' : 'link'
                }>
                  <div dangerouslySetInnerHTML={{ __html: menu.icon }} />
                  {menu.name}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <button
          className='btn btn-light-primary'
          id='logout'
          onClick={() => dispatch1({ type: 'LOGOUT' })}
        >
          Logout
        </button>
      </div>

      <div>
        {children}
      </div>
      <Outlet />
    </div>
  )
}

export default MenuAside

