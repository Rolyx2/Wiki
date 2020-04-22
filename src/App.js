import React from 'react';
import { useState } from 'react';
import './App.css';

const Console = prop => (
  console[Object.keys(prop)[0]](...Object.values(prop))
  ,null // ➜ React components must return something 
)

async function dsp (value) {
  let data = await fetch("https://fast-refuge-95275.herokuapp.com/news?search="+ value);
  return await data.json();
}

function App() {
  const [nameMassive, setNameMassive] = useState([]);
  let linkMassive = [];
  const [input, setInput] = useState('');
  let handleClick2 = (e) => {
    e.preventDefault();
    console.log(input);
    dsp(input).then((data) => {
      let dspMassive = [];
        for (let i = 0; i < data[1].length; i++) {
          dspMassive.push({
            name: data[1][i],
            link: data[3][i]
          })
        }
    setNameMassive(dspMassive);
    })
  }

  
  return (
    <div className="App">
      <input value={input} onInput={e => setInput(e.target.value)}/>
      <Console log='First' />
      <button id='searchButton' onClick={handleClick2}> F</button>
      <div>
        {
          nameMassive.map(wiki => <a class='linq' href={wiki.link}>{wiki.name}</a>)
        }
      </div>

    </div>
  );
}

export default App;
