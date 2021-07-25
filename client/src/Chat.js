import React, { useEffect,useState } from 'react'
import queryString from 'query-string'  
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom'
let socket;
const Chat = (props) => {
    const ENDPOINT = 'http://localhost:5000'
    const [message, setmessage] = useState("")
    const [room, setroom] = useState("")
    const [messages,setMessages]=useState([])
    useEffect(() => {
        const { name, room } = queryString.parse(props.location.search)
        setroom(room)
        socket = io(ENDPOINT)
        socket.emit('join', { name, room }, (error) => {
            if (error)
                alert(error)
        })
    }, [ENDPOINT, props.location.search])
    useEffect(() => {
        socket.on('message', message => {
           setMessages(messages=>[...messages,message])
        })
    }, [])
    const sendMessage = (e) => {
        e.preventDefault()
        if (message)
        {
            socket.emit('sendMessage',message,()=>{setmessage('')})
            }
    }
    const HandleDisconnect = () => {
        window.location.href='/'
    }
    return (
        <div>
            <center><h2>Chat Room</h2></center>
            <div className="chat">
                <div className="infobar">{ room}<button onClick={HandleDisconnect}>X</button></div>
                <div className="display">
                    <ScrollToBottom>
                    {
                        messages.map((message, index) => (
                            <div className="message" key={index}>{message.text}<p>Send By:{ message.user}</p></div>
                        ))
                        }
                    </ScrollToBottom>
                </div>
                <input value={message} onChange={e => setmessage(e.target.value)}
                        onKeyPress={e => e.key === "Enter" ? sendMessage(e) : null} />
            </div>
        </div>
    )
}
export default Chat