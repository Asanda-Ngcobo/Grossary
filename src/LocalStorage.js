import { useState, useEffect } from "react";

function useLocalStorage(key) {
    const [value, setValue] = useState(function(){
        // retrieve watched data from local storage
        const storeAdded = JSON.parse(localStorage.getItem(key));
        if(storeAdded){
          return storeAdded;
        }
        return [];
      });
        //Keeping the state of the watched intact even after refreshing
  useEffect(function(){
    localStorage.setItem(key, JSON.stringify(value)); 
    //JSON.stringify is used to store watched data into a string because localStorage works with strings.
     }, [value, key])
   return [value, setValue]
}


export default useLocalStorage;