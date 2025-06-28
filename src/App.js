import React, { useState } from 'react';
import axios from 'axios';
import styles from './App.module.css';

function App() {
  const [targetAmount, setTargetAmount] = useState('');
  const [denominations, setDenominations] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = 'https://khadiijah.duckdns.org'; //live version
  //const BASE_URL = 'http://localhost:8080'; //dev version

  const validateInputs = () => {
    // validate amount
    const amount = parseFloat(targetAmount);
    if (isNaN(amount) || amount < 0 || amount > 10000) {
      setError('Amount must be between 0 and 10,000');
      return false;
    }

    // validate denominations
    const denoms = denominations.split(',').map(item => parseFloat(item.trim()));
    if (denoms.some(isNaN)) {
      setError('Invalid denominations format');
      return false;
    }

    const allowedDenoms = [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000];
    if (denoms.some(d => !allowedDenoms.includes(d))) {
      setError('Only allowed denominations are: 0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000');
      return false;
    }

    return { amount, denoms };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);

    const validation = validateInputs();
    if (!validation) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/change`, {
        targetAmount: validation.amount,
        denominations: validation.denoms
      });
      const coinsUsed = res.data.coins;
const sum = coinsUsed.reduce((a, b) => a + b, 0);
const remaining = parseFloat((validation.amount - sum).toFixed(2));

setResult({
  coins: coinsUsed,
  remaining: remaining > 0 ? remaining : 0
});
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(`${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🪙 Coin Change Calculator</h2>

      <form onSubmit={handleSubmit}>
      <label className={styles.inputLabel}>
          Target Amount:
          <input
            type="number"
            step="0.01"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            className={styles.inputField}
            placeholder="e.g. 7.03"
          />
        </label>

        <label className={styles.inputLabel}>
        Denominations (comma-separated):
          <input
            type="text"
            value={denominations}
            onChange={(e) => setDenominations(e.target.value)}
            placeholder="e.g. 0.01,0.5,1,5"
            required
            className={styles.inputField}
            pattern="^(\d+(\.\d+)?)(,\s*\d+(\.\d+)?)*$"
            title="Enter comma-separated numbers (e.g. 0.01,0.5,1,5)"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading ? ' Calculating...' : ' Calculate'}
          </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}


      {result && (
        <div className={styles.resultContainer}>
          <h3 className={styles.resultTitle}>Results</h3>
          <p>{result.coins.length} coin{result.coins.length !== 1 ? 's' : ''} needed:</p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {result.coins.sort((a, b) => a - b).map((coin, index) => (
              <span key={index} className={styles.coinChip}>
                {coin.toFixed(2)}
              </span>
            ))}
          </div>

          {result.remaining > 0 && (
      <div className={styles.error}>
        Could not cover full amount. Remaining: ${result.remaining.toFixed(2)}
      </div>
    )}
          
          <details>
            <summary>View raw JSON</summary>
            <pre className={styles.jsonPreview}>
            {JSON.stringify({ coins: result.coins, count: result.coins.length, remaining: result.remaining }, null, 2)}
            </pre>
          </details>
        </div>
      )}


    </div>
  );
}

export default App;
