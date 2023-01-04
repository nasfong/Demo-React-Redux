import { Link } from "react-router-dom"

export const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className=''>
        Opps!
      </h1>
      <Link to='/'>Go HomePages</Link>

    </div>
  )
}