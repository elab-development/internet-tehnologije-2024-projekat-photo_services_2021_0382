import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook za dohvaćanje svih dostupnih usluga sa backend-a
const useServices = () => {
  // useState za čuvanje liste svih usluga i statusa učitavanja
  const [allServices, setAllServices] = useState([]); // Lista svih usluga
  const [loading, setLoading] = useState(true); // Status učitavanja podataka

  useEffect(() => {
    // Funkcija koja dohvaća sve usluge sa API-ja
    const fetchServices = async () => {
      setLoading(true); // Postavljamo status učitavanja na true pre nego što započne dohvat podataka
      try {
        // API poziv ka Laravel ruti koja vraća listu svih usluga
        const response = await axios.get("http://127.0.0.1:8000/api/services", {
          params: {
            per_page: 1000, // Ograničavamo broj zapisa na 1000 kako bismo dohvatili sve usluge
            page: 1, // Dohvatamo podatke sa prve stranice (ako API podržava paginaciju)
          },
        });

        // Postavljamo dohvaćene usluge u state ili prazan niz ako nema podataka
        setAllServices(response.data.services || []);
      } catch (error) {
        // Ako dođe do greške, ispisujemo je u konzoli i postavljamo prazan niz
        console.error("Error fetching services:", error);
        setAllServices([]);
      } finally {
        // Bez obzira na ishod, isključujemo indikator učitavanja
        setLoading(false);
      }
    };

    // Poziv funkcije za dohvat podataka odmah po učitavanju komponente
    fetchServices();
  }, []); // Prazan niz zavisnosti znači da se useEffect izvršava samo jednom nakon prvog renderovanja

  // Vraćamo listu usluga i status učitavanja
  return { allServices, loading };
};

// Izvoz hook-a za korišćenje u drugim komponentama
export default useServices;
