import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [targetAmount, setTargetAmount] = useState('');
  const [denominations, setDenominations] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const BASE_URL = 'https://khadiijah.duckdns.org'; //live version
      //const BASE_URL = 'http://localhost:8080'; //dev version

      const res = await axios.post(`${BASE_URL}/api/change`, {
        targetAmount: parseFloat(targetAmount),
        denominations: denominations.split(',').map(Number)
      });
      setResult(res.data.coins);
    } catch (err) {
      setError(' Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '3rem auto', fontFamily: 'Arial, sans-serif', padding: '2rem', border: '1px solid #ccc', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center' }}>🪙 Coin Change Calculator</h2>

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Target Amount:
          <input
            type="number"
            step="0.01"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', marginBottom: '1rem' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Denominations (comma-separated):
          <input
            type="text"
            value={denominations}
            onChange={(e) => setDenominations(e.target.value)}
            placeholder="e.g. 0.01,0.5,1,5"
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', marginBottom: '1rem' }}
          />
        </label>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          💡 Calculate
        </button>
      </form>

      {error && (
        <div style={{ marginTop: '1.5rem', color: 'red', fontWeight: 'bold' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '2rem', backgroundColor: '#f6f8fa', padding: '1rem', borderRadius: '8px' }}>
          <h3>Result:</h3>
          <p>{result.length} coin(s):</p>
          <pre style={{ margin: 0 }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
