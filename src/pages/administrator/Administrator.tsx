import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Modal, Row, Form, Col } from 'react-bootstrap'
import Toolbar from '../../helper/tool/Toolbar'
import { PageName } from '../../helper/tool/PageName'
import { useLocation } from 'react-router-dom'
import useOnceCall from '../../util/UseOnecall'

interface TodoListType {
  _id: string
  username: string
  firstname: string
  lastname: string
  role: {
    _id: string
    name: string
  }
  password: string
  profileImage?: string
}

const api_url = 'administrator'
console.log(process.env.REACT_APP_API_URL)
function Administrator() {
  const { pathname } = useLocation()


  const initialState = {
    _id: '',
    username: '',
    firstname: '',
    role: '',
    lastname: '',
    password: ''
  }
  const [formInput, setFormInput] = useState(initialState)
  const [errors, setErrors] = useState() as any
  const [todoLists, setTodoLists] = useState<TodoListType[]>([])
  const [roleDropdown, setRoleDropdown] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [modal, setModal] = useState(false)
  const handleOpenModal = () => {
    setModal(true)
  }
  const handleCloseModal = () => {
    setModal(false)
    setFormInput(initialState)
    setErrors()
  }

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`/${api_url}`)
      .then(resp => setTodoLists(resp.data.data))
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false))
  }, [])

  useOnceCall(() => {
    axios.get(`/role-dropdown`).then((resp) => {
      setRoleDropdown(resp.data)
    })
  }, modal)

  const handleChange = (e: any) => {
    setErrors()
    const { value, name } = e.target
    setFormInput({ ...formInput, [name]: value })
  }

  const handleDelete = async (id: string) => {
    await axios
      .delete(`/${api_url}/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          setTodoLists(todoLists.filter((todo) => todo._id !== id))
        }
      })
      .catch(e => console.log(e))
  }

  const handleSubmit = async () => {
    if (formInput._id) {
      await axios
        .put(`/${api_url}/${formInput._id}`, formInput)
        .then((resp) => {
          if (resp.status === 200) {
            setTodoLists(todoLists.map((todo) => todo._id === formInput._id ? resp.data.data : todo))
            handleCloseModal()
          } else if (resp.status === 201) {
            setErrors(resp.data.data)
          }
        })
        .catch((e) => console.log(e))
    } else {
      await axios
        .post(`/${api_url}`, formInput)
        .then((resp) => {
          if (resp.status === 200) {
            setTodoLists(todoLists.concat(resp.data.data))
            handleCloseModal()
          } else if (resp.status === 201) {
            setErrors(resp.data.data)
          }
        })
        .catch(error => console.log(error.message))
    }
  }

  return (
    <>
      <Toolbar>
        <div className='text-capitalize float-start fs-5 fw-bold'>
          {PageName(pathname)}
        </div>
        <div className='float-end'>
          <button
            onClick={handleOpenModal}
            className='btn btn-primary btn-sm'>
            Add
          </button>

        </div>
      </Toolbar>
      <div className='card'>
        <table className='table'>
          <thead className='text-muted'>
            <tr>
              <th>Info</th>
              <th>Role</th>
              <th className='text-end'>Action</th>
            </tr>
          </thead>
          <tbody className='text-muted'>
            {isLoading ?
              <tr>
                <td colSpan={5}>
                  <div className='text-center'>
                    <div className="spinner-border text-primary h-30px w-30px" />
                  </div>
                </td>
              </tr>
              :
              todoLists.map((todo) => (
                <tr key={todo._id}>

                  <td>
                    <img 
                    src={`${process.env.REACT_APP_API_URL}${todo.profileImage}`} 
                    className='h-30px' />
                    {todo.firstname} {todo.lastname}
                  </td>
                  <td>
                    <span className='badge badge-light-primary'>
                      {todo.role?.name}
                    </span>
                  </td>
                  <td className='text-end'>
                    <button
                      className='btn-icon-primary'
                      onClick={() => {
                        setFormInput({
                          ...formInput,
                          _id: todo._id,
                          firstname: todo.firstname,
                          lastname: todo.lastname,
                          role: todo.role?._id,
                          username: todo.username,
                        })
                        handleOpenModal()
                      }}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className='btn-icon-primary'
                      onClick={() => handleDelete(todo._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Modal show={modal} onHide={handleCloseModal} size='lg'>
          <Modal.Header>
            <Modal.Title className='text-capitalize'>{PageName(pathname)}</Modal.Title>
            <div className='btn btn-icon btn-sm btn-light-primary text-primary' onClick={handleCloseModal}>
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect id="time-3-icon" opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                <rect id="time-3-icon" x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
              </svg>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column lg='3' className='required'>
                Fisrt Name
              </Form.Label>
              <Col lg='9' className='fv-row'>
                <Form.Control
                  type='text'
                  name='firstname'
                  defaultValue={formInput.firstname}
                  onChange={handleChange}
                  isInvalid={!!errors?.firstname}
                  // className={!errors?.firstname && `form-control-solid`}
                  className={`form-control-solid`}
                  placeholder='first-name'
                />
                <Form.Control.Feedback type='invalid'>{errors?.firstname?.message}</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column lg='3' className='required'>
                Last Name
              </Form.Label>
              <Col lg='9' className='fv-row'>
                <Form.Control
                  type='text'
                  name='lastname'
                  defaultValue={formInput.lastname}
                  onChange={handleChange}
                  isInvalid={!!errors?.lastname}
                  // className={!errors?.lastname && `form-control-solid`}
                  className={`form-control-solid`}
                  placeholder='lastname'
                />
                <Form.Control.Feedback type='invalid'>{errors?.lastname?.message}</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-6'>
              <Form.Label column lg='3' className='form-label required'>
                Role
              </Form.Label>
              <Col lg='9' className='fv-row'>
                <Form.Select
                  name='role'
                  value={formInput.role}
                  onChange={handleChange}
                  isInvalid={!!errors?.role}
                  className={`form-select-solid`}
                >
                  <option>Open select role</option>
                  {Object.entries(roleDropdown).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors?.role?.message}</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column lg='3' className='required'>
                Usernmae
              </Form.Label>
              <Col lg='9' className='fv-row'>
                <Form.Control
                  type='text'
                  name='username'
                  defaultValue={formInput.username}
                  onChange={handleChange}
                  isInvalid={!!errors?.username}
                  // className={!errors?.username && `form-control-solid`}
                  className={`form-control-solid`}
                  placeholder='username'
                />
                <Form.Control.Feedback type='invalid'>{errors?.username?.message}</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column lg='3' className='required'>
                Password
              </Form.Label>
              <Col lg='9' className='fv-row'>
                <Form.Control
                  type='text'
                  name='password'
                  defaultValue={formInput.password}
                  onChange={handleChange}
                  isInvalid={!!errors?.password}
                  // className={!errors?.password && `form-control-solid`}
                  className={`form-control-solid`}
                  placeholder='password'
                />
                <Form.Control.Feedback type='invalid'>{errors?.password?.message}</Form.Control.Feedback>
              </Col>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <button
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              {formInput._id ? 'Update' : 'Save'}
            </button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  )
}

export default Administrator

