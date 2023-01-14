import React, { useRef, useEffect } from 'react'

import '../styles/home.scss'

const Home = () => {
  
  const websocket = useRef()

  useEffect(() => {

    let update = (data) => {
      console.log(data.user)
      let chat_box = document.querySelector('#websocket-message')
      let chat = document.createElement('p') 
      let message = document.createTextNode(data.message);

      chat.append(message)
      chat.classList.add('Message')
      chat_box.append(chat)

      document.querySelector('#message-box').value = ''
      
      if (data.user) {
        chat.classList.add('UserMessage')
      }
      else {
        chat.classList.add('OtherMessage')
      }

      // https://www.delftstack.com/howto/javascript/javascript-scroll-to-bottom-of-div/
      chat_box.scrollTop = chat_box.scrollHeight
    } 

    websocket.current = websocket.current || new WebSocket('ws://127.0.0.1:8000/chat/')
    console.log(websocket.current)
    websocket.current.onopen = e => {
      console.log('open', e)
    }
    websocket.current.onmessage = e => {
      update(JSON.parse(e.data))
    }

    websocket.current.onerror = e => {
      console.log('error', e)
    }
  }, [])

  let sendMessage = () => {
    let text = document.querySelector('#message-box').value
    websocket.current.send(JSON.stringify({message: text}))
  } 

  return (
    <div className='Chatbox'>
      <div id='websocket-message' className='MessageWrapper '></div>
      <div className='MessageInputWrapper'>
        <textarea id='message-box' className='MessageInput' rows={1}/>
        <div className='Button' onClick={sendMessage}>Send</div>
      </div>
    </div>
  )
}

export default Home