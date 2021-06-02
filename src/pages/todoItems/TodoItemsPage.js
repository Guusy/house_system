import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TodoItemsService from '../../services/todoItems/TodoItemsService';
import AddItem from '../../components/todoItems/addItem/AddItem';
import TaxList from '../../components/todoItems/taxList/TaxList';

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

    const classes = useStyles();
    const [todoItems, setTodoItems] = useState(null)
    const fetchData = useCallback(async () => {
        try {
            const response = await TodoItemsService.getAll()
            setTodoItems(response.data)
        } catch (error) {
            console.log('Error fetching todo items', error)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [])


    return <div>
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Busca tu item"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <TaxList items={(todoItems && todoItems.taxes) || []} refreshList={fetchData} />
        <AddItem />
    </div>
}

export default TodoItemsPage
