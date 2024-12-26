import React, { useState } from 'react'
import Sidebar from './Sidebar'
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

type Props = {
    children: React.ReactNode
}

const Layout = (props: Props) => {
  const [showSidebar, setShowSidebar] = useState(true)
  return (
    <div className='flex flex-row'> 
      {showSidebar && <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}
      <div className='relative w-full'>
        {!showSidebar ? <ViewKanbanIcon className="sidebar-icon" onClick={() => setShowSidebar(!showSidebar)} /> : null}
        {props.children}
      </div>
    </div>
  )
}

export default Layout