import { useState } from "react";
import ShoppingForm from "./shopping-form";
import Cart from "./cart";
import Summary from "./summary";
function Main() {
  const [cart, setCart] = useState([]);

  return (
    <div className="shopping-cart-app">
      <h1>Simple Shopping Cart</h1>
      <div className="content-container">
        {/* === 1. Shopping Form === */}
        <ShoppingForm cart={cart} setCart={setCart} />

        {/* === 2. Cart List Rendering === */}
        <Cart cart={cart} setCart={setCart} />
      </div>
      <hr className="divider" />
      {/* === 3. Order summary === */}
      <Summary cart={cart} setCart={setCart} />
    </div>
  );
}

export default Main;
