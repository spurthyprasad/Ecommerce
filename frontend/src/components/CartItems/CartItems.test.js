// CartItems.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItems from './CartItems';
import { ShopContext } from '../../Context/ShopContext';

const mockContextValue = {
  getTotalCartAmount: jest.fn(() => 100),
  all_product: [
    { id: 1, name: 'Product 1', new_price: 10, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', new_price: 20, image: 'product2.jpg' },
  ],
  cartItems: { 1: 2, 2: 1 },
  removeFromCart: jest.fn(),
};

describe('CartItems Component', () => {
  test('renders CartItems with products', () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <CartItems />
      </ShopContext.Provider>
    );

    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('removes product from cart when remove icon is clicked', () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <CartItems />
      </ShopContext.Provider>
    );

    const removeIcons = screen.getAllByAltText('');
    fireEvent.click(removeIcons[0]);

    expect(mockContextValue.removeFromCart).toHaveBeenCalledWith(1);
  });

  test('displays total cart amount correctly', () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <CartItems />
      </ShopContext.Provider>
    );

    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  test('displays "PROCEED TO CHECKOUT" button', () => {
    render(
      <ShopContext.Provider value={mockContextValue}>
        <CartItems />
      </ShopContext.Provider>
    );

    expect(screen.getByText('PROCEED TO CHECKOUT')).toBeInTheDocument();
  });
});
