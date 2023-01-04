import { useEffect, useState } from 'react'
import axios from 'axios'
import GameSlider from './slider/GameSlider'
import { Chart1 } from './charts/Chart1'

export interface DashboadType {
  id: number
  name: string
}


const Dashboard = () => {
  const [dashboards, setdashboards] = useState<DashboadType[]>([])

  useEffect(() => {

  }, [])

  return (
    <div className='m-1'>
      <div className='row'>
        <div className='card card-body col-6 border'>
          <GameSlider />
        </div>
        <div className='card card-body col-6'>
          {/* <Chart1 /> */}
        </div>
      </div>

    </div>
  )
}

export default Dashboard

