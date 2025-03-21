import React, { useState, useEffect } from 'react';

const UpdateItem = ({ item }) => {
 
  const [updatedItem, setUpdatedItem] = useState(item?.name || '');  
  const [response, setResponse] = useState(''); 
  const [error, setError] = useState(''); 

 
  const handleUpdateItem = async (e) => {
    e.preventDefault();  
    

    const API_URI = `http://localhost:8000/doors/${item.id}`; // Replace with actual API URL

    try {
      // Send the updated data to the API
      const res = await fetch(API_URI, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedItem }), // Assuming 'name' is the property to update
      });

      if (!res.ok) {
        throw new Error('Failed to update item');
      }

      const data = await res.json();
      setResponse('Item updated successfully!');
      // Optionally, update the item with the new data from the response
    } catch (error) {
      setError('Error updating item: ' + error.message);
    }
  };

  // 3. Create a function to handle the form input changes
  const handleInputChange = (e) => {
    setUpdatedItem(e.target.value);  // Update the updatedItem state with the user's input
  };

  return (
    <div>
      <h2>Update Item</h2>

      {/* Displaying error and success messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && <p style={{ color: 'green' }}>{response}</p>}

      <form onSubmit={handleUpdateItem}>
        <label>
          Item Name:
          <input
            type="text"
            value={updatedItem}
            onChange={handleInputChange}
            placeholder="Update item name"
          />
        </label>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItem;