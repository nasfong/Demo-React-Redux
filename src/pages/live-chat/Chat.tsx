import { useState } from 'react'

import ChatModal from "./ChatModal"

const Chat = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='chat'>
      <div className='chat-icon' onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-comments fs-4 p-1"></i>
      </div>

      <ChatModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  )
}

export default Chat