function Clear({children, showClearModal}){

    return (
      <div className='action-buttons'><button className='clear-btn' onClick={()=> showClearModal((isClearing)=> !isClearing)}>{children}</button></div>
    )
  }

  export default Clear;