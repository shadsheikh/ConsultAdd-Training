import { useRef, useState } from 'react';

export default function CurrencyCoverter(){
  const inputRef = useRef(null);
  const [result,setResult]=useState('');
  const [selectedCurrency,setSelectedCurrency] = useState("usd");
    
  function change(){
    if(selectedCurrency==="usd")
    setResult(81.68*inputRef.current.value);
    else if(selectedCurrency==="eur")
    setResult(88.30*inputRef.current.value);
    else if(selectedCurrency==="jpy")
    setResult(0.64*inputRef.current.value);
    else if(selectedCurrency==="gbp")
    setResult(99.56*inputRef.current.value);
    else if(selectedCurrency==="chf")
    setResult(88.15*inputRef.current.value);
  };

  function handleChange(e) {
    setSelectedCurrency(e.target.value);
  }

  return (
    <div>
      <input type="number" placeholder="Enter current currency" id="CCurrency" ref={inputRef}/>
        <select value={selectedCurrency} onChange={handleChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
          <option value="gbp">GBP</option>
          <option value="chf">CHF</option>
        </select>
      <button onClick={change}>Convert</button>
      <h2>Converted Currency: {result} INR</h2>
    </div>
  )
}
