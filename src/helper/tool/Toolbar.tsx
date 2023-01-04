import React from 'react'
import { GlobalState, useGlobal } from '../reducer/GlobalState'

const Toolbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='position-absolute top-0 start-0 end-0 bg-white'>
      <div className={`toolbar`}>
        {children}
      </div>
    </div>
  )
}

export default Toolbar