import React, { useRef, useEffect } from 'react'

import '../styles/home.scss'

const Home = () => {
  
  const websocket = useRef()

  useEffect(() => {

    let update = (data) => {
      console.log(data.message)
      let chat_box = document.querySelector('#websocket-message')
      let chat = document.createElement('p') 
      let message = document.createTextNode(data.message);
      chat.append(message)
      chat_box.append(chat)
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
    <div className=''>
      <div id='websocket-message'></div>
      <input id='message-box' type={'text'} />
      <div onClick={sendMessage}>Send</div>
    </div>
  )
}

export default Home