import React, { useRef, useEffect } from 'react'

import '../styles/home.scss'

const Home = () => {
  
  const websocket = useRef()

  useEffect(() => {

    let update = (data) => {
      console.log(data.message)
      let chat_box = document.querySelector('#websocket-message')
      chat_box.innerHTML = data.message
    } 

    websocket.current = new WebSocket('ws://127.0.0.1:8000/chat/')
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
    <div className='Home-wrapper'>
      <p id='websocket-message'></p>
      <input id='message-box' type={'text'} />
      <div onClick={sendMessage}>Send</div>
    </div>
  )
}

export default Home