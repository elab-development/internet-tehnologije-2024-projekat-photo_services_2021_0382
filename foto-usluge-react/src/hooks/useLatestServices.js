import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook koji dohvaća najnovije usluge sa backend-a
const useLatestServices = () => {
  // useState za čuvanje liste najnovijih usluga
  const [latestServices, setLatestServices] = useState([]);

  useEffect(() => {
    // Funkcija za dohvat usluga sa API-ja
    const fetchServices = async () => {
      try {
        // API poziv ka Laravel ruti koja vraća listu usluga
        const response = await axios.get("http://127.0.0.1:8000/api/services", {
          params: { per_page: 10 }, // Ograničavamo rezultat na 10 usluga
        });

        // Dohvaćene usluge iz odgovora API-ja, ako nema podataka postavlja se prazan niz
        const services = response.data.services || [];

        // Mešamo niz da bismo dobili nasumične usluge
        const shuffled = services.sort(() => 0.5 - Math.random());

        // Postavljamo samo prvih 5 nasumičnih usluga
        setLatestServices(shuffled.slice(0, 5));
      } catch (error) {
        // Ako dođe do greške pri dohvaćanju, prikazujemo je u konzoli
        console.error("Error fetching latest services:", error);
      }
    };

    // Poziv funkcije za dohvat podataka
    fetchServices();
  }, []); // Prazan niz zavisnosti znači da se useEffect izvršava samo jednom nakon prvog renderovanja

  // Vraćamo niz najnovijih usluga
  return { latestServices };
};

// Izvoz hook-a za korišćenje u drugim komponentama
export default useLatestServices;
