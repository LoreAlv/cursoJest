import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './mocks/render-with-providers';

test('renders learn react link', () => {
  renderWithProviders(<App />);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
