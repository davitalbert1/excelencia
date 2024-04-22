import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Checkbox,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  List,
} from '@mui/material';

const App = () => {
  const [tarefa, setTarefa] = useState('');
  const [concluida, setConcluido] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [data, setData] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    readItems();
  }, []);

  //cria itens e insere na lista
  const createItem = async () => {
   try {
      const newItem = { tarefa, prioridade, data, concluida };
      await axios.post('http://localhost:3001/items', newItem);
      readItems(); // chama a função readItems para atualizar a lista
    } catch (error) {
      console.error('Erro ao criar item:', error);
    }
  };

  //"pega" os itens do armazenamento local e mostra eles na tela
  const readItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/items');
      setItems(response.data); // Define os itens recuperados do servidor
    } catch (error) {
      console.error('Erro ao ler itens:', error);
    }
  };

  // encontra itens na lista, atualiza componentes retorna eles
  const updateItem = async (index, updatedItemData) => {
    try {
      const itemId = items[index].id;
      await axios.put(`http://localhost:3001/items/${itemId}`, updatedItemData);
      const updatedItems = [...items];
      updatedItems[index] = { ...items[index], ...updatedItemData }; // verifica os itens alterados e atualiza somente eles
      setItems(updatedItems);
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };  
  

  //encontra itens na lista e deleta eles
  const deleteItem = async (index) => {
    try {
      const itemId = items[index].id; // se baseia no id do item
      await axios.delete(`http://localhost:3001/items/${itemId}`);
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  //verifica se a checkbox está "marcada" ou não
  const toggleConcluida = (index) => {
    const updatedItems = [...items];
    updatedItems[index].concluida = !updatedItems[index].concluida;
    setItems(updatedItems);
  
    // Salvando no armazenamento local
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };
  
  
//cria o FrontEnd com o MOi e mostra na tela
  return (
    <div className="App">
      <img src="https://media.licdn.com/dms/image/C4D0BAQFVzD21blm4rQ/company-logo_200_200/0/1677695284039/excelenciainteligencia_financeira_logo?e=1721865600&v=beta&t=-JLoh51huzw01ZYbi6BzTn1OkldsosG2IAp1liquIpA" alt="Logo da Excelência Inteligência Financeira"></img>
      <h2> Gerenciador de tarefas</h2>

      <TextField
        label="Tarefa"
        value={tarefa}
        onChange={(e) => setTarefa(e.target.value)}
      />
      <TextField
        label="Prioridade"
        value={prioridade}
        onChange={(e) => setPrioridade(e.target.value)}
      />
      <TextField
        label="Data"
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <Checkbox
        checked={concluida}
        onChange={(e) => setConcluido(e.target.checked)}
      />

      <Button variant="contained" onClick={createItem}>Criar</Button>
      <Button variant="contained" onClick={createItem}>Ler</Button>

      <ul>
        {items.map((item, index) => (
          <ListItem key={index}>
          <Checkbox
            checked={item.concluida}
            onChange={() => toggleConcluida(index)}
          />
          <ListItemText
            primary={item.tarefa}
            secondary={`Prioridade: ${item.prioridade}, Data: ${item.data}`}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => deleteItem(index)}>Excluir</IconButton>
            <IconButton onClick={() => updateItem(index, item)}>Editar</IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        ))}
      </ul>
    </div>
  );
};

export default App;