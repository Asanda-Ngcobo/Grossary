import { useState, useEffect, useRef } from 'react';
import useLocalStorage from './LocalStorage';
import './index.css';
import Logo1 from './Shoprite-Logo.jpg';
import Logo2 from './clicks.jpg';
import Logo3 from './checkers.png';
import Logo4 from './Bluff.png';
import Logo5 from './Pick-n-Pay.png';
import Logo6 from './Spar.png';
import Logo7 from './Boxer.png';
// import Logo8 from './Dischem.png'

const specials = [
  {store: 'Shoprite',
   
    imageURL: Logo1,
    linkURL: 'https://www.shoprite.co.za/specials'
  },
  {store: 'Clicks',
  
    imageURL:Logo2,
    linkURL: 'https://clicks.co.za/specials?allCategories=OH10005&gad_source=1&gclid=Cj0KCQjwj4K5BhDYARIsAD1Ly2pG4RtcfcCy4QT3S-cSfYOahWYt-A4h2j1nLLNyaDOt5s02_6OFGCYaAuT9EALw_wcB'
  },
  {store: 'Checkers',
   
    imageURL:Logo3,
    linkURL: 'https://www.checkers.co.za/specials'
  },
  {store: 'Bluff Meats',
   
    imageURL:Logo4,
    linkURL: 'https://bluffmeatsupply.co.za/instore-promotions/'
  },
  {store: 'Pick /n Pay',
   
    imageURL:Logo5,
    linkURL: 'https://www.pnp.co.za/catalogues'
  },
  {store: 'Spar',
    imageURL:Logo6,
    linkURL: 'https://www.spar.co.za/Specials'
  },
  {store: 'Boxer',
   
    imageURL:Logo7,
    linkURL: 'https://www.boxer.co.za/promotions'
  },
  // {store: 'Dischem',
   
  //   imageURL: '',
  //   linkURL: 'https://www.dischem.co.za/on-promotion?srsltid=AfmBOooX33qmrK2nRNIOqguu166ed6o9Au-PyaN6TDYBe29HvnrdOD05'
  // },
]

function App() {
  const [items, setItems] = useLocalStorage([], 'added');
useEffect(() => {
  if (!Array.isArray(items)) {
    setItems([]);
  }
}, [items, setItems]);
  const [totalCost, setTotalCost] = useLocalStorage(0, 'total');

  const [sales, setSales] = useState(true)


  
  const [budget, setBudget] = useLocalStorage(0, 'budget')



  function handleClearList() {
  
    setItems([]);
    setTotalCost(0);
  setBudget(0)

  }

  function handleSpecialsClick(){
    setSales(!sales)
  }


  const toBeShoppedCount = Array.isArray(items)
  ? items.filter((item) => !item.shopped).length
  : 0;
  return (
    <div className="App">
      {/* <Menu /> */}
  
      {!sales ? <Specials onSetSales={setSales}/> :     
      <Main items={items} 
      setItems={setItems}
      setTotalCost={setTotalCost}
      totalCost={totalCost}
      budget={budget}
      setBudget={setBudget}
     
      toBeShoppedCount={toBeShoppedCount}
      onSpecialsClick={handleSpecialsClick}
      />}
     

    
    
     
    
    
    <Navigation items={items}
    onSpecialsClick={handleSpecialsClick}
    setItems={setItems}
    onClearItems={handleClearList}
    sales={sales}
    
    />
     
    </div>
  );
}

// function Menu(){
//   return(
//     <div className='menu'>
//       <img src={Me} alt='profile-picture'/>
//       <button className='menu-options'>Menu</button>
//     </div>
//   )
// }
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


