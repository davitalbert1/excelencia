import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);

  const createItem = () => {
    const newItem = { title, description, quantity, price };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    readItems();
  };

  const readItems = () => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  };

  const updateItem = (index, item) => {
    setTitle(item.title);
    setDescription(item.description);
    setQuantity(item.quantity);
    setPrice(item.price);
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    readItems();
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    readItems();
  };
};

ReactDOM.render(<App />, document.getElementById('root'));