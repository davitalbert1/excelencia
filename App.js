import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [tarefa, setTarefa] = useState('');
  const [concluida, setConcluido] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [data, setData] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    readItems();
  }, []);

  const createItem = async () => {
   try {
      const newItem = { tarefa, prioridade, data, concluida };
      await axios.post('http://localhost:3001/items', newItem);
      readItems(); // Atualiza a lista de itens após a criação bem-sucedida
    } catch (error) {
      console.error('Erro ao criar item:', error);
    }
  };

  const readItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/items');
      setItems(response.data); // Define os itens recuperados do servidor
    } catch (error) {
      console.error('Erro ao ler itens:', error);
    }
  };

  const updateItem = async (index, updatedItemData) => {
    try {
      const itemId = items[index].id; // Supondo que cada item tenha um ID único
      await axios.put(`http://localhost:3001/items/${itemId}`, updatedItemData);
      const updatedItems = [...items];
      updatedItems[index] = { ...updatedItemData, id: itemId }; // Atualiza os dados localmente
      setItems(updatedItems);
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    }
  };
  

  const deleteItem = async (index) => {
    try {
      const itemId = items[index].id; // Supondo que cada item tenha um ID único
      await axios.delete(`http://localhost:3001/items/${itemId}`);
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  const toggleConcluida = (index) => {
    const updatedItems = [...items];
    updatedItems[index].concluida = !updatedItems[index].concluida;
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };
  

  return (
    <div className="App">
      <h2>CRUD Excelência</h2>

      <input type="text" value={tarefa} onChange={(e) => setTarefa(e.target.value)} placeholder="Tarefa" />
      <input type="text" value={prioridade} onChange={(e) => setPrioridade(e.target.value)} placeholder="Prioridade" />
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} placeholder="Data" />
      <input type="checkbox" value={concluida} onChange={(e) => setConcluido(e.target.value)} placeholder="concluida" />

      <button onClick={createItem}>Criar</button>
      <button onClick={readItems}>Ler</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.tarefa} - Prioridade: {item.prioridade} - Data: {item.data} -       
            <input
              type="checkbox"
              checked={item.concluida}
              onChange={() => toggleConcluida(index)}
            />
            <button onClick={() => deleteItem(index)}>Excluir</button>
            <button onClick={() => updateItem(index, item)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;