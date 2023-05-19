import React from 'react';
import './App.css';

import Main from './components/Main';
import { Route, Routes } from 'react-router';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import Details from './components/Details';
import { Link } from 'react-router-dom';
import { useCustomSelector } from './hooks/store';

function App() {
	
	const weather = useCustomSelector(
		state => state.currentWeatherSliceReducer.weather
	);

	return (
		<>
			<div className="header">
				<Link to={'/react-weather-app/'}>
					<h3 className="title">Weather app</h3>
					<CloudOutlinedIcon />
				</Link>
			</div>
			<div className="wrapper">
				<Routes>
					<Route path="/react-weather-app/" element={<Main weather={weather} />} />
					<Route path="/react-weather-app/details/:city" element={<Details currentWeather={weather}/>} />
				</Routes>
			</div>
		</>
	);
}

export default App;
