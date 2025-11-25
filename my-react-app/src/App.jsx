import React, { useState, useMemo } from 'react';
import './App.css'; 

function App() {
  // Cart State
  const [cart, setCart] = useState([]);

  // Form State 
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // Form Validation 
  const [errors, setErrors] = useState({});

  // Remove Items 
  const removeItem = (idToRemove) => {
    setCart(prevCart => prevCart.filter(item => item.id !== idToRemove));
  };

  // Validation 
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Item name: required
    if (!itemName.trim()) {
      newErrors.itemName = 'Item name is required.';
      isValid = false;
    }

    // Price: required and > 0
    const numericPrice = parseFloat(price);
    if (!price || isNaN(numericPrice) || numericPrice <= 0) {
      newErrors.price = 'Price must be a number greater than 0.';
      isValid = false;
    }

    // Quantity: required and >= 1
    const numericQuantity = parseInt(quantity, 10);
    if (!quantity || isNaN(numericQuantity) || numericQuantity < 1) {
      newErrors.quantity = 'Quantity must be a whole number of 1 or more.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newItem = {
        id: Date.now(),
        name: itemName.trim(),
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      };

      setCart(prevCart => [...prevCart, newItem]);

      // Clear the form 
      setItemName('');
      setPrice('');
      setQuantity('');
      setErrors({});
    }
  };

  // Cart Summary 
  const cartSummary = useMemo(() => {
    let totalItems = 0;
    let totalCost = 0;

    cart.forEach(item => {
      totalItems += item.quantity;
      totalCost += item.price * item.quantity;
    });

    return { totalItems, totalCost };
  }, [cart]);

  return (
    <div className="shopping-cart-app">
      <h1>Simple Shopping Cart</h1>
      
      <div className="content-container">
        
        
        <div className="form-section">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit} className="add-item-form">
            
            
            <div className="form-group">
              <label htmlFor="itemName">Item Name:</label>
              <input
                id="itemName"
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              {errors.itemName && <p className="error-message">{errors.itemName}</p>}
            </div>

            
            <div className="form-group">
              <label htmlFor="price">Price ($):</label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && <p className="error-message">{errors.price}</p>}
            </div>

            
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {errors.quantity && <p className="error-message">{errors.quantity}</p>}
            </div>

            <button type="submit" className="primary-button">
              Add to Cart
            </button>
          </form>
        </div>

        {/* === 2. Cart List Rendering === */}
        <div className="cart-section">
          <h2>Current Cart ({cart.length} unique items)</h2>
          
          {cart.length === 0 && <p className="empty-message">Your cart is empty.</p>}

          <ul className="cart-list">
            {cart.map(item => (
              <li
                key={item.id}
                className="cart-item"
              >
                <div className="item-details">
                  <strong>{item.name}</strong> 
                  <span className="item-price-quantity">
                    (${item.price.toFixed(2)} &times; {item.quantity})
                  </span>
                  <p className="line-total-text">
                    Line Total: 
                    <span className="line-total-amount"> ${ (item.price * item.quantity).toFixed(2) }</span>
                  </p>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <hr className="divider" />

      
      <div className="summary-section">
        <h2>Cart Summary</h2>
        <p>
          Total **Number of Items (Quantity Sum)**: **{cartSummary.totalItems}**
        </p>
        <p className="total-cost-line">
          Total Cost: <span className="total-cost-amount">${cartSummary.totalCost.toFixed(2)}</span>
        </p>
        
       
        {cart.length > 0 && (
          <button 
            onClick={() => setCart([])}
            className="clear-cart-button"
          >
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default App;