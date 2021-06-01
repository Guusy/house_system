
import './App.css';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import CustomDrawer from './components/drawer/CustomDrawer'
import ShoppingPage from './pages/Shopping/ShoppingPage';
import TodoItemsPage from './pages/todoItems/TodoItemsPage';
function App() {


  return (
    <Router>

      <CustomDrawer>

        <Switch>

          <Route path="/shopping">
            <ShoppingPage />

          </Route>
          <Route path="/">
            <TodoItemsPage />
          </Route>
        </Switch>
        {/* <div className="App">
        <header className="App-header">
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
      </div> */}
      </CustomDrawer>
    </Router>

  );
}

export default App;