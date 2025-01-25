import { useState, useEffect, useRef } from 'react';

import Active from './UI Buttons/Active';
import SpecialsButton from './UI Buttons/Specials';
import TotalCost from './UI Buttons/Total';

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
             {/* <h5 onClick={onSpecialsClick} className="specials__button">Specials🏷️</h5> */}
          </>
         
        )}
      </header>
    );
  }
  function AddBudget({children}){
  return(
    <form className='budget'>
     
    {children}
 
   </form>
  )
}

export default Header;