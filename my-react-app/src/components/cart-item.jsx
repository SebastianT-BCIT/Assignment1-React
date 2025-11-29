function CartItem({ item, onRemove }) {
  return (
    <li className="cart-item">
      <div className="item-details">
        <strong>{item.name}</strong>
        <span className="item-price-quantity">
          (${item.price.toFixed(2)} × {item.quantity})
        </span>
        <p className="line-total-text">
          Category: <span>{item.category}</span>
        </p>
        <p className="line-total-text">
          Line Total:
          <span className="line-total-amount">${(item.price * item.quantity).toFixed(2)}</span>
        </p>
      </div>
      <button onClick={() => onRemove(item.id)} className="remove-button">
        Remove
      </button>
    </li>
  );
}

export default CartItem;
