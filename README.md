# PhotoLens

![Logo](./images/logo.png)

**PhotoLens** is a full-stack freelance photography marketplace that connects **Buyers** and **Sellers** in a modern, easy-to-use web application. Built with a **React** front-end and a **Laravel** back-end, PhotoLens empowers buyers to browse, filter, and make offers on photography services, while enabling sellers to create, manage, and analyze their service offerings.

---

## 🚀 Features

- **React** SPA with client-side routing  
- **Laravel** API secured with Sanctum  
- Role-based access control: **Buyer** & **Seller**  
- Service catalogue with search, filter, sort, and pagination  
- Offer system with bidding, acceptance, rejection, and inline editing  
- Seller analytics dashboard (total offers, revenue, trends)  
- Responsive, modern UI with modals, tables, cards, and charts  

---

## 🎭 User Roles & Use Cases

### 1. Buyer

1. **Browse Services**  
   - View featured slider on **Home**.  
   - Search, sort, and filter all available services on **Services**.  
   - Click **View Details** to see full service info.

2. **Make an Offer**  
   - On a service’s details page, open the **Make an Offer** modal.  
   - See current **base price** and **highest bid** so far.  
   - Propose a new bid (≥ base price), select payment type, choose date, add notes.  
   - Submit your offer; view it on **My Offers**.

3. **Manage Offers**  
   - On **My Offers**, see all your bids as cards.  
   - Edit or delete pending offers.  
   - Track status pill (Pending, Accepted, Rejected).

### 2. Seller

1. **Dashboard & Navigation**  
   - After signing in as Seller, navigate to **Seller Home**, **My Services**, **Offers Received**, or **Analytics**.  
   - Profile menu shows role-specific links: _My Services_, _My Offers_, _Analytics_.

2. **Manage Services**  
   - **Seller Services** page: create new services via modal (name, category, price, description).  
   - Inline edit service price.  
   - Paginate through your portfolio.

3. **Handle Incoming Offers**  
   - **Offers Received** table lists all bids on your services.  
   - Columns: Service, Buyer, Top Bidder, Price, Payment, Date, Notes, Status, Actions.  
   - Open modal to accept one offer—automatically rejects all other bids on that service.  
   - Inline update price/status and view the current highest bidder.

4. **Analytics**  
   - **Seller Analytics** shows total/pending/accepted/rejected counts, total revenue, average offer.  
   - Bar chart of offers over time; line chart of revenue trends.

---

## 🏗 Technology Stack

| Layer        | Technology                   |
| ------------ | ---------------------------- |
| Front-end    | React, React Router, Axios   |
| Styling      | Tailwind CSS, shadcn/ui      |
| Charts       | Recharts, Chart.js           |
| Back-end     | Laravel 10, Sanctum, Eloquent|
| Database     | MySQL / MariaDB              |
| HTTP Client  | Axios                        |
| Deployment   | Docker, Nginx (optional)     |

---

## 📥 Installation & Setup

### Prerequisites

- PHP ≥ 8.1, Composer  
- Node.js ≥ 16, npm or Yarn  
- MySQL / MariaDB  
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