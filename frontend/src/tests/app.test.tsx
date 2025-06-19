import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App', () => {
  it('renders title', () => {
    render(<App />);
    expect(screen.getByText('Task Sync')).toBeInTheDocument();
  });
});
