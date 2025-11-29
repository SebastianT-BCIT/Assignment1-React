import { useState } from "react";

function ShoppingForm({ cart, setCart }) {
  // Form State
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  // Form Validation
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Item name: required
    if (!itemName.trim()) {
      newErrors.itemName = "Item name is required.";
      isValid = false;
    }

    // Item category: required
    if (!category.trim()) {
      newErrors.category = "Item category is required.";
      isValid = false;
    }

    // Price: required and > 0
    const numericPrice = parseFloat(price);
    if (!price || isNaN(numericPrice) || numericPrice <= 0) {
      newErrors.price = "Price must be a number greater than 0.";
      isValid = false;
    }

    // Quantity: required and >= 1
    const numericQuantity = parseInt(quantity, 10);
    if (!quantity || isNaN(numericQuantity) || numericQuantity < 1) {
      newErrors.quantity = "Quantity must be a whole number of 1 or more.";
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
        id: performance.now(),
        name: itemName.trim(),
        category: category.trim(),
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      };

      setCart((prevCart) => [...prevCart, newItem]);

      // Clear the form
      setItemName("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setErrors({});
    }
  };

  const isFormValid = () => {
    const numericPrice = parseFloat(price);
    const numericQuantity = parseInt(quantity, 10);

    return itemName.trim() && category.trim() && !isNaN(numericPrice) && numericPrice > 0 && !isNaN(numericQuantity) && numericQuantity >= 1;
  };

  return (
    <>
      <div className="form-section">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit} className="add-item-form">
          <div className="form-group">
            <label htmlFor="itemName">Item Name:</label>
            <input id="itemName" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            {errors.itemName && <p className="error-message">{errors.itemName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="itemCategory">Category: </label>
            <select name="itemCategory" value={category} id="itemCategory" onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category...</option>
              <option value="food">Food</option>
              <option value="clothing">Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($):</label>
            <input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
            {errors.price && <p className="error-message">{errors.price}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input id="quantity" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            {errors.quantity && <p className="error-message">{errors.quantity}</p>}
          </div>

          <button type="submit" className="primary-button" disabled={!isFormValid()}>
            Add to Cart
          </button>
        </form>
      </div>
    </>
  );
}

export default ShoppingForm;
