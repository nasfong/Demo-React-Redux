import { NavLink, Outlet } from "react-router-dom"
import { CgChevronDoubleLeftR } from 'react-icons/cg'
import { ActionKind, GlobalState, useGlobal } from '../../helper/index'

const MenuAside = ({ children }: { children: React.ReactNode }) => {

  const { sideMenu, dispatch, menus } = useGlobal() as ReturnType<typeof GlobalState>

  return (
    <div>
      <div className={`sidebar-1 ${sideMenu && 'show-menu'}`}>
        <div className="header">
          <h3 className='logo'>React Typescript</h3>
          <div onClick={() => dispatch({ type: ActionKind.SIDE_MENU, payload: !sideMenu })}>
            <CgChevronDoubleLeftR className={`menu-arrow-menu ${sideMenu ? 'rotate-180' : 'active-arraow'}`} />
          </div>
        </div>
        {/* <div>
          <input type="checkbox" id="button" />
          <label htmlFor="button" className="fas fa-bars"></label>
        </div> */}

        <div className="scrollbox">
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
      </div>

      <div>
        {children}
      </div>
      <Outlet />
    </div>
  )
}

export default MenuAside

