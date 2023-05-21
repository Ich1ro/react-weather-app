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
				<Link to={'/'}>
					<h3 className="title">Weather app</h3>
					<CloudOutlinedIcon data-testid='cloud-icon'/>
				</Link>
			</div>
			<div className="wrapper">
				<Routes>
					<Route path="/" element={<Main data-testid="main-component" weather={weather} />} />
					<Route
						path="/details/:city"
						element={<Details currentWeather={weather} />}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
