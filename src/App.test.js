import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game layout', () => {
  render(<App />);
  expect(screen.getByText(/Player1/i)).toBeInTheDocument();
  expect(screen.getByText(/Player2/i)).toBeInTheDocument();
});
