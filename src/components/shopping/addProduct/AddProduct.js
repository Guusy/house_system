import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import ProductsService from '../../../services/products/ProductsService';


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    buttonQuantity: {
        margin: theme.spacing(1)
    }
}));
export default function FormDialog() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles()
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addQuantity = (number) => {
        setQuantity((Number.parseInt(quantity, 10) || 0) + number)
    }

    const addProduct = async () => {
        try {
            await ProductsService.addProduct({
                name,
                quantity,
                category,
                measurable: true // TODO: add the logic to check it
            })
            handleClose()
        } catch (error) {
            console.error('There was a error trying to save the product', error)
        }
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
                <DialogTitle id="form-dialog-title">Agregar producto</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={({ target: { value } }) => setName(value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label="Cantidad"
                        type="text"
                        fullWidth
                        value={quantity}
                        onChange={({ target: { value } }) => setQuantity(value)}
                    />
                    <Button
                        variant="contained"
                        className={classes.buttonQuantity}
                        color="primary"
                        onClick={() => addQuantity(1)}
                    >
                        +1
                    </Button>
                    <Button variant="contained" className={classes.buttonQuantity} color="primary" onClick={() => addQuantity(2)}>+2</Button>
                    <Button variant="contained" className={classes.buttonQuantity} color="primary" onClick={() => addQuantity(3)}>+3</Button>
                    <Button variant="contained" className={classes.buttonQuantity} color="primary" onClick={() => addQuantity(4)}>+4</Button>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="Categoria"
                        type="text"
                        value={category}
                        fullWidth
                        onChange={({ target: { value } }) => setCategory(value)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={addProduct} color="primary">
                        Agregar
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
          </Button>
                </DialogActions>
            </Dialog>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
        </>
    );
}
