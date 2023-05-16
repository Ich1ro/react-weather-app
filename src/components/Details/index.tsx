import React from 'react';
import './Details.css';

import { useParams } from 'react-router-dom';
import { Weather } from '../../store/@types/types';

interface Props {
	weather: Weather[];
}

const Details = ({ weather }: Props) => {
	const { city } = useParams();

	const weatherData = weather.find(item => item.name === city);

	if (!weatherData) {
		return <div>Loading...</div>;
	}

	const weatherText = weatherData.weather.map(text => text.main).toString();
	const weatherIcon = weatherData.weather.map(text => text.icon).toString();
	const { dt } = weatherData;

	function convertTimestamp(timestamp: number) {
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];
		var months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let d = new Date(timestamp * 1000),
			mm = '0' + d.getMonth(), // Months are zero based. Add leading 0.
			dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
			wd = ('0' + d.getDay()).slice(-1),
			time;

		const res = days[wd];
		const month = months[Math.round(Number(mm))];

		time = res + ', ' + dd + ' ' + month;
		return time;
	}

	return (
		<div className="details-wrapper">
			<div className="ditails-info">
				<div className="details">
					<h3>{weatherData.name}, {convertTimestamp(dt)}</h3>
					<div className='partial-temp-detail'><img
						src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
						alt=""
						width={69}
						height={69}
						className="img"
					/>
					<h2>{Math.round(weatherData.main.temp)}°</h2>
					</div>
					<h3>{weatherText}</h3>
					<div className="full-temp-detail">
						<div></div>
						<p>Feels like: {Math.round(weatherData.main.feels_like)}°</p>
						<p>Max temp: {Math.round(weatherData.main.temp_max)}°</p>
						<p>Min temp: {Math.round(weatherData.main.temp_min)}°</p>
						<p>Wind speed: {Math.round(weatherData.wind.speed)} m/s</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;
