import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import CardItem from '../../components/shopping/shoppingList/ShoppingList';
import AddProduct from '../../components/shopping/addProduct/AddProduct';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


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

const ShoppingPage = () => {
    const classes = useStyles();
    const items = [{
        name: 'Jamon',
        noMeasureQuantiy: true,
        quantity: '300grs'
    }]
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
        <CardItem items={items} category='Comida' />
        <AddProduct />
    </div>
}

export default ShoppingPage
