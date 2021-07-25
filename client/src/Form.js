import React, { useState } from 'react'

export default function Form() {
    const [name, setname] = useState('')
    const [room, setroom] = useState('')
    const HandleJoin = () => {
        window.location.href=`/chat?name=${name}&room=${room}`
    }
    return (
        <div className="form">
            <h2>Join Chat Room</h2>
            <input type="text" placeholder="User Name" value={name} onChange={ e=>setname(e.target.value)} required/>
            <input type="text" placeholder="Room Name" value={room} onChange={ e=>setroom(e.target.value)} required/>
            <button onClick={HandleJoin}>Join</button>
        </div>
    )
}
