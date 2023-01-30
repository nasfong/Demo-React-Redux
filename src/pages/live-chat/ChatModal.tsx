import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { shallowEqual, useSelector } from 'react-redux'
import { State, User } from '../../helper/redux/AuthRedux'
import { RootState } from '../../helper/redux/RootReducer'
import { io } from 'socket.io-client'
import useOnceCall from '../../util/UseOnecall'
import { ChatItem } from './components/ChatItem'
// import { socket } from '../../App'
import { OnlineCheck } from '../../helper/reducer/GlobalActivity'


type Props = {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}

export type Chat = {
  _id: string
  name: string
  user: {
    _id: string
    profileImage: string
  }
  createdAt: string
}
const ChatModal = ({ showModal, setShowModal }: Props) => {

  const { user } = useSelector<RootState>(({ auth }) => auth, shallowEqual) as State
  const { online } = OnlineCheck()

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [message, setMessage] = useState<string>('')
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dataFetch = async () => {
    setIsLoading(true)
    await axios.get('/chat').then((res) => {
      if (res.status === 200) {
        setChats(res.data.data)
        setIsLoading(false)
      }
    })
  }

  useOnceCall(() => {
    dataFetch()
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }, showModal)

  // useEffect(() => {
  //   socket.on('recv_message', (data) => {
  //     dataFetch()
  //     const delayDebounceFn = setTimeout(() => {
  //       scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  //     }, 500)
  //     return () => clearTimeout(delayDebounceFn)
  //   })

  // }, [socket])

  const handleCloseModal = () => setShowModal(!showModal)

  const handleSend = async () => {
    await axios.post('chat', {
      name: message,
      user: user?.id
    }).then((resp) => {
      // if (resp.status === 200) {
      //   socket.emit('send_message', resp.data.data)
      // }
      setMessage('')
    }).catch((err) => console.log(err))
  }

  const onKeyDown = async (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      await axios.post('chat', {
        name: message,
        user: user?.id
      }).then((resp) => {
        // if (resp.status === 200) {
        //   socket.emit('send_message', resp.data.data)
        // }
        setMessage('')
      }).catch((err) => console.log(err))
      setMessage('')
    }
  }


  return (
    <Modal show={showModal} onHide={handleCloseModal} scrollable className='scroll'>
      <Modal.Body className='h-600px'>
        <div className=''></div>

        {isLoading ?
          <div className='position-relative' >
            <div className='owner_chat'>
              <div className='chat_text skeleton w-100px mb-1' />
              <div className='chat_text skeleton w-75px' />
            </div>
            <span className='h-20px w-20px skeleton rounded-circle position-absolute top-50 end-0 border border-2' />
          </div>
          :

          chats.map((chat) => (
            <ChatItem
              key={chat._id}
              chat={chat}
              user={user}
              online={online}
            />
          ))
        }
        <div />
        <div ref={scrollRef}></div>
      </Modal.Body>
      <Modal.Footer>
        <InputGroup>
          <Form.Control
            type='text'
            name='icon'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`form-control-solid py-0`}
            placeholder='Message'
            onKeyDown={onKeyDown}
          />
          {message.length > 0 &&
            <InputGroup.Text className='form-control-solid'>
              <button className='btn btn-primary btn-sm' onClick={handleSend}>
                send
              </button>
            </InputGroup.Text>
          }
        </InputGroup>
      </Modal.Footer>

    </Modal >
  )
}



export default ChatModal

