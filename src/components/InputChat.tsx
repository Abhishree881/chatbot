import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import "../../styles/chat-input.css"
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { setChats } from '@/redux/features/chatsSlice'

type Props = {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const InputChat = (props: Props) => {
    const [input, setInput] = useState("")
    const {chats, activeGroup, activeTopic} = useAppSelector((state) => state.chats);
    const dispatch = useDispatch();

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleSendClick();
        }
      };

    const handleSendClick = async () => {
        props.setLoading(true);
        const newChats =  JSON.parse(JSON.stringify(chats));
        newChats[activeGroup][activeTopic].push({
            user_type: "user",
            id: `id-${Date.now()}`,
            text: input
        })
        // dispatch(setChats(newChats))
        
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [{ role: 'user', content: input }]
            })
          });
          
          const data = await res.json();
          newChats[activeGroup][activeTopic].push({
            user_type: "bot",
            id: `id-${Date.now()}`,
            text: data.result.content
          })
        } catch (error) {
          console.error('Error:', error);
        } finally {
          props.setLoading(false);
        }
        dispatch(setChats(newChats))
        setInput("")
    }

  return (
    <div className='chat-input-container'>
        <TextField value={input} onChange={(e) => setInput(e.target.value)} fullWidth variant='standard' onKeyDown={handleKeyPress}/>
        <Button onClick={handleSendClick} variant='outlined'>Send</Button>
    </div>
  )
}

export default InputChat