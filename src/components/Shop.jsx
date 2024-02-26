import { useContext } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products.js';
import Product from './Product.jsx';
import { CartItemContext } from '../context/shopping-cart-context.jsx'


export default function Shop() {
  const ctx = useContext(CartItemContext)
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={ctx.onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
