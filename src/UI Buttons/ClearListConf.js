function ClearListConf({onClearItems, isClearing, clear}) {
    return (
        <div className="modal-background">
            
          <Modal onClearItems={onClearItems} isClearing={isClearing}
          clear={clear}/>  
        </div>
    )
}

function Modal({onClearItems, clear}){
    return(
        <div className="clear_modal">
<h3>Are you sure you want to clear this list?</h3>
       <button className='clearlist-confirm' onClick={onClearItems}>Yes</button>
       <button className='clearlist-cancel' onClick={()=> clear((isClearing)=> !isClearing)}>No</button>
        </div>
       
    )
}

export default ClearListConf
