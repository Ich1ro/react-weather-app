import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from '../store/store';
import App from '../App';

test('renders header with title and icon', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const titleElement = screen.getByText(/Weather app/i);
  const iconElement = screen.getByTestId('cloud-icon');

  expect(titleElement).toBeInTheDocument();
  expect(iconElement).toBeInTheDocument();
});

test('renders Empty component and input from Main component when navigating to root path', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const emptyComponent = screen.getByTestId('empty');
  const input = screen.getByTestId('input');

  expect(emptyComponent).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});