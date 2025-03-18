import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook koji dohvaća sve kategorije usluga sa backend-a
const useCategories = () => {
  // useState za čuvanje kategorija i statusa učitavanja
  const [categories, setCategories] = useState([]); // Lista kategorija
  const [loading, setLoading] = useState(true); // Status učitavanja podataka

  useEffect(() => {
    // Funkcija koja dohvaća kategorije sa API-ja
    const fetchCategories = async () => {
      try {
        // API poziv ka Laravel ruti koja vraća sve kategorije
        const response = await axios.get("http://127.0.0.1:8000/api/service-categories");

        // Postavljamo dohvaćene kategorije u state ili prazan niz ako nema podataka
        setCategories(response.data.categories || []);
      } catch (error) {
        // U slučaju greške, ispisujemo grešku u konzolu i postavljamo prazan niz
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        // Bez obzira na ishod, isključujemo indikator učitavanja
        setLoading(false);
      }
    };

    // Poziv funkcije za dohvat podataka
    fetchCategories();
  }, []); // Prazan niz zavisnosti znači da se useEffect izvršava samo jednom nakon prvog renderovanja

  // Vraćamo dobijene kategorije i status učitavanja
  return { categories, loading };
};

// Izvoz hook-a za korišćenje u drugim komponentama
export default useCategories;
