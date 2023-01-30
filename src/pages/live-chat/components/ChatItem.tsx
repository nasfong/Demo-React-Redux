import { User } from "../../../helper/redux/AuthRedux"
import { useDate } from "../../../util/useDate"
import { Chat } from "../ChatModal"

type ChatItemProps = {
  chat: Chat
  user: User | undefined
  online: string[]
}

export function ChatItem({ chat, user, online }: ChatItemProps) {
  const status = online.includes(chat.user._id)
  return (
    chat.user._id === user?.id ? (
      <div className='position-relative'>
        <div className='owner_chat'>
          <div className='chat_text'>
            {chat.name}
          </div>
          <div className='date'>
            {useDate(chat.createdAt)}
          </div>
        </div>
        <img
          src={`${process.env.REACT_APP_API_URL}${chat.user.profileImage}`}
          className={`
          h-25px w-25px rounded-circle 
          position-absolute top-50 end-0 
          border border-2  
          ${status ? 'border-success' : ''}
          `}
        />

      </div>
    ) : (
      <div className='position-relative' key={chat._id}>
        <div className='other_chat'>
          <div className='chat_text'>
            {chat.name}
          </div>
          <div className='date'>
            {useDate(chat.createdAt)}
          </div>
        </div>
        <img
          src={`${process.env.REACT_APP_API_URL}${chat.user.profileImage}`}
          className={`
          h-25px w-25px rounded-circle 
          position-absolute top-50 start-0
          border border-2  
          ${status ? 'border-success' : ''}
          `}
        />
      </div>
    )
  )
}