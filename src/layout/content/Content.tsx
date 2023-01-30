import { Outlet } from 'react-router-dom'
import { useGlobal } from '../../helper/index'
import Footer from './Footer'
import Header from './Header'

const Content = ({ children }: { children: React.ReactNode }) => {

  const { sideMenu } = useGlobal()

  return (
    <div>
      <Header />
      <div className='position-relative'>
        <div style={{ height: '80px' }} />
        <div className='mx-3'>
          {children}

        </div>
        {/* <Footer /> */}
      </div>
      <Outlet />
    </div >
  )
}

export default Content
