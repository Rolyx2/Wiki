import React from 'react';

const Console = prop => (
    console[Object.keys(prop)[0]](...Object.values(prop))
    ,null // ➜ React components must return something 
  )
  
  function App() {
    function handleClick(e) {
      e.preventDefault();
      console.log('По ссылке кликнули.');
    }
    return (
      <div className="App">
        <input placeholder='kek' id='input' ></input>
        <Console log='First' />
        <button id='searchButton' onClick={handleClick}> F</button>
      </div>
    );
  }
  
  export default App;