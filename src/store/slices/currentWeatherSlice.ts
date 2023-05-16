import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Weather } from '../@types/types';
import { AxiosResponse } from 'axios';

type CurrentWeather = {
	weather: Weather[];
	isLoading: boolean;
	response: Resp;
};

type Resp = {
	status: number;
	massage: string;
};

const initialState: CurrentWeather = {
	weather: [],
	isLoading: false,
	response: {
		status: 0,
		massage: ''
	}
};

export const currentWeatherSlice = createSlice({
	name: 'current_weather',
	initialState,
	reducers: {
		fetchCurrentWeather(state) {
			state.isLoading = true;
		},
		fetchCurrentWeatherSuccess(
			state,
			action: PayloadAction<AxiosResponse<Weather>>
		) {
			state.isLoading = false;
			const newWeather: Weather = {
				main: {
					temp: action.payload.data.main.temp,
					feels_like: action.payload.data.main.feels_like,
					temp_max: action.payload.data.main.temp_max,
					temp_min: action.payload.data.main.temp_min
				},
				dt: action.payload.data.dt,
				name: action.payload.data.name,
				  weather: [{
					main: action.payload.data.weather.map(item => (item.main)).toString(),
					icon: action.payload.data.weather.map(item => (item.icon)).toString()
				  }],
				sys: {
					sunset: action.payload.data.sys.sunset
				},
				wind: {
					speed: action.payload.data.wind.speed
				}
			}
			const existingWeatherIndex = state.weather.findIndex(
				(weather) => weather.name === newWeather.name
			  );
			  if (existingWeatherIndex !== -1) {
				const existingWeather = state.weather[existingWeatherIndex];
				if (existingWeather.dt !== newWeather.dt) {
				  const updatedWeather = {
					...existingWeather,
					date: newWeather.dt,
				  };
				  state.weather.splice(existingWeatherIndex, 1, updatedWeather);
				}
			  } else {
				state.weather.push(newWeather);
			  }
			state.response = {
				status: action.payload.status,
				massage: action.payload.statusText
			};
		},
		fetchCurrentWeatherError(
			state,
			action: PayloadAction<AxiosResponse<Weather>>
		) {
			state.isLoading = false;
			state.response = {
				status: action.payload.status,
				massage: action.payload.statusText
			};
		},
		deleteCurrentWeather(state, action: PayloadAction<string>) {
			state.weather = state.weather.filter((item) => item.name !== action.payload);
		},
	}
});

export const {deleteCurrentWeather} = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
