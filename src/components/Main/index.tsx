import React from 'react';
import './Main.css';

const Main = () => {
	return (
		<div className="container">
			<div className="content">
				<div className="search">
					<input type="text" />
				</div>
				<div className="weather-card-container">
					<div className="weather-card">card</div>
					<div className="weather-card">card</div>
					<div className="weather-card">card</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
