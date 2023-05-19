import React, { useContext, useEffect, useRef } from 'react';
import './Details.css';

import { Weather } from '../../store/@types/types';
import Charts from '../Charts';
import { convertTimestamp } from '../../utils';
import { WeatherContext } from '../../context/WeatherContext';

interface Props {
	currentWeather: Weather[];
}

const Details = ({ currentWeather }: Props) => {
	// const [detailsWeather, setDetailsWeather] = React.useState<DetailsWeather>({});
	const [parsedData, setParsedData] = React.useState<Weather | null>(null);
	const context = useContext(WeatherContext);
	const { weatherCharts, currentCity } = context ?? {};
	const weatherData = currentWeather.find(item => item.name === currentCity);
	// const parsedData = useRef<Weather | null>(null);

	const { name, weather, main, wind, dt } = parsedData || {};
	const weatherText = weather?.map(text => text.main).join('');
	const weatherIcon = weather?.map(text => text.icon).join('');

	useEffect(() => {
		const weatherInLocalStorage = localStorage.getItem('detailsWeather');
		if (weatherInLocalStorage) {
			const parsedWeather = JSON.parse(weatherInLocalStorage);
			setParsedData(parsedWeather);
		}
	}, []);

	useEffect(() => {
		if (weatherData !== undefined) {
			setParsedData(weatherData);
			localStorage.setItem('detailsWeather', JSON.stringify(weatherData));
		}
	}, [weatherData]);

	useEffect(() => {
		return () => {
			setParsedData(null); // Очистка состояния при размонтировании
		};
	}, []);

	const chartsDate =
		weatherCharts &&
		weatherCharts[0]?.list.map(item => {
			const date = new Date(item.dt_txt);
			const day = date.getDate().toString().padStart(2, '0');
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const hours = date.getHours().toString().padStart(2, '0');
			const minutes = date.getMinutes().toString().padStart(2, '0');
			return `${day}.${month} ${hours}:${minutes}`;
		});

	const chartsTemp =
		weatherCharts &&
		weatherCharts[0]?.list.map(item => Math.round(item.main.temp));

	return (
		<div className="details-wrapper">
			{parsedData ? (
				<div className="ditails-info">
					<div className="details">
						<h3>
							{name}, {convertTimestamp(dt || 0)}
						</h3>
						<div className="partial-temp-detail">
							<img
								src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
								alt=""
								width={69}
								height={69}
								className="img"
							/>
							<h2>{Math.round(main?.temp || 0)}°</h2>
						</div>
						<h3>{weatherText}</h3>
						<div className="full-temp-detail">
							<div className="text">
								<div className="stick"></div>
								<p>
									Feels like:{' '}
									{Math.round(main?.feels_like || 0)}°C
								</p>
								<div className="stick"></div>
								<p>
									Max temp: {Math.round(main?.temp_max || 0)}
									°C
								</p>
								<div className="stick"></div>
								<p>
									Min temp: {Math.round(main?.temp_min || 0)}
									°C
								</p>
								<div className="stick"></div>
								<p>
									Wind speed: {Math.round(wind?.speed || 0)}{' '}
									m/s
								</p>
								<div className="stick"></div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div></div>
			)}
			{weatherCharts ? (
				<Charts chartsTemp={chartsTemp || []} chartsDate={chartsDate} />
			) : (
				<div></div>
			)}
		</div>
	);
};

export default Details;
