import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect
} from 'react';

import { WeatherCharts } from '../store/@types/types';
import { useCustomDispatch, useCustomSelector } from '../hooks/store';
import { fetchWeatherCharts } from '../store/thunks/fetchCurrentWeather';

interface Props {
	children: React.ReactNode;
}

interface WeatherContextType {
	currentCity: string;
	setCurrentCity: Dispatch<SetStateAction<string>>;
	weatherCharts: WeatherCharts[];
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
	undefined
);

export const WeatherContextProvider: React.FC<Props> = ({ children }) => {
	const [currentCity, setCurrentCity] = React.useState<string>('');

	const dispatch = useCustomDispatch();

	useEffect(() => {
		const fetchData = async (cityName: string) => {
			try {
				await dispatch(fetchWeatherCharts(cityName));
			} catch (error) {
				console.log(error);
			}
		};
		if (currentCity) {
			fetchData(currentCity);
		}
	}, [dispatch, currentCity]);

	const weatherCharts = useCustomSelector(
		state => state.weatherChartsSliceReducer.weatherCharts
	);

	return (
		<WeatherContext.Provider
			value={{
				currentCity,
				setCurrentCity,
				weatherCharts
			}}>
			{children}
		</WeatherContext.Provider>
	);
};
