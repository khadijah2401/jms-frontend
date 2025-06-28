import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [targetAmount, setTargetAmount] = useState('');
  const [denominations, setDenominations] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://khadiijah.duckdns.org/api/change', {
        targetAmount: parseFloat(targetAmount),
        denominations: denominations.split(',').map(Number)
      });
      setResult(res.data.coins);
    } catch (err) {
      setResult(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>🪙 Coin Change Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Target Amount: </label>
          <input
            type="number"
            step="0.01"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Denominations (comma-separated): </label>
          <input
            type="text"
            placeholder="e.g. 0.01,0.5,1,5"
            value={denominations}
            onChange={(e) => setDenominations(e.target.value)}
          />
        </div>
        <button style={{ marginTop: '1rem' }} type="submit">Calculate</button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
