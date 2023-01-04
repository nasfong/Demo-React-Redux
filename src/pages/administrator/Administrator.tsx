import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Modal, Row, Form, Col } from 'react-bootstrap'
import Toolbar from '../../helper/tool/Toolbar'
import { PageName } from '../../helper/tool/PageName'
import { useLocation } from 'react-router-dom'

interface TodoListType {
  _id: number
  username: string
  firstname: string
  lastname: string
  role: string[]
}

const api_url = 'administrator'

function Administrator() {
  const { pathname } = useLocation()


  const initialState = {
    username: '',
    firstname: '',
    lastname: '',
    password: ''
  }
  const [formInput, setFormInput] = useState(initialState) as any
  const [todoLists, setTodoLists] = useState<TodoListType[]>([])
  const [errors, setErrors] = useState() as any

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
    axios
      .get(`/${api_url}`)
      .then(resp => setTodoLists(resp.data.data))
      .catch((err) => console.log(err.message))
  }, [])

  const handleChange = (e: any) => {
    setErrors()
    const { value, name } = e.target
    setFormInput({ ...formInput, [name]: value })
  }

  const handleDelete = async (id: number) => {
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
          console.log(resp.data)
          if (resp.status === 200) {
            setTodoLists(todoLists.map((todo) => todo._id === formInput._id ? resp.data.data : todo))
            handleCloseModal()
          } else if (resp.status === 201) {
            setErrors(resp.data.data)
          }
        })
        .catch((e) => console.log(e))
    }
    await axios
      .post(`/${api_url}`, formInput)
      .then((resp) => {
        console.log(resp.data)
        if (resp.status === 200) {
          setTodoLists(todoLists.concat(resp.data.data))
          handleCloseModal()
        } else if (resp.status === 201) {
          setErrors(resp.data.data)
        }
      })
      .catch(error => console.log(error.message))
  }

  return (
    <>
      <Toolbar>
        <div className='text-capitalize float-start'>
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
              <th>Name</th>
              <th>Role</th>
              <th className='text-end'>Action</th>
            </tr>
          </thead>
          <tbody className='text-muted'>
            {todoLists.map((todo, index) => (
              <tr key={todo._id}>
                <td>
                  <div className='popup'>
                    <span>Hover</span>
                    <div className="popup-content">
                      <div
                        data-link-hover='true'
                        onClick={() => {
                          setFormInput({
                            ...formInput,
                            _id: todo._id,
                            username: todo.username,
                            firstname: todo.firstname,
                            lastname: todo.lastname,
                          })
                          handleOpenModal()
                        }}
                      >edit</div>
                      <div
                        data-link-hover='true'
                        onClick={() => handleDelete(todo._id)}
                      >delete</div>
                    </div>
                  </div>
                </td>
                <td>{todo.firstname} {todo.lastname}</td>
                <td>{todo.role}</td>
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
                Name
              </Form.Label>
              <Col lg='9' className='fv-row'>
                <Form.Control
                  type='text'
                  name='name'
                  defaultValue={formInput.name}
                  onChange={handleChange}
                  isInvalid={!!errors?.name}
                  // className={!errors?.name && `form-control-solid`}
                  className={`form-control-solid`}
                  placeholder='Todo-name'
                />
                <Form.Control.Feedback type='invalid'>{errors?.name?.message}</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column lg='3' className='required'>
                Url
              </Form.Label>
              <Col lg='9' className='fv-row'>
                <Form.Control
                  type='text'
                  name='url'
                  defaultValue={formInput.url}
                  onChange={handleChange}
                  isInvalid={!!errors?.url}
                  // className={!errors?.url && `form-control-solid`}
                  className={`form-control-solid`}
                  placeholder='url'
                />
                <Form.Control.Feedback type='invalid'>{errors?.url?.message}</Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column lg='3' className='required'>
                Icon
              </Form.Label>
              <Col lg='9' className='fv-row'>
                <Form.Control
                  type='text'
                  name='icon'
                  defaultValue={formInput.icon}
                  onChange={handleChange}
                  isInvalid={!!errors?.icon}
                  // className={!errors?.icon && `form-control-solid`}
                  className={`form-control-solid`}
                  placeholder='icon'
                />
                <Form.Control.Feedback type='invalid'>{errors?.icon?.message}</Form.Control.Feedback>
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

