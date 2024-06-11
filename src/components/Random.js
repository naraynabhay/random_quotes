import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import useQuote from '../hooks/useQuote';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Random = () => {
  const { quote, loading, fetchQuote } = useQuote();
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [showSavedQuotes, setShowSavedQuotes] = useState(false);

  useEffect(() => {
    const quotes = localStorage.getItem('savedQuotes');
    if (quotes) {
      setSavedQuotes(JSON.parse(quotes));
    }
  }, []);

  const saveQuote = () => {
    if (quote && !savedQuotes.includes(quote)) {
      const updatedQuotes = [...savedQuotes, quote];
      setSavedQuotes(updatedQuotes);
      localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
      toast.success('Quote saved successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const toggleSavedQuotes = () => {
    setShowSavedQuotes(!showSavedQuotes);
  };

  const deleteAllQuotes = () => {
    setSavedQuotes([]);
    localStorage.removeItem('savedQuotes');
    toast.info('All saved quotes deleted.', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className='w-1/2 bg-green-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>
      <h1 className='mt-[15px] text-2xl underline uppercase font-bold'>A Random Quote</h1>

      {loading ? (<Spinner />) : (<p className='text-center'>{quote}</p>)}

      <button onClick={() => fetchQuote()} className="w-10/12 bg-yellow-500 text-lg py-2 rounded-lg mb-[20px]">
        Generate
      </button>

      <button onClick={() => saveQuote()} className="w-10/12 bg-yellow-500 text-lg py-2 rounded-lg mb-[20px]">
        Save
      </button>

      <button onClick={toggleSavedQuotes} className="w-10/12 bg-blue-500 text-lg py-2 rounded-lg mb-[20px]">
        {showSavedQuotes ? 'Hide Saved Quotes' : 'View Saved Quotes'}
      </button>

      {showSavedQuotes && savedQuotes.length > 0 && (
        <div className='w-10/12 bg-white rounded-lg p-4 mt-[20px]'>
          <h2 className='text-xl font-bold mb-2'>Saved Quotes</h2>
          <ul>
            {savedQuotes.map((savedQuote, index) => (
              <li key={index} className='mb-1'>{savedQuote}</li>
            ))}
          </ul>
          <button onClick={deleteAllQuotes} className="w-full bg-red-500 text-lg py-2 rounded-lg mt-[10px]">
            Delete All
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Random;
