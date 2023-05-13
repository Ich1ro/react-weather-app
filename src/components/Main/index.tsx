import React, { useEffect } from 'react';
import './Main.css';

import WeatherCard from '../WeatherCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { fetchCurrentWeather } from '../../store/thunks/fetchCurrentWeather';

const Main = () => {
	const dispatch = useCustomDispatch();

	const { weather } = useCustomSelector(
		state => state.currentWeatherSliceReducer
	);

	useEffect(() => {
		dispatch(fetchCurrentWeather('Kyiv'));
	}, []);

	return (
		<div className="container">
			<div className="content">
				<div className="search">
					<input type="text" placeholder="Search City"></input>
					<SearchOutlinedIcon />
				</div>
				<WeatherCard weather={weather} />
			</div>
		</div>
	);
};

export default Main;
