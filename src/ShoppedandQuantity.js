import { useState } from "react";

function QuantityAndShopped({ item, onQuantityChange, onShoppedItem, onAddPrice, onDeleteItem }) {
    const [inputPrice, setInputPrice] = useState(item.price || '');
    const [priceInputFocused, setPriceInputFocused] = useState(false);
  
    function handlePriceChange(e) {
      setInputPrice(Number(e.target.value));
      setPriceInputFocused(true); // Show "Add Price" button on focus
    }
  
    function handleAddPrice() {
      onAddPrice(item.id, inputPrice);
      setPriceInputFocused(false); // Hide "Add Price" button after adding price
    }
  
    return (
      <div className="quantity-and-shopped">
        <div className="quantity">
          <button onClick={() => (item.quantity === 1 ? onDeleteItem(item.id) : onQuantityChange(item.id, item.quantity - 1))} style={{fontSize: '15px'}}>
            {item.quantity === 1 ? '🗑️' : '-'}
          </button>
          <button>{item.quantity}</button>
          <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} style={{fontSize: '25px'}}>+</button>
        </div>
  
        {item.shopped && (
          <div className="price-container">
            <form>
              
              </form>
            <div>
             
              R<input
                type="number"
                value={inputPrice}
                onChange={handlePriceChange}
                onFocus={() => setPriceInputFocused(true)} // Toggle focus state on focus
                placeholder="Unit Price"
              />
            </div>
            <div style={{color: '#F4D06F'}}>Subtotal: R{inputPrice * item.quantity || 0}</div>
  
            {(priceInputFocused || !item.priceAdded) && (
              <button
                className="add-price"
                onClick={handleAddPrice}
              >
                ADD
              </button>
            )}
          </div>
        )}
  
        <div className="shopped">
          <input
            type="checkbox"
            checked={item.shopped}
            style={{fill: '#F4D06F', color: '#333333'}}
            onChange={() => onShoppedItem(item.id)}
          />
        </div>
      </div>
    );
  }
  
  export default QuantityAndShopped;
  