import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Weather } from '../@types/types';
import { AxiosResponse } from 'axios';

type CurrentWeather = {
	weather: Weather;
	isLoading: boolean;
	response: Resp;
};

type Resp = {
	status: number;
	massage: string;
};

const initialState: CurrentWeather = {
	weather: {
		main: {
			temp: 0
		},
		dt: 0,
		name: '',
        sys: {
            sunset: 0
        },
		weather: [
			{
				main: '',
				icon: ''
			}
		]
	},
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
			state.weather = action.payload.data;
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
		}
	}
});

export default currentWeatherSlice.reducer;
