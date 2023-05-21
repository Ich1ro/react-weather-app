import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Main from '../components/Main';

describe('Main component', () => {
	it('renders without errors', () => {
		render(
			<Provider store={store}>
				<Main weather={[]} />
			</Provider>
		);
	});

	it('filters data when typing in the search input', async () => {
		render(
			<Provider store={store}>
				<Main weather={[]} />
			</Provider>
		);
		const input = screen.getByTestId('input');

		fireEvent.change(input, { target: { value: 'New York' } });

		await waitFor(() => {
			const matchingElements = screen.getAllByText((content, element) => {
				return content.includes('New York');
			});
			expect(
				matchingElements.some(element => element instanceof HTMLElement)
			).toBe(true);
		});
	});
});

