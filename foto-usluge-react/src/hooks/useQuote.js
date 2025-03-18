import { useState, useEffect } from "react";
import axios from "axios";

const useQuote = (count = 3) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        // Use Promise.all to fetch multiple quotes concurrently
        const promises = Array.from({ length: count }, () =>
          axios.get("https://dummyjson.com/quotes/random")
        );
        const responses = await Promise.all(promises);
        const fetchedQuotes = responses.map((res) => res.data.quote);
        setQuotes(fetchedQuotes);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, [count]);

  return quotes;
};

export default useQuote;
