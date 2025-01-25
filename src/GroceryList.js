import QuantityAndShopped from "./ShoppedandQuantity";
function GroceryList({ items, sortBy, onQuantityChange, onShoppedItem, onAddPrice, onDeleteItem }) {
  let sortedItems = [...items];
  if (sortBy === 'priceAndShopped') {
    sortedItems.sort((a, b) => {
      if (!a.priceAdded && b.priceAdded) return -1;
      if (a.priceAdded && !b.priceAdded) return 1;
      if (a.priceAdded && b.priceAdded) {
        return Number(a.shopped) - Number(b.shopped);
      }
      return a.description.localeCompare(b.description);
    });
  } else if (sortBy === 'quantity') {
    sortedItems.sort((a, b) => b.quantity - a.quantity);
  } else if (sortBy === 'description') {
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
  }

  return (
    <div className="list-container">
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id} className="item">
            <div className="description">
              <h3>{item.quantity} x {item.description}</h3>
            </div>
            <QuantityAndShopped
              item={item}
              onQuantityChange={onQuantityChange}
              onShoppedItem={onShoppedItem}
              onAddPrice={onAddPrice}
              onDeleteItem={onDeleteItem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroceryList;