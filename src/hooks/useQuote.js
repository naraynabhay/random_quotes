import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = `https://ron-swanson-quotes.herokuapp.com/v2/quotes`;

const useQuote = () => {
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(false);

    async function fetchQuote() {
        setLoading(true);
        try {
            const { data } = await axios.get(url);
            const quoteText = data[0];  
            setQuote(quoteText);
        } catch (error) {
            console.error('Error fetching the quote:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchQuote();
    }, []);

    return { quote, loading, fetchQuote };
}

export default useQuote;
