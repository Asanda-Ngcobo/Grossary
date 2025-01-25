import { useState, useEffect} from 'react';
import useLocalStorage from './useLocalStorage';

import Clear from './ClearButton';
import './index.css';
import specials from './Specials';
import Main from './Main';
import ClearListConf from './UI Buttons/ClearListConf';


function App() {
  const [items, setItems] = useLocalStorage([], 'added');
  const [isClearing, setisClearing] = useState(false)
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
  setisClearing(false);

  }

  function handleSpecialsClick(){
    setSales(!sales)
  }


  const toBeShoppedCount = Array.isArray(items)
  ? items.filter((item) => !item.shopped).length
  : 0;
  return (
    <div className="App">
    {isClearing  && <ClearListConf clear={setisClearing}
    onClearItems={handleClearList}
    isClearing={isClearing}
    setIsClearing={setisClearing}/>} 
  
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
     

    {items.length > 0 && <Clear  
    showClearModal={setisClearing}
    isClearing={isClearing}>Clear List</Clear>}
    
     

     
    </div>
  );
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



export default App;