function Header({ 
  AddItems, 
  items, 
  totalCost, 
  setSortBy, 
  budget, 
setBudget,

  toBeShoppedCount, 
  onSpecialsClick }) {
  const [description, setDescription] = useState('');

  function handleAddBudget(e){
    e.preventDefault();
    if(!budget) return;
    
  }

  const left = Number(budget) - Number(totalCost);

  function handleInput(e) {
    e.preventDefault();
    if (!description) return;
    

    const newItem = {
      description,
      quantity: 1,
      shopped: false,
      price: null,
      priceAdded: false,
      id: crypto.randomUUID(),
    };
    AddItems(newItem);
    setDescription(''); // Reset input
  }

   // To focus the search box as soon as the application is loaded
   const inputElement = useRef(null)
   useEffect(function(){
     
 inputElement.current.focus();
   }, []);

  return (
    <header className="header" >
      <h1 className="logo">Grossary<img src='Logo.png' alt='Logo' width={20}></img></h1>
      <form onSubmit={handleInput}>
      <input
        type="text"
        className="add-item"
        placeholder="Add Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ref={inputElement}
      />
      <button className="add-btn" >Add</button>
      </form>

  
      {items.length > 0 ? (
        <div>
          <Active >{toBeShoppedCount > 0 ? `${toBeShoppedCount} of ${items.length} Left🛒` : 'All done 🎉'}</Active>
          <Active>
            <form>
              <select onChange={(e) => setSortBy(e.target.value)} className="sort-dropdown">
                
              <option value="priceAndShopped">Status</option>
              <option value="description">Name</option>
                <option value="quantity">Quantity</option>
              
              </select>
            </form>
          </Active>
          <SpecialsButton onSpecialsClick={onSpecialsClick}>Specials</SpecialsButton>
          <TotalCost>{totalCost > 0 && `📈Money Spent: R${totalCost}`}</TotalCost> 
          <TotalCost>{budget > 0 && totalCost > 0 && `📉Money Left: R${left}`}</TotalCost> 
         <AddBudget>{items.length > 0 && (
           <div className='budget' onSubmit={handleAddBudget}>
     
           💵Budget: <input type='number' placeholder='R1000' value={budget} onChange={(e)=> setBudget(e.target.value)}/>
       
         </div>
         )}</AddBudget> 
        
        </div>
      ) : (
        <>
         <p style={{ textAlign: 'center', 
          fontFamily:'DM sans', 
          fontSize: '12px', 
          color: '#F08A5D',
           width: '80%', 
           margin: '10px 10px 10% 10%'}}>Please start <b>adding</b> your grocery items🥬🥒🍅</p>
           <h5 onClick={onSpecialsClick} className="specials__button">Specials🏷️</h5>
        </>
       
      )}
    </header>
  );
}

//Buttons
function TotalCost({ children }) {
  return <button className="total">{children}</button>;
}

function Active({ children }) {
  return <button className="active-UI">{children}</button>;
}

// function Clear({children, onClearItems}){

//   return (
//     <div className='action-buttons'><button className='clear-btn' onClick={onClearItems}>{children}</button></div>
//   )
// }

function SpecialsButton({onSpecialsClick}){
  return(
    <button className='specials-btn' onClick={onSpecialsClick}>Specials</button>
  )
}

function AddBudget({children}){
  return(
    <form className='budget'>
     
    {children}
 
   </form>
  )
}

function Specials({onSetSales}){



  return(
    <>
       <span className='back' onClick={()=>onSetSales(true)}>&larr;</span>
       <h2 className='specials_header'>Most popular stores</h2>
    <ul className='specials'>{specials.map((special)=> (
      <a href={special.linkURL}>
          <li key={special.store}>
        <div className='specials-data'>
       
        <img src={special.imageURL} 
        style={{width: 100}} 
        alt='store-logo'/>
        
       
        
        </div>
     </li>
      </a>
    
       
    ))}</ul>
    </>
 
  )
}

// function History({items}){
//   return (
//     <div className='history'>
//       <h2>History Lists</h2>
//       <ul className='active-list-items'>{items.filter((item) => item.shopped).map((item) => (
//         <li key={item.id}>
//           <p>{item.description}</p>
         
//         </li>
//       ))}
//       </ul>
//     </div>
//   );
// }

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


function Navigation({ onSpecialsClick, items, sales, onHistoryClick, onClearItems}) {
  return (
    <nav className="navigation">
      
     
      {items.length > 0 && sales  &&  <div className='action-buttons'><button className='clear-btn' onClick={onClearItems}>CLEAR LIST</button></div>}
      {items.length === 0 && (
        <ul>
   <li>Home</li>
   <li onClick={onSpecialsClick}>Specials</li>
   <li>Lists</li>
    <li onClick={onHistoryClick}>History</li>
    </ul>
      )}
     
        
     
    </nav>
  );
}

export default App;
