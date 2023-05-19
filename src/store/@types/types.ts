export type Weather = {
	main: {
		temp: number;
		feels_like: number;
		temp_max: number;
		temp_min: number;
	};
	dt: number;
	name: string;
	weather: {
		main: string;
		icon: string;
	}[];
	sys: {
		sunset: number;
		sunrise: number
	};
	wind: {
		speed: number;
	};
};

export type WeatherCharts = {
	list: 
		{
			main: {
				temp: number;
			};
			weather: {
				main: string;
				icon: string;
			}[];
			dt_txt: string;
		}[];
};

export type City = {
	name: string;
	country: string;
};
