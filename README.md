# PhotoLens

![Logo](./images/logo.png)

**PhotoLens** je full-stack platforma za freelance fotografiju koja povezuje **Kupce** i **Prodavce** u modernoj, jednostavnoj web aplikaciji. Napravljena je sa **React** front-endom i **Laravel** back-endom, i omogućava kupcima da pretražuju, filtriraju i daju ponude za fotografske usluge, dok prodavci mogu da kreiraju, upravljaju i analiziraju svoje usluge.

---

## 🚀 Karakteristike

- **React** SPA sa klijentskim rutiranjem  
- **Laravel** API zaštićen Sanctum-om  
- Kontrola pristupa po ulogama: **Kupac** & **Prodavac**  
- Katalog usluga sa pretragom, filtriranjem, sortiranjem i paginacijom  
- Sistem ponuda sa nadmetanjem, prihvatanjem, odbijanjem i inline izmenama  
- Prodavčeva kontrolna tabla (ukupan broj ponuda, prihodi, trendovi)  
- Responsive, moderan UI sa modalima, karticama, tabelama i grafikonima  

---

## 🎭 Uloge korisnika i primeri korišćenja

### 1. Kupac

1. **Pregled usluga**  
   - Početna strana sa sliderom na **Home**.  
   - Pretraga, sortiranje i filtriranje na **Services**.  
   - Klik na **View Details** za detalje usluge.

2. **Podnošenje ponude**  
   - Na stranici detalja usluge otvori modal **Make an Offer**.  
   - Prikaže se trenutna **osnovna cena** i **najviša ponuda**.  
   - Unesi svoju ponudu (≥ osnovne cene), odaberi način plaćanja, datum, i opuštanje.  
   - Pošalji ponudu; prati je na **My Offers**.

3. **Upravljanje ponudama**  
   - Na **My Offers** vidi sve svoje ponude prikazane kao kartice.  
   - Izmeni ili obriši ponude koje su još u statusu “Pending”.  
   - Status prikazan u obliku pill-e (Pending, Accepted, Rejected).

### 2. Prodavac

1. **Navigacija i kontrolna tabla**  
   - Posle prijave za Prodavca, idi na **Seller Home**, **My Services**, **Offers Received** ili **Analytics**.  
   - Profil meni prikazuje uloge-specifične linkove: _My Services_, _My Offers_, _Analytics_.

2. **Upravljanje uslugama**  
   - Stranica **Seller Services**: kreiraj nove usluge putem modala (naziv, kategorija, cena, opis).  
   - Inline izmena cene usluge.  
   - Paginiraj kroz svoj portfolio.

3. **Obrada pristiglih ponuda**  
   - Stranica **Offers Received** prikazuje tabelu svih ponuda na tvoje usluge.  
   - Kolone: Usluga, Kupac, Top Bidder, Cena, Plaćanje, Datum, Napomene, Status, Akcije.  
   - Otvori modal da prihvatiš jednu ponudu — automatski odbija ostale ponude za tu uslugu.  
   - Inline izmena cene/statusa i prikaz trenutnog najvišeg ponuđača.

4. **Analitika**  
   - **Seller Analytics** prikazuje: ukupan broj ponuda, pending/accepted/rejected, ukupan prihod, prosečnu ponudu.  
   - Stubičasti grafikon “Ponude tokom vremena” i linijski grafikon “Prihod tokom vremena”.

---

## 🏗 Tehnologije

| Sloj           | Tehnologija                    |
| -------------- | ------------------------------ |
| Front-end      | React, React Router, Axios     |
| Stilizacija    | CSS                            |
| Grafikoni      | Recharts                       |
| Back-end       | Laravel 10, Sanctum, Eloquent  |
| Baza podataka  | MySQL                          |
| HTTP klijent   | Axios                          |

---

## 📥 Instalacija i pokretanje

### Pretpostavke

- PHP ≥ 8.1, Composer  
- Node.js ≥ 16, npm ili Yarn  
- MySQL 
- Git  

---
⚙️ Instalacija i pokretanje
---------------------------

1. Klonirajte repozitorijum:
```bash
    git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-photo_services_2021_0382.git
```
2. Pokrenite backend:
```bash
   cd foto-usluge
   composer install
   php artisan migrate:fresh --seed
   php artisan serve
```
    
3. Pokrenite frontend:
```bash
   cd foto-usluge-react
   npm install
   npm start
```
    
4.  Frontend pokrenut na: [http://localhost:3000](http://localhost:3000) Backend API pokrenut na: [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)