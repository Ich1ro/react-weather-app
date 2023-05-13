export type Weather = {
	main: {
		temp: number;
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
    }
};
