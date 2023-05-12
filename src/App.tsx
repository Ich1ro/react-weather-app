import React from 'react';
import './App.css';

import Main from './components/Main';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';

function App() {
	return (
		<BrowserRouter>
		<div className='header'>
			<h3 className='title'>Weather app</h3>
			<CloudOutlinedIcon />
		</div>
			<div className="wrapper">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/detail"/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
