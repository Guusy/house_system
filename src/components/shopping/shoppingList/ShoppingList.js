import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductsService from '../../../services/products/ProductsService';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    marginTop: '0.8em'
  },
  listContainer: {
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function ShoppingList({ items, category, measure }) {
  const classes = useStyles();


  const addUnitToProduct = async (product) => {
    try {
      await ProductsService.addUnit(product)
    } catch (error) {
      console.error('Error adding unit to the product', error)
    }
  }

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" className={classes.title}>
          {category}
        </Typography>
        <div className={classes.listContainer}>
          <List dense>
            {items ? items.map((product) => {
              const { name, quantity, measurable   } = product
              return <ListItem>
                <ListItemText
                  primary={`${name} x ${quantity}`}
                />
                {measurable && <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => addUnitToProduct(product)}>
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>}

              </ListItem>
            })
              : <CircularProgress />
            }
          </List>
        </div>
      </Grid>
    </div>
  );
}
