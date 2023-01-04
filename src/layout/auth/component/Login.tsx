import axios from 'axios'
import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { redirect } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()

  const [isSubmit, setIsSubmit] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [formInput, setFormInput] = useState({
    username: 'admin',
    password: '12345678'
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormInput({ ...formInput, [name]: value })
    setErrors({})
  }

  const handleSubmit = async () => {
    setIsSubmit(true)
    await axios
      .post('/auth/login', formInput)
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({ type: 'LOGIN', payload: resp.data.token })
          redirect("/")
        }
        setIsSubmit(false)
      })
      .catch((error) => {
        console.log(error.message)
        setIsSubmit(false)
      }
      )
  }



  return (
    <div>
      <h1>Sign In</h1>
      Username
      <Form.Group as={Row} className='mb-3'>
        <Form.Control
          type='text'
          name='username'
          defaultValue={formInput.username}
          onChange={handleChange}
          isInvalid={!!errors?.username}
          className={`form-control-solid`}
        // className={!errors?.username && `form-control-solid`}
        />
        <Form.Control.Feedback type='invalid'>{errors?.username?.message}</Form.Control.Feedback>
      </Form.Group>
      <div className='mb-10'>
        Password
        <Form.Group as={Row}>
          <Form.Control
            type='password'
            name='password'
            defaultValue={formInput.password}
            onChange={handleChange}
            isInvalid={!!errors?.password}
            className={`form-control-solid`}
            // className={!errors?.password && `form-control-solid`}
          />
          <Form.Control.Feedback type='invalid'>{errors?.password?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <button
        className='btn btn-primary w-100'
        onClick={handleSubmit}
        disabled={isSubmit}
      >
        Login
        {isSubmit &&
          <div className="spinner-border text-light h-20px w-20px" />
        }
      </button>
    </div>
  )
}

export default Login