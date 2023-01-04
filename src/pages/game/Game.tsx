import axios from 'axios'
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { Col, Form, InputGroup, Modal, Overlay, Popover, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { PageName } from '../../helper/tool/PageName'
import Toolbar from '../../helper/tool/Toolbar'

interface Game {
  _id: number
  name: string
  image: string
}

interface ErrorType {
  errors: {
    todo?: {
      message?: string
    },
    isCompleted?: {
      message?: string
    }
  }
  keyValue?: {
    todo?: string
  }
}


const Game = () => {
  const { pathname } = useLocation()

  const [games, setGames] = useState<Game[]>([])
  const [search, setSearch] = useState('')
  const initstate = {
    name: '',
    image: ''
  }
  const [formInput, setFormInput] = useState<any>(initstate)
  const [errors, setErrors] = useState<ErrorType>() as any
  const [isUpdate, setIsUpdate] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const handleOpenModal = () => {
    setModal(true)
    setIsUpdate(false)
  }
  const handleCloseModal = () => {
    setFormInput(initstate)
    setModal(!modal)
    setErrors()
  }
  const handleOpenModal2 = () => {
    setModal(true)
    setModal2(false)
    setIsUpdate(true)
  }
  const handleCloseModal2 = () => {
    setTarget(null)
    setShow(false)
    setModal2(!modal2)
    setFormInput(initstate)
  }
  const ref = useRef(null);
  const handleClick = (event: any) => {
    setShow(!show);
    setTarget(event.target);
  };

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('/game')
      .then((resp) => {
        if (resp.status === 200) {
          setGames(resp.data.data)
        }
        setIsLoading(false)
      })
      .catch(error => console.log(error.message))
  }, [])

  //Search 
  const filterSearch = useMemo(
    () => games.filter((game) => game.name.toLocaleLowerCase().includes(search.toLowerCase()))
    , [games, search])

  const handleChange = (e: any) => {
    setErrors()
    setFormInput({ ...formInput, name: e.target.value })
  }
  const handleImage = (e: any) => {
    setErrors()
    setFormInput({ ...formInput, image: e.target.files[0] })
  }

  //Show Image
  const handleShow = useCallback(({ _id, name, image }: any) => {
    setModal2(true)
    setFormInput({
      ...formInput,
      _id: _id,
      name: name,
      image: image
    })
  }, [])

  //Delete
  const handleDelete = async (_id: any) => {
    await axios
      .delete(`/game/${_id}`)
      .then((resp) => {
        if (resp.status === 200) {
          setGames(games.filter((game) => game._id !== _id))
          handleCloseModal2()
        }
      })
      .catch(err => {
        console.log(err.message)
        handleCloseModal2()
      })
  }
  
  //Submit
  const handleSubmit = () => {
    setIsSubmit(true)
    const formData = new FormData()
    formData.append("filename", formInput.name);
    formData.append("image", formInput.image);
    formData.append("name", formInput.name);
    axios.post('/game', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then((resp) => {
        if (resp.status === 200) {
          setGames(games.concat(resp.data.data))
          handleCloseModal()
        } else if (resp.status === 201) {
          setErrors(resp.data.data)
        }
        setIsSubmit(false)
      })
      .catch((e) => console.log(e))
  }

  //Update
  const handleUpdate = async (data: any) => {
    setIsSubmit(false)
    const formData = new FormData()
    formData.append("filename", data.name);
    formData.append("image", data.image);
    formData.append("name", data.name);
    await axios
      .put(`/game/${data._id}`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setGames(games.map((game) => game._id === data._id ? resp.data.data : game))
          handleCloseModal()
        } else if (resp.status === 201) {
          setErrors(resp.data.data)
        }
        setIsSubmit(false)
      })
  }
  return (
    <div className=''>
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

      <InputGroup className="mb-3">
        <InputGroup.Text>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
          >
            <rect
              opacity='0.5'
              x='17.0365'
              y='15.1223'
              width='8.15546'
              height={2}
              rx={1}
              transform='rotate(45 17.0365 15.1223)'
              fill='black'
            />
            <path
              d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
              fill='black'
            />
          </svg>
        </InputGroup.Text>
        <Form.Control
          size='lg'
          type='text'
          name='search'
          onChange={(e) => setSearch(e.target.value)}
          // className={`form-control-solid`}
          placeholder='Search'
        />
      </InputGroup>

      {/* Image List */}
      <div className='row mt-3 position-relative'>
        {isLoading ?
          <div className="position-absolute top-50 start-50 spinner-border text-primary h-50px w-50px" />
          :

          filterSearch.map(game => (
            <div className='col-lg-4 col-md-6' key={game._id}>
              <div className='card mb-3'>
                <img
                  src={game.image}
                  className="img-fluid rounded-top point-cursor img-dash"
                  alt="Responsive image"
                  onClick={() => handleShow({
                    _id: game._id,
                    name: game.name,
                    image: game.image
                  })}
                />
                <div className='p-1 text-center'>
                  <div className='fw-bolder'>{game.name}</div>
                </div>
              </div>
            </div>
          ))
        }

      </div>

      {/* Modal */}
      <Modal show={modal} onHide={handleCloseModal} size='lg'>
        <Modal.Header>
          <Modal.Title className='text-capitalize'>{PageName(pathname)}</Modal.Title>
          <div className='btn btn-light-primary btn-icon btn-sm ' onClick={handleCloseModal}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect id="time-3-icon" opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
              <rect id="time-3-icon" x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
            </svg>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <div className='image-upload'>
              <Form.Control
                type='file'
                onChange={handleImage}
                className={`input-image`}
                isInvalid={!!errors?.image}
              />

              {formInput.image.name ?
                < img style={{ height: '500px' }} className='w-100 rounded' src={formInput.image && (URL.createObjectURL(formInput.image) || '')} />
                :
                formInput.image ?
                  < img style={{ height: '500px' }} src={formInput.image} className='w-100 rounded' />
                  :
                  <div className='drag-drop-label'>Drag and drop a file or select add File</div>
              }
              <Form.Control.Feedback
                className='invalid'
                type='invalid'
              >
                <span>{errors?.image?.message}</span>
              </Form.Control.Feedback>
            </div>

          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column lg='3' className='required form-label fw-bold fs-6'>
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
                placeholder='image-name'
              />
              <Form.Control.Feedback type='invalid'>{errors?.name?.message}</Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => isUpdate ? handleUpdate(formInput) : handleSubmit()}
            className='btn btn-primary'
            disabled={isSubmit}
          >
            {isUpdate ? 'Update' : 'Save'}
            {isSubmit &&
              <div className="spinner-border text-light h-20px w-20px" />
            }
          </button>
        </Modal.Footer>
      </Modal>

      {/* Image show */}
      <Modal show={modal2} onHide={handleCloseModal2} size='lg'>
        <Modal.Header>
          <Modal.Title className='text-capitalize'>{formInput.name}</Modal.Title>
          <div className='btn btn-icon btn-sm btn-light-primary text-primary' onClick={handleCloseModal2}>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect id="time-3-icon" opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
              <rect id="time-3-icon" x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
            </svg>
          </div>
        </Modal.Header>
        <Modal.Body>
          <img style={{ height: '500px' }} className='w-100 rounded' src={formInput.image && formInput.image} />
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleOpenModal2}
            className='btn btn-primary'
          >
            Edit
          </button>
          <div ref={ref}>
            <button
              onClick={handleClick}
              className='btn btn-danger'
              disabled={show}
            >
              Delete
            </button>
            <Overlay
              show={show}
              target={target}
              placement="top"
              container={ref}
              containerPadding={20}
            >
              <Popover id="popover-contained">
                <Popover.Header as="h3">Are you sure?</Popover.Header>
                <Popover.Body>
                  <button
                    className='btn btn-sm btn-secondary me-2'
                    onClick={() => handleDelete(formInput._id)}
                  >
                    OK
                  </button>
                  <button
                    className='btn btn-sm btn-danger'
                    onClick={handleClick}
                  >
                    Cancel
                  </button>
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>
        </Modal.Footer>
      </Modal>

    </div >
  )
}

export default Game