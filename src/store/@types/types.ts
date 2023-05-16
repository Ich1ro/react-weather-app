export type Weather = {
	main: {
		temp: number;
		feels_like: number;
		temp_max: number;
		temp_min:number
	};
	dt: number;
	name: string;
	weather: [
		{
			main: string;
			icon: string;
		}
	];
    sys: {
        sunset: number
    };
	wind: {
		speed: number
	}
};

export type City = {
	name: string;
	country: string;
};

export type WeatherContextType = {
	weather: Weather[]
}