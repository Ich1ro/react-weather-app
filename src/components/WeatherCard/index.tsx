import React, { useEffect } from 'react';
import './WeatherCard.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Weather } from '../../store/@types/types';
import ReplayIcon from '@mui/icons-material/Replay';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { convertTimestamp } from '../../utils';
import { WeatherContext } from '../../context/WeatherContext';

interface Props {
	weatherData: Weather;
	city: string;
	onDelete: Function;
	onUpdate: Function;
}

const WeatherCard = ({ city, weatherData, onDelete, onUpdate }: Props) => {
	const context = React.useContext(WeatherContext);
	const { setCurrentCity } = context ?? {};
	const [isNight, setIsNight] = React.useState(false);

	const { name, weather, main, dt, sys } = weatherData;

	const weatherText = weather?.map(text => text.main).join('');
	const weatherIcon = weather?.map(text => text.icon).join('');
	const sunset = sys?.sunset;
	const sunrise = sys?.sunrise;

	useEffect(() => {
		function dayOrNight(
			timestamp: number,
			sunset: number,
			sunrise: number
		) {
			const currDate = new Date(timestamp * 1000),
				currTime = currDate.getHours();

			const sunsetDate = new Date(sunset * 1000),
				sunsetTime = sunsetDate.getHours();

			const sunriseDate = new Date(sunrise * 1000),
				sunriseTime = sunriseDate.getHours();

			const isNight = currTime < sunriseTime || currTime > sunsetTime;
			setIsNight(isNight);
		}
		dayOrNight(dt, sunset, sunrise);
	}, [isNight, dt, sunset, sunrise]);

	const onInfo = (city: string) => {
		if (setCurrentCity) {
			setCurrentCity(city || '');
		}
	};

	return (
		<div className="weather-card-container">
			<div
				className={isNight ? 'weather-card-night' : 'weather-card-day'}>
				<div className="weather-card-wrapper">
					<div className="details">
						<p className="wheather">{weatherText}</p>
						<div className="details-information">
							<div className="temp">{Math.round(main?.temp)}°</div>
							<div className="vertical-line"></div>
							<div className="information">
								<p>{convertTimestamp(dt)}</p>
								<p>
									<LocationOnIcon sx={{ fontSize: 11 }} />
									{name}
								</p>
							</div>
						</div>
					</div>
					<div className="buttons">
						<button className="info" onClick={() => onInfo(city)}>
							<Link to={`/details/${city}`}>
							<InfoIcon />
							</Link>
						</button>
						<button className="refresh">
							<ReplayIcon
								onClick={() => {
									onUpdate(name);
								}}
							/>
						</button>
						<button className="delete">
							<DeleteIcon
								onClick={() => {
									onDelete(city, name);
								}}
							/>
						</button>
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
