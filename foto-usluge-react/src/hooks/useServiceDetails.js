import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook za dohvaćanje detalja o određenoj usluzi na osnovu ID-a
const useServiceDetails = (id) => {
  // useState za čuvanje podataka o usluzi, statusa učitavanja i eventualnih grešaka
  const [service, setService] = useState(null); // Čuva podatke o konkretnoj usluzi
  const [loading, setLoading] = useState(true); // Status učitavanja podataka
  const [error, setError] = useState(null); // Čuva eventualne greške

  useEffect(() => {
    // Funkcija koja dohvaća podatke o usluzi sa API-ja
    const fetchServiceDetails = async () => {
      setLoading(true); // Postavljamo status učitavanja na true pre dohvaćanja podataka
      try {
        // API poziv ka Laravel ruti za dohvat pojedinačne usluge po ID-u
        const response = await axios.get(`http://127.0.0.1:8000/api/services/${id}`);
        
        // Postavljamo dohvaćene podatke o usluzi u state
        setService(response.data.service);
      } catch (err) {
        // Ako dođe do greške, postavljamo je u state
        setError(err);
      } finally {
        // Nakon završetka učitavanja, bez obzira na ishod, status učitavanja se postavlja na false
        setLoading(false);
      }
    };

    // Pozivamo funkciju samo ako postoji validan ID usluge
    if (id) {
      fetchServiceDetails();
    }
  }, [id]); // Hook se ponovo izvršava svaki put kada se promeni vrednost ID-a

  // Vraćamo podatke o usluzi, status učitavanja i eventualnu grešku
  return { service, loading, error };
};

// Izvoz hook-a za korišćenje u drugim komponentama
export default useServiceDetails;
