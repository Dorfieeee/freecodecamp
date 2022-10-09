import './App.css';
import Quote from './Components/Quote';
import {getRandomQuote} from './API/api'
import { useEffect, useState } from 'react';

function App() {

  const [quote, setQuote] = useState(null)

  async function fetchQuote() {
     let q = await getRandomQuote()
     setQuote(q)
  }

  const handleNewQuoteClick = async (event) => {
    fetchQuote()
  }

  useEffect(() => {
     fetchQuote()
  }, [])

  return (
    <div className="App">
      <Quote text={quote?.quote || ""} author={quote?.author || ""} handleNewQuoteClick={handleNewQuoteClick} />    
    </div>
  );
}

export default App;
