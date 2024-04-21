import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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

  return (
    <div>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button variant="contained" onClick={createItem}>Create</Button>
      
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={item.title}
              secondary={`Description: ${item.description}, Quantity: ${item.quantity}, Price: ${item.price}`}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => deleteItem(index)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => updateItem(index, item)}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));