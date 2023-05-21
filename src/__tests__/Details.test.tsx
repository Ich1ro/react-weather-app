import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Details from '../components/Details';
import { Weather } from '../store/@types/types';

describe('Details component', () => {
	const weatherData: Weather  = {
		main: {
			temp: 20,
			feels_like: 20,
			temp_max: 25,
			temp_min: 18
		},
		dt: 121212212,
		name: 'New York',
		weather: [
			{
				main: 'Cloudy',
				icon: '10d'
			}
		],
		sys: {
			sunset: 121212212,
			sunrise: 121212212
		},
		wind: {
			speed: 5
		}
	};

	it('render Details component', () => {
		render(
			<BrowserRouter>
				<Details weatherData={weatherData}></Details>
			</BrowserRouter>
		);
	});
});
