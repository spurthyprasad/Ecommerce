// CartItems.snapshot.test.js
import React from 'react';
import renderer from 'react-test-renderer';
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

describe('CartItems Component Snapshot', () => {
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <ShopContext.Provider value={mockContextValue}>
          <CartItems />
        </ShopContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
