import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherCharts } from '../@types/types';
import { AxiosResponse } from 'axios';

type CurrentWeatherCharts = {
	weatherCharts: WeatherCharts[];
	isLoading: boolean;
	response: Resp;
};

type Resp = {
	status: number;
	massage: string;
};

const initialState: CurrentWeatherCharts = {
	weatherCharts: [],
	isLoading: false,
	response: {
		status: 0,
		massage: ''
	}
};

export const weatherChartsSlice = createSlice({
	name: 'weather_charts',
	initialState,
	reducers: {
		fetchWeatherCharts(state) {
			state.isLoading = true;
		},
		fetchWeatherChartsSuccess(
			state,
			action: PayloadAction<AxiosResponse<WeatherCharts>>
		) {
			state.isLoading = false;
			const newWeather: WeatherCharts = {
				list: action.payload.data.list.map(item => ({
					main: {
						temp: item.main.temp
					},
					weather: item.weather.map(weatherItem => ({
						main: weatherItem.main,
						icon: weatherItem.icon
					})),
					dt_txt: item.dt_txt
				}))
			};
			state.weatherCharts = [newWeather];
			state.response = {
				status: action.payload.status,
				massage: action.payload.statusText
			};
		},
		fetchWeatherChartsError(
			state,
			action: PayloadAction<AxiosResponse<WeatherCharts>>
		) {
			state.isLoading = false;
			state.response = {
				status: action.payload.status,
				massage: action.payload.statusText
			};
		}
	}
});

export default weatherChartsSlice.reducer;
