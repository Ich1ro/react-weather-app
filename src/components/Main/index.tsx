import React, { useEffect } from 'react';
import './Main.css';

import WeatherCard from '../WeatherCard';
import Empty from '../Empty';
import Сities from '../../cities.json';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useCustomDispatch } from '../../hooks/store';
import { fetchCurrentWeather } from '../../store/thunks/fetchCurrentWeather';
import { City, Weather } from '../../store/@types/types';
import { deleteCurrentWeather } from '../../store/slices/currentWeatherSlice';

interface Props {
	weather: Weather[];
}

const Main = ({ weather }: Props) => {
	const [filteredData, setFilteredData] = React.useState<City[]>([]);
	const [wordEntered, setWordEntered] = React.useState('');
	const [selectedCities, setSelectedCities] = React.useState<string[]>([]);

	const dispatch = useCustomDispatch();

	useEffect(() => {
		const savedCities = localStorage.getItem('selectedCities');
		if (savedCities) {
			setSelectedCities(JSON.parse(savedCities));
		}
	}, []);

	const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchCity = event.target.value;
		setWordEntered(searchCity);
		const newFilter = (Сities as City[]).filter((value: City) => {
			return value.name.toLowerCase().includes(searchCity.toLowerCase());
		});
		if (searchCity === '') {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};

	const handleCityClick = async (city: string) => {
		if (!selectedCities.includes(city)) {
			try {
				await dispatch(fetchCurrentWeather(city));
				setSelectedCities(prevCities => [...prevCities, city]);

				const citiesInLocalStorage =
					localStorage.getItem('selectedCities');
				let parsedCities = citiesInLocalStorage
					? JSON.parse(citiesInLocalStorage)
					: [];
				parsedCities.push(city);

				localStorage.setItem(
					'selectedCities',
					JSON.stringify(parsedCities)
				);
			} catch (error) {
				console.log(error);
			}
		}
		setWordEntered('');
		setFilteredData([]);
	};

	const clearInput = () => {
		setFilteredData([]);
		setWordEntered('');
	};

	const onDelete = (city: string, name: string) => {
		dispatch(deleteCurrentWeather(name));
		setSelectedCities(prevCities =>
			prevCities.filter(prevCity => prevCity !== city)
		);

		const citiesInLocalStorage = localStorage.getItem('selectedCities');
		if (citiesInLocalStorage) {
			const parsedCities = JSON.parse(citiesInLocalStorage);
			const updatedCities = parsedCities.filter(
				(parsedCity: string) => parsedCity !== city
			);
			localStorage.setItem(
				'selectedCities',
				JSON.stringify(updatedCities)
			);
		}
	};

	const onUpdate = async (city: string) => {
		try {
			await dispatch(fetchCurrentWeather(city));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container">
			<div className="content">
				<div className="search">
					<div>
						<input
							type="text"
							placeholder="Search City"
							value={wordEntered}
							onChange={handleFilter}
							data-testid='input'
							></input>
						{filteredData.length === 0 ? (
							<SearchOutlinedIcon />
						) : (
							<CloseIcon onClick={clearInput} />
						)}
					</div>
					{filteredData.length !== 0 && (
						<div className="data-resulst">
							{filteredData.slice(0, 15).map((value, key) => {
								return (
									<div
										key={key}
										className="data-item"
										onClick={() =>
											handleCityClick(value.name)
										}>
										<p>
											{`${value.name}, ${value.country}`}
										</p>
									</div>
								);
							})}
						</div>
					)}
				</div>
				{selectedCities.length !== 0 ? (
					selectedCities.map((city: string, index: number) => {
						const weatherData = weather[index];
						return (
							<WeatherCard
								key={city}
								city={city}
								weatherData={weatherData}
								onDelete={onDelete}
								onUpdate={onUpdate}
							/>
						);
					})
				) : (
					<Empty />
				)}
			</div>
		</div>
	);
};

export default Main;
