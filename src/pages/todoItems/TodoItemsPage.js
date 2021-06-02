import React, { useCallback, useEffect, useState } from 'react';
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
import DateService from '../../services/DateService';
import TaxService from '../../services/todoItems/tax/TaxService';

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
    const [todoItems, setTodoItems] = useState(null)
    const fetchData = useCallback(async () => {
        try {
            const response = await TodoItemsService.getAll()
            console.log(response.data)
            setTodoItems(response.data)
        } catch (error) {
            console.log('Error fetching todo items', error)
        }
    }, [])
    useEffect(() => {
        fetchData()
    }, [])

    const deleteTax = async (tax) => {
        try {
            await TaxService.delete(tax.id)
            await fetchData()
        } catch (error) {
            console.error('Error trying to delete', error)
        }
    }

    const payTax = async (tax) => {
        try {
            await TaxService.pay(tax.id)
            await fetchData();
        } catch (error) {
            console.error('Error trying to paid', error)
        }
    }

    const goToDetailPage = (type, idItem) => {
        history.push(`/${type}/${idItem}`);
    }

    const totalTax = todoItems && todoItems.taxes.reduce((acum, tax) => {
        return acum + tax.amount
    }, 0)

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
        <List dense>
            {todoItems ?
                <div>
                    Total a pagar: ${totalTax}
                    {todoItems.taxes.map((tax) => {
                        const { id, title, paid, estimated_date_pay } = tax
                        const secondary = paid ? `Pagado el ${DateService.transformDate(paid)}` : `Vence el ${DateService.transformDate(estimated_date_pay)}`
                        return <ListItem button onClick={() => goToDetailPage('tax', id)}>
                            <ListItemText
                                primary={title}
                                secondary={secondary}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="done" onClick={() => payTax(tax)}>
                                    <DoneIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteTax(tax)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                    })}
                </div>
                : <CircularProgress />
            }
        </List>
        <AddItem />
    </div>
}

export default TodoItemsPage
