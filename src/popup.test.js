import { render, screen } from '@testing-library/react';
import PopUpWindow from './components/PopUpWindow';

test('renders learn react link', () => {
  render(<PopUpWindow />);
  const linkElement = screen.getByText(/ON/i);
  expect(linkElement).toBeInTheDocument();
});
