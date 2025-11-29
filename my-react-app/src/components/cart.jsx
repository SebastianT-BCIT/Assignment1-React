import CartItem from "./cart-item";
function Cart({ cart, setCart }) {
  const removeItem = (idToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== idToRemove));
  };

  return (
    <div className="cart-section">
      <h2>Current Cart ({cart.length} items)</h2>

      {cart.length === 0 && <p className="empty-message">Your cart is empty.</p>}

      <ul className="cart-list">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onRemove={removeItem} />
        ))}
      </ul>
    </div>
  );
}
export default Cart;
