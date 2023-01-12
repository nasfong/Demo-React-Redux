import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Modal, Row, Form, Col } from 'react-bootstrap'
import Toolbar from '../../helper/tool/Toolbar'
import { PageName } from '../../helper/tool/PageName'
import { useLocation } from 'react-router-dom'

interface TodoListType {
  _id: string
  name: string
  permission: [{
    _id: string
    name: string
  }]
}

const api_url = 'role'

function Role() {
  const { pathname } = useLocation()

  const initialState = {
    name: '',
  }
  const [formInput, setFormInput] = useState(initialState) as any
  const [todoLists, setTodoLists] = useState<TodoListType[]>([])
  const [errors, setErrors] = useState() as any
  const [isSubmit, setIsSubmit] = useState(false)

  const [modal, setModal] = useState(false)
  const handleOpenModal = () => {
    setModal(true)
  }
  const handleCloseModal = () => {
    setModal(false)
    setFormInput(initialState)
    setErrors()
  }

  const dataFetch = async () => {
    axios
      .get(`/${api_url}`)
      .then(resp => setTodoLists(resp.data.data))
      .catch((err) => console.log(err.message))
  }

  useEffect(() => {
    dataFetch()
  }, [])

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
    setIsSubmit(true)
    if (formInput._id) {
      await axios
        .put(`/${api_url}/${formInput._id}`, formInput)
        .then((resp) => {
          if (resp.status === 200) {
            // setTodoLists(todoLists.map((todo) => todo._id === formInput._id ? resp.data.data : todo))
            dataFetch()
            handleCloseModal()
          } else if (resp.status === 201) {
            setErrors(resp.data.data)
          }
          setIsSubmit(false)
        })
        .catch((e) => console.log(e))
    } else {
      await axios
        .post(`/${api_url}`, formInput)
        .then((resp) => {
          if (resp.status === 200) {
            dataFetch()
            // setTodoLists(todoLists.concat(resp.data.data))
            handleCloseModal()
          } else if (resp.status === 201) {
            setErrors(resp.data.data)
          }
          setIsSubmit(false)
        })
        .catch(error => console.log(error.message))
    }
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
      <div className='colunm-auto-150px'>
        {todoLists.map((todo, index) => (
          <div key={todo._id} className='card card-body'>
            <div className='fs-5'>{todo.name}</div>
            <div className='my-10'>
              {todo.permission.map((roles, index) => (
                <div key={index} className="blockquote-footer">
                  {roles.name}
                </div>
              ))}
            </div>
            <div>
              <button
                className='btn btn-light-primary btn-sm'
                onClick={() => {
                  setFormInput({
                    ...formInput,
                    _id: todo._id,
                    name: todo.name,
                  })
                  handleOpenModal()
                }}>
                Edit
              </button>
              <button
                className='btn btn-light-danger btn-sm'
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}


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
                  className={`form-control-solid`}
                  placeholder='name'
                />
                <Form.Control.Feedback type='invalid'>{errors?.name?.message}</Form.Control.Feedback>
              </Col>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <button
              className='btn btn-primary'
              onClick={handleSubmit}
              disabled={isSubmit}
            >
              {formInput._id ? 'Update' : 'Save'} {' '}
              {isSubmit &&
                <div className="spinner-border text-light h-20px w-20px" />
              }
            </button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  )
}

export default Role

