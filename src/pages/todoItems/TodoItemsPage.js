import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TodoItemsService from '../../services/todoItems/TodoItemsService';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
import AddItem from '../../components/todoItems/addItem/AddItem';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

const TodoItemsPage = () => {
    const history = useHistory();

    const classes = useStyles();
    const [todoItems, setTodoItems] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TodoItemsService.getAll()
                console.log(response.data)
                setTodoItems(response.data)
            } catch (error) {
                console.log('Error fetching todo items', error)
            }
        }

        fetchData()
    }, [])

    const deleteTodoItem = (item) => {

    }

    const finishTodoItem = (item) => {

    }

    const goToDetailPage = (idItem) => {
        history.push(`/todo-items/${idItem}`);
    }

    return <div>
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Busca tu producto"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <List dense>
            {todoItems ? todoItems.map((item) => {
                const { id, title, category, amount, payment_method, estimated_date_pay } = item
                const [date] = estimated_date_pay.split('T')
                return <ListItem button onClick={() => goToDetailPage(id)}>
                    <ListItemText
                        primary={title}
                        secondary={date}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="done" onClick={() => finishTodoItem(item)}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTodoItem(item)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>

                </ListItem>
            })
                : <CircularProgress />
            }
        </List>
        <AddItem />
    </div>
}

export default TodoItemsPage
