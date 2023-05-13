import React, { useEffect } from 'react';
import './WeatherCard.css';
import { Weather } from '../../store/@types/types';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Props {
	weather: Weather;
}

const WeatherCard = ({ weather }: Props) => {
	const [isNight, setIsNight] = React.useState(false);

	console.log(weather);
	const weatherText = weather.weather.map(text => text.main).toString();
	const weatherIcon = weather.weather.map(text => text.icon).toString();
	const { dt } = weather;
	const sunset = weather.sys.sunset	

	useEffect(() => {
		function dayOrNight(timestamp: number, sunset: number) {
			const currDate = new Date(timestamp * 1000),
			currH = currDate.getHours();
	
			const sunsetDate = new Date(sunset * 1000),
			sunsetH = sunsetDate.getHours();
	
			currH > sunsetH ? setIsNight(true) : setIsNight(false)
			
		}
		dayOrNight(dt, sunset)
		
	}, [])

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
			mm = ('0' + (d.getMonth())), // Months are zero based. Add leading 0.
			dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
			wd = ('0' + d.getDay()).slice(-1),
			time;

		const res = days[wd];
		const month = months[Math.round(Number(mm))];

		time = res + ', ' + dd + ' ' + month ;
		return time;
	}

	console.log(isNight);

	return (
		<div className="weather-card-container">
			<div className={isNight ? 'weather-card-night' : 'weather-card-day'}>
				<div className="weather-card-wrapper">
					<div className="details">
						<p className="wheather">{weatherText}</p>
						<div className="details-information">
							<div className="temp">
								{Math.round(weather.main.temp)}°
							</div>
							<div className="vertical-line"></div>
							<div className="information">
								<p>{convertTimestamp(dt)}</p>
								<p>
									<LocationOnIcon sx={{ fontSize: 11 }} />
									{weather.name}
								</p>
							</div>
						</div>
					</div>
					<img
						src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
						alt=""
						width={69}
						height={69}
						className="img"
					/>
				</div>
			</div>
		</div>
	);
};

export default WeatherCard;
