
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [todoItems, setTodoItems] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/todo-items')
        console.log(response.data)
        setTodoItems(response.data)
      } catch (error) {
        console.log('Error fetching todo items', error)
      }
    }

    fetchData()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>House sytem app</p>


        <p>
          Todo items
      </p>
        {todoItems.map(todoItem => <div className='todo-item'>
          <p>{todoItem.title}</p>
          <p>Descripcion:{todoItem.description}</p>
          <p>Categoria: {todoItem.category}</p>
          <p>Monto: {todoItem.amount} en {todoItem.payment_method}</p>
          <p>Dia estimado de pago: {todoItem.estimated_date_pay}</p>
        </div>)}
      </header>
    </div>
  );
}

export default App;
