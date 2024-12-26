import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import "../../styles/sidebar.css"
import { Add, ArrowForwardIos, Edit, ViewKanban } from '@mui/icons-material'
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { setChats, setSelectedGroup, setSelectedTopic } from '@/redux/features/chatsSlice'
import ThemeSwitcher from './Themes'

type Props = {
  showSidebar: boolean,
  setShowSidebar: (showSidebar: boolean) => void
}

const Sidebar = (props: Props) => {
  const { chats, activeGroup, activeTopic } = useAppSelector(state => state.chats)
  const [isCreating, setIsCreating] = useState(false);
  const [newGroup, setNewGroup] = useState('');
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [actionGroup, setActionGroup] = useState('');
  const [isEditingTopic, setIsEditingTopic] = useState(false); 
  const [editTopicValue, setEditTopicValue] = useState(''); 
  const [editTopicGroup, setEditTopicGroup] = useState(''); 
  const [themeSwitch, setThemeSwitch] = useState(false);
  const dispatch = useDispatch();

  const logout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'DELETE',
    })
    if (response.status === 200) {
      window.location.href = '/'
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateNew();
    }
  };

  const handleKeyPressTopic = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateNewTopic();
    }
  };

  const handleCreateNew = () => {
    if(!newGroup) return;
    setIsCreating(false);
    const newChats = JSON.parse(JSON.stringify(chats));
    newChats[newGroup] = {};
    dispatch(setChats(newChats));
    setNewGroup('');
  }

  const handleCreateNewGroup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setIsCreating(true);
  }

  const handleCreateNewTopicClick = (e: any, group: string) => {
    e.stopPropagation()
    setIsCreatingTopic(true);
    setActionGroup(group);
  }

  const handleCreateNewTopic = () => {
    if(!newTopic) return;
    setIsCreatingTopic(false);
    const newChats = JSON.parse(JSON.stringify(chats));
    newChats[actionGroup][newTopic] = [];
    dispatch(setChats(newChats));
    setNewTopic('');
    setActionGroup('');
  }

  const handleEditTopicClick = (group: string, topic: string) => {
    setActionGroup(group);
    setEditTopicValue(topic);
    setEditTopicGroup(topic);
    setIsEditingTopic(true); // Enable topic edit mode
  };

  const handleSaveEditedTopic = () => {
    if (!editTopicValue) return; // Don't save empty topics
    const newChats = JSON.parse(JSON.stringify(chats));
    delete newChats[actionGroup][activeTopic]; // Delete the old topic
    newChats[actionGroup][editTopicValue] = []; // Add new topic with updated name
    dispatch(setChats(newChats));
    setIsEditingTopic(false); // Exit edit mode
    dispatch(setSelectedTopic(editTopicValue)); // Update the selected topic
  };

  const handleReset = () => {
    setIsCreating(false);
    setIsCreatingTopic(false);
    setNewGroup('');
    setNewTopic('');
    setActionGroup('');
    setIsEditingTopic(false); // Reset edit mode
    setEditTopicValue('');
    setEditTopicGroup('');
  }

  const handleSelect = (group: string, topic: string) => {
    dispatch(setSelectedGroup(group));
    dispatch(setSelectedTopic(topic));
  }

  return (
    <div className='sidebar-container' onClick={handleReset}>
      <ViewKanban className="sidebar-icon" onClick={() => props.setShowSidebar(!props.showSidebar)} />

        {themeSwitch ? <ThemeSwitcher /> : <div onClick={()=> setThemeSwitch(true)} className='mt-8 cursor-pointer hover:underline'>Switch Theme?</div>}
      <div className='chats-container'>
        {chats ? Object.keys(chats).map((group, index) => (
          <div key={index}>
            <div className='chats-groups mt-2'>
              {group}
              <Add style={{ cursor: 'pointer' }} onClick={(e) => handleCreateNewTopicClick(e, group)} />
            </div>
            {isCreatingTopic && actionGroup === group && <div className='mb-5'>
              <TextField onClick={(e) => e.stopPropagation()} onChange={(e) => setNewTopic(e.target.value)} onKeyDown={handleKeyPressTopic} label="Topic Name" variant="standard" fullWidth />
            </div>}
            {chats[group] && Object.keys(chats[group]).map((topic, index) => (
              isEditingTopic && actionGroup === group && editTopicGroup === topic ?
                <div key={index} className='edit-topic-container'>
                  <TextField
                    value={editTopicValue}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setEditTopicValue(e.target.value)}
                    label="Edit Topic"
                    variant="standard"
                    fullWidth
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEditedTopic()}
                  />
                </div>
                :
                <div key={index} className={`chats-titles mt-1 ${activeTopic === topic ? "active" : null}`} onClick={() => handleSelect(group, topic)}>
                  <div className='flex items-center gap-2'>
                    <ArrowForwardIos style={{ fontSize: '12px' }} />
                    <div className='chats-titles-text'>{topic}</div>
                  </div>
                  <Edit style={{cursor:"pointer", fontSize:"16px"}} onClick={(e) => { e.stopPropagation(); handleEditTopicClick(group, topic); }}/>
                </div>
            ))}
          </div>
        )) : null}
        <div className='mt-5 w-full'>
          {isCreating ?
            <TextField onClick={(e) => e.stopPropagation()} onChange={(e) => setNewGroup(e.target.value)} onKeyDown={handleKeyPress} label="Group Name" variant="standard" fullWidth />
            : <Button onClick={handleCreateNewGroup} style={{ display: "flex", flexDirection: "row", gap: "6px", alignItems: "center" }} fullWidth>New Group <Add /></Button>}
        </div>
      </div>
      <div className='logout-container'>
        <Button fullWidth onClick={logout}>Logout</Button>
      </div>


    </div>
  )
}

export default Sidebar
