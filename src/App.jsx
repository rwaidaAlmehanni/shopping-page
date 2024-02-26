import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import CartItemContextComponent from './context/shopping-cart-context.jsx'

function App() {
  return (
    <CartItemContextComponent>
      <>
       <Header/>
       <Shop />
      </>
    </CartItemContextComponent>
  );
}

export default App;
