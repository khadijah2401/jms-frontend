# 🪙 Coin Change Calculator – Frontend (React)

This is the React-based frontend for the **JMS Coin Change Calculator** project. It allows users to input a target amount and a list of currency denominations to compute the minimum number of coins using a greedy algorithm.

## Live Deployment

🔗 [https://khadiijah.duckdns.org](https://khadiijah.duckdns.org)

## Features

- Input validation for target amount and denominations  
- Accepts only allowed denominations: `0.01`, `0.05`, `0.1`, `0.2`, `0.5`, `1`, `2`, `5`, `10`, `50`, `100`, `1000`  
- Sends request to backend API (`/api/change`)  
- Displays sorted coins and raw JSON output  
- Handles invalid inputs and server errors gracefully  
- Styled using CSS Modules  

## Tech Stack

- **Frontend Framework:** React  
- **HTTP Client:** Axios  
- **Styling:** CSS Modules  
- **Deployment:** Netlify  

## Getting Started

```bash
git clone https://github.com/your-username/jms-frontend.git
cd jms-frontend
npm install
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## API Configuration

To switch between local and deployed backend:

```js
const BASE_URL = 'https://khadiijah.duckdns.org'; // Live
// const BASE_URL = 'http://localhost:8080';     // Local
```

## UI Preview

> _[screenshot]_

---

```
