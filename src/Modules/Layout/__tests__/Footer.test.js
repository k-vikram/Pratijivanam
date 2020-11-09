import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../Views/Footer';

const RoutedComponent = () => <Router>
  <Footer />
</Router>;

test('renders Footer component', () => {
    // const { getByText } = render(<App />);
    const testMessage = 'Custom Footer';
    render(<RoutedComponent />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });