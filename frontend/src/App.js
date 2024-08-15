import React, { useState } from 'react';
import './App.css';

function App() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemId, setItemId] = useState('');
  const [fetchedItem, setFetchedItem] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const handleCreateItem = async () => {
    const response = await fetch('http://localhost:8000/create-item/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: itemName, description: itemDescription }),
    });
    const data = await response.json();
    setItemId(data.item_id);
  };

  const handleGetItem = async () => {
    const response = await fetch(`http://localhost:8000/items/${itemId}`);
    const data = await response.json();
    if (response.ok) {
      setFetchedItem(data.item);
      setFetchError(null);
    } else {
      setFetchedItem(null);
      setFetchError(data.error);
    }
  };

  return (
    <div className="App">
      <h1>Create and Fetch Items</h1>

      <div>
        <h2>Create Item</h2>
        <input
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <button onClick={handleCreateItem}>Create Item</button>
      </div>

      <div>
        <h2>Fetch Item</h2>
        <input
          type="text"
          placeholder="Item ID"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
        <button onClick={handleGetItem}>Get Item</button>
      </div>

      <div>
        {fetchedItem && (
          <div>
            <h3>Item Details</h3>
            <p>ID: {itemId}</p>
            <p>Name: {fetchedItem.name}</p>
            <p>Description: {fetchedItem.description}</p>
          </div>
        )}
        {fetchError && (
          <div>
            <h3>Error</h3>
            <p>{fetchError}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
