import { render, screen } from '@testing-library/react';
import App from './App';


// test provider is getting the isLoggedin state
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
