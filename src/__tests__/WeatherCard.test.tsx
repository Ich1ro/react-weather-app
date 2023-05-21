import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import { Weather } from '../store/@types/types';

const mockWeatherContext = {
	setCurrentCity: jest.fn()
};

jest.mock('../context/WeatherContext', () => ({
	WeatherContext: {
		Consumer: ({ children }) => children(mockWeatherContext)
	}
}));

describe('Weather card component', () => {
	const weatherData: Weather = 
		{
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
		}

    const city = 'New York'

	const onDelete = jest.fn();
  	const onUpdate = jest.fn();

	it('test render component', () => {
		render(
			<BrowserRouter>
				<WeatherCard weatherData={weatherData} city={city} onDelete={onDelete} onUpdate={onUpdate}/>
			</BrowserRouter>			
		);

		expect(screen.getByText(/New York/)).toBeInTheDocument();
		expect(screen.getByText(/Cloudy/)).toBeInTheDocument();
		expect(screen.getByText(/20°/)).toBeInTheDocument();
	});
});
