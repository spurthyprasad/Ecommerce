// Navbar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import Navbar from './Navbar';

const mockGetTotalCartItems = jest.fn();

describe('Navbar Component', () => {
  beforeEach(() => {
    mockGetTotalCartItems.mockReturnValue(5);
  });

  const renderNavbar = () =>
    render(
      <ShopContext.Provider value={{ getTotalCartItems: mockGetTotalCartItems }}>
        <Router>
          <Navbar />
        </Router>
      </ShopContext.Provider>
    );

  test('renders the Navbar with logo and menu items', () => {
    renderNavbar();

    expect(screen.getByAltText(/SHOPPER/i)).toBeInTheDocument();
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/Men/i)).toBeInTheDocument();
    expect(screen.getByText(/Women/i)).toBeInTheDocument();
    expect(screen.getByText(/Kids/i)).toBeInTheDocument();
  });

  test('toggles dropdown menu visibility on click', () => {
    renderNavbar();

    const dropdownIcon = screen.getByAltText('');
    fireEvent.click(dropdownIcon);

    const menu = screen.getByRole('list');
    expect(menu).toHaveClass('nav-menu-visible');
  });

  test('displays total cart items count', () => {
    renderNavbar();

    const cartCount = screen.getByText(/5/i);
    expect(cartCount).toBeInTheDocument();
  });

  test('renders Login button when user is not authenticated', () => {
    renderNavbar();

    const loginButton = screen.getByText(/Login/i);
    expect(loginButton).toBeInTheDocument();
  });

  test('renders Logout button when user is authenticated', () => {
    localStorage.setItem('auth-token', 'dummy-token');
    renderNavbar();

    const logoutButton = screen.getByText(/Logout/i);
    expect(logoutButton).toBeInTheDocument();
    localStorage.removeItem('auth-token');
  });

  test('logout button clears auth-token from localStorage and redirects to login', () => {
    localStorage.setItem('auth-token', 'dummy-token');
    renderNavbar();

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('auth-token')).toBeNull();
    expect(window.location.replace).toHaveBeenCalledWith('/login');
  });
});
