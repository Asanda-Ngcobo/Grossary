import { useState } from "react";
import Header from "./Header";
import GroceryList from "./GroceryList";
function Main({
    items, 
    setItems, 
    totalCost, 
    setTotalCost, 
    budget, 
    setBudget, 
    enterBudget,
    toBeShoppedCount, 
    onSpecialsClick}){
    
    const [sortBy, setSortBy] = useState('priceAndShopped');
    
  
    function handleAddItem(item) {
      setItems((prevItems) => (Array.isArray(prevItems) ? [...prevItems, item] : [item]));
    }
  
    function handleQuantityChange(id, newQuantity) {
      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        calculateTotalCost(updatedItems);
        return updatedItems;
      });
    }
  
    function handleToggleItems(id) {
      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                shopped: !item.shopped,
                price: !item.shopped ? null : item.price, // Clear price if unticked
                priceAdded: !item.shopped ? false : item.priceAdded, // Reset priceAdded if unticked
              }
            : item
        );
        calculateTotalCost(updatedItems); // Recalculate total cost
        return updatedItems;
      });
    }
    
  
    function handleAddPrice(id, price) {
      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === id ? { ...item, price, priceAdded: true } : item
        );
        calculateTotalCost(updatedItems);
        return updatedItems;
      });
    }
  
    function handleDeleteItem(id) {
      setItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== id);
        calculateTotalCost(updatedItems);
        return updatedItems;
      });
    }
  
   
    // Function to calculate and set the total cost
    function calculateTotalCost(items) {
      const newTotal = items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
      setTotalCost(newTotal);
    }
    return (
      <div className='main-container'>
  
  <Header
          AddItems={handleAddItem}
          items={items}
          totalCost={totalCost}
          setSortBy={setSortBy}
          budget={budget}
          setBudget={setBudget}
          enterBudget={enterBudget}
          toBeShoppedCount={toBeShoppedCount}
          onSpecialsClick={onSpecialsClick}
          
        />
     
        <GroceryList
        items={items}
        sortBy={sortBy}
        onQuantityChange={handleQuantityChange}
        onShoppedItem={handleToggleItems}
        onAddPrice={handleAddPrice}
        onDeleteItem={handleDeleteItem}
      /> 
        
        
      </div>
    )
  }

  export default Main;