import { AxiosResponse } from 'axios';
import { Weather, WeatherCharts } from '../store/@types/types';
import api from '../axios';

export class WeatherService {
	static getCurrentWeather(city: string): Promise<AxiosResponse<Weather>> {
		return api.get<Weather>(`/weather?q=${city}`);
	};

	static getChartsWeather(city: string): Promise<AxiosResponse<WeatherCharts>> {
		return api.get<WeatherCharts>(`/forecast?q=${city}`);
	};
}
