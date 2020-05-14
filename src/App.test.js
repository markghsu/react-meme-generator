import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders testing', () => {
  const { getByText } = render(<App />);
  const testing = getByText(/testing\.\.\./i);
  expect(testing).toBeInTheDocument();
});
