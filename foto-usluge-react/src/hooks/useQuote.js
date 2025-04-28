import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook koji dohvaća nasumične citate sa DummyJSON API-ja
const useQuote = (count = 3) => {
  // useState za čuvanje dohvaćenih citata
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    // Funkcija za dohvat citata sa API-ja
    const fetchQuotes = async () => {
      try {
        // Kreiranje niza obećanja (promises) koji će paralelno izvršiti više API poziva
        const promises = Array.from({ length: count }, () =>
          axios.get("https://dummyjson.com/quotes/random")
        );

        // Čekamo da se svi API pozivi završe
        const responses = await Promise.all(promises);

        // Ekstrahujemo samo tekst citata iz odgovora
        const fetchedQuotes = responses.map((res) => res.data.quote);

        // Postavljamo dobijene citate u state
        setQuotes(fetchedQuotes);
      } catch (error) {
        // Ako dođe do greške, ispisujemo je u konzoli
        console.error("Error fetching quotes:", error);
      }
    };

    // Poziv funkcije za dohvat podataka
    fetchQuotes();
  }, [count]); // Ponovno izvršavanje samo ako se promeni broj citata

  // Vraćanje liste citata
  return quotes;
};

// Izvoz hook-a za korišćenje u drugim komponentama
export default useQuote;
