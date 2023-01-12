import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Modal, Row, Form, Col } from 'react-bootstrap'
import Toolbar from '../../helper/tool/Toolbar'
import { PageName } from '../../helper/tool/PageName'
import { useLocation } from 'react-router-dom'
import useOnceCall from '../../util/UseOnecall'

interface TodoListType {
  _id: string
  name: string
  role: [{
    _id: string
    name: string
  }]
}

const api_url = 'permission'

function Permission() {
  const { pathname } = useLocation()

  const [errors, setErrors] = useState() as any
  const [isSubmit, setIsSubmit] = useState(false)

  const initialState = {
    _id: '',
    name: '',
    role: []
  }
  const [formInput, setFormInput] = useState(initialState) as any
  const [todoLists, setTodoLists] = useState<TodoListType[]>([])
  const [roleDropdown, setRoleDropdown] = useState([])

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

  const handleChangeSelectMulti = (e: any) => {
    setErrors({})
    let value = Array.from(e.target.selectedOptions, (option: any) => option.value)
    setFormInput({ ...formInput, role: value })
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
            // setTodoLists(todoLists.concat(resp.data.data))
            dataFetch()
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
      <div className='card'>
        <table className='table'>
          <thead className='text-muted'>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th className='text-end'>Action</th>
            </tr>
          </thead>
          <tbody className='text-muted'>
            {todoLists.map((todo, index) => (
              <tr key={todo._id}>
                <td>{todo.name}</td>
                <td>
                  {todo.role.map((roles, index) => (
                    <span key={index} className='badge badge-light-info'>
                      {roles.name}
                    </span>
                  ))}
                </td>
                <td className='text-end'>
                  <button
                    className='btn-icon-primary'
                    onClick={() => {
                      setFormInput({
                        ...formInput,
                        _id: todo._id,
                        name: todo.name,
                        role: todo.role.map((value) => value._id)
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
            <Form.Group as={Row} className='mb-6'>
              <Form.Label column lg='3' className='form-label required'>
                Role
              </Form.Label>
              <Col lg='9' className='fv-row'>
                <Form.Select
                  name='role'
                  value={formInput.role}
                  onChange={handleChangeSelectMulti}
                  isInvalid={!!errors?.role}
                  className={`form-select-solid`}
                  multiple={true}
                >
                  {Object.entries(roleDropdown).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors?.role?.message}</Form.Control.Feedback>
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

export default Permission

