import React from 'react'
import './Empty.css'
import FavoriteIcon from '@mui/icons-material/Favorite';

const Empty = () => {
  return (
    <div className='empty-wrapper'>
        <h1>Welcome</h1>
        <h4>To get started, enter the city you are interested in into the search</h4>
        <p>Made with heart from Pavel</p>
        <FavoriteIcon sx={{ color: 'red' }}/>
    </div>
  )
}

export default Empty