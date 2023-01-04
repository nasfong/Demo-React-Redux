import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Modal, Row, Form, Col } from 'react-bootstrap'
import Toolbar from '../../helper/tool/Toolbar'
import { PageName } from '../../helper/tool/PageName'
import { useLocation } from 'react-router-dom'

interface TodoListType {
  _id: number
  name: string
  isCompleted: boolean
}

function TodoList() {
  const { pathname } = useLocation()


  const initialState = {
    name: '',
    isCompleted: false
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
      .get('/todo')
      .then(resp => setTodoLists(resp.data.data))
      .catch((err) => console.log(err.message))
  }, [])

  const handleChange = (e: any) => {
    setErrors()
    const { value, name } = e.target
    setFormInput({ ...formInput, [name]: value })
  }

  const handleClick = async ({ _id, name, isCompleted }: TodoListType) => {
    await
      axios.put(`/todo/${_id}`, {
        name: name,
        isCompleted: !isCompleted
      })
        .then((resp) => {
          if (resp.status === 200) {
            setTodoLists(todoLists.map((todo) => todo._id === _id ? resp.data.data : todo))
          }
        })
        .catch((e) => console.log(e))
  }

  const handleDelete = async (id: number) => {
    await axios
      .delete(`/todo/${id}`)
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
        .put(`/todo/${formInput._id}`, formInput)
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
      .post('/todo', formInput)
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
              <th>n#</th>
              <th>No</th>
              <th>Todo</th>
              <th>Is Complete</th>
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
                            name: todo.name,
                            isCompleted: todo.isCompleted
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
                <td>{index + 1}</td>
                <td>{todo.name}</td>
                <td>{todo.isCompleted ?
                  <span className="badge badge-light-success transition">Completed</span>
                  :
                  <span className="badge badge-light-danger transition">Not complete</span>
                }</td>

                <td className='text-end'>
                  <button
                    className={`btn btn-secondary btn-sm me-1`}
                    onClick={() => handleClick({
                      _id: todo._id,
                      name: todo.name,
                      isCompleted: todo.isCompleted
                    })}
                  >{todo.isCompleted ? 'Not Yet' : 'Done'}</button>
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
                {/* Is Completed */}
              </Form.Label>
              <Col lg='9' className='fv-row'>
                <Form.Check
                  type='switch'
                  id="custom-switch"
                  name='isCompleted'
                  checked={formInput.isCompleted ? true : false}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: e.target.name,
                        value: e.target.checked,
                      },
                    })
                  }}
                  isInvalid={!!errors?.isCompleted}
                  // className={!errors?.isCompleted && `form-control-solid`}
                  className={`form-control-solid`}
                  placeholder='image-name'
                  label="Check this switch"
                />
                <Form.Control.Feedback type='invalid'>{errors?.isCompleted?.message}</Form.Control.Feedback>
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

export default TodoList

