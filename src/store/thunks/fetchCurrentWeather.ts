import { WeatherService } from '../../services/WeatherService';
import { currentWeatherSlice } from '../slices/currentWeatherSlice';
import { weatherChartsSlice } from '../slices/weatherChartsSlice';
import { AppDispatch } from '../store';

export const fetchCurrentWeather =
	(payload: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(currentWeatherSlice.actions.fetchCurrentWeather());
			const res = await WeatherService.getCurrentWeather(payload);
			if (res.status === 200) {
				dispatch(
					currentWeatherSlice.actions.fetchCurrentWeatherSuccess(res)
				);
			} else {
				dispatch(
					currentWeatherSlice.actions.fetchCurrentWeatherError(res)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

export const fetchWeatherCharts =
	(payload: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(weatherChartsSlice.actions.fetchWeatherCharts());
			const res = await WeatherService.getChartsWeather(payload);
			if (res.status === 200) {
				dispatch(
					weatherChartsSlice.actions.fetchWeatherChartsSuccess(res)
				);
			} else {
				dispatch(
					weatherChartsSlice.actions.fetchWeatherChartsError(res)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};
