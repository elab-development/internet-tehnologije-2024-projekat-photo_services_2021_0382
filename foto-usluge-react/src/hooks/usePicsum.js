// Custom hook za generisanje slike sa Picsum API-ja na osnovu naziva kategorije
const usePicsum = (categoryName) => {
  // Generisanje seed vrednosti za Picsum API na osnovu naziva kategorije
  const seed = categoryName
    ? categoryName.replace(/\s+/g, "-").toLowerCase() // Zamena razmaka crticom i pretvaranje u mala slova
    : "default"; // Ako nema kategorije, koristi se podrazumevana vrednost "default"

  // Generisanje URL-a slike sa Picsum API-ja koristeći seed kao jedinstveni identifikator
  const imageUrl = `https://picsum.photos/seed/${seed}/600/400`;

  // Vraćanje URL-a slike
  return imageUrl;
};

// Izvoz hook-a za korišćenje u drugim komponentama
export default usePicsum;
