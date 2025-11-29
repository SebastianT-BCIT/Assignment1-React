import React, { useMemo } from "react";

function Summary({ cart, setCart }) {
  const cartSummary = useMemo(() => {
    let totalItems = 0;
    let totalCost = 0;

    cart.forEach((item) => {
      totalItems += item.quantity;
      totalCost += item.price * item.quantity;
    });

    return { totalItems, totalCost };
  }, [cart]);

  return (
    <div className="summary-section">
      <h2>Cart Summary</h2>
      <p>
        Total Number of Items (Quantity Sum): <strong>{cartSummary.totalItems}</strong>
      </p>
      <p className="total-cost-line">
        Total Cost: <span className="total-cost-amount">${cartSummary.totalCost.toFixed(2)}</span>
      </p>

      {cart.length > 0 && (
        <button onClick={() => setCart([])} className="clear-cart-button">
          Clear Cart
        </button>
      )}
    </div>
  );
}
export default Summary;
