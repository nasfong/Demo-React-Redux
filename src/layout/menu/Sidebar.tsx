import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { GlobalState, useGlobal } from '../../helper'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const Sidebar = ({ children }: { children: React.ReactNode }) => {

  const { menus } = useGlobal() as ReturnType<typeof GlobalState>
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    show: {
      width: '140px',
      padding: '5px 15px',
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  }
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    show: {
      width: 'auto',
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className='main-container position-relative'>
      <motion.div
        animate={{
          width: isOpen ? '60px' : '300px',
          transition: {
            duration: 0.5,
            type: 'spring',
            damping: 11
          }
        }}
        className='sidebar'>
        <div className="top_section">
          {!isOpen && <motion.h1
            initial='hidden'
            animate='show'
            exit='hidden'
            variants={showAnimation}
            className='logo'
          >
            React Typescript
          </motion.h1>}
          <div className='bars'>
            <i
              onClick={toggle}
              className="fa-solid fa-bars"></i>
          </div>
        </div>

        <div className="search">
          <div className="search_icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <AnimatePresence>
            {!isOpen &&
              <motion.input
                initial='hidden'
                animate='show'
                exit='hidden'
                variants={inputAnimation}
                placeholder='Search ... ' />
            }
          </AnimatePresence>
        </div>

        <section className='routes mb-auto'>
          {menus.map((menu) => (
            <NavLink
              to={menu.url}
              key={menu._id}
              className='link'
            >
              <div
                className={`icon`}
                dangerouslySetInnerHTML={{ __html: menu.icon }}
              />
              <AnimatePresence>
                {!isOpen &&
                  <motion.div
                    initial='hidden'
                    animate='show'
                    exit='hidden'
                    variants={showAnimation}
                    className='link_text'>
                    {menu.name}
                  </motion.div>
                }
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
        <footer>
          <button
            className='btn btn-light-primary logout'
            onClick={() => dispatch({ type: 'LOGOUT' })}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            {!isOpen && 'Logout'}
          </button>
        </footer>
      </motion.div>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Sidebar
