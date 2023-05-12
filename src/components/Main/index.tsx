import React from 'react';
import './Main.css';

import WeatherCard from '../WeatherCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const Main = () => {
	return (
		<div className="container">
			<div className="content">
				<div className="search">
					<input type="text" placeholder="Search City"></input>
					<SearchOutlinedIcon />
				</div>
				<WeatherCard />
				<WeatherCard />
				<WeatherCard />
			</div>
		</div>
	);
};

export default Main;
