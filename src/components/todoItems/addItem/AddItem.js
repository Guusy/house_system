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
import Receipt from '@material-ui/icons/Receipt';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import Typography from '@material-ui/core/Typography';
import ProductsService from '../../../services/products/ProductsService';
import Paper from '@material-ui/core/Paper';
import TodoItemForm from './todoItemForm/TodoItemForm';
import TaxItemForm from './taxItemForm/TaxItemForm';


const options = {
    'todo-items': TodoItemForm,
    'tax': TaxItemForm,
}
const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    buttonQuantity: {
        margin: theme.spacing(1)
    },
    itemSelection: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    paperContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));
export default function AddItem() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles()
    const [option, setOption] = useState(null)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
                <DialogTitle id="form-dialog-title">Que queres agregar ?</DialogTitle>
                <DialogContent>
                    {/* {!option &&
                        <div className={classes.itemSelection}>
                            <Paper className={classes.paperContainer} elevation={3} onClick={() => setOption('todo-items')}>
                                <FormatListBulleted />
                            Todo item
                        </Paper>
                            <Paper className={classes.paperContainer} elevation={3} onClick={() => setOption('tax')}>
                                <Receipt />
                            Impuesto
                        </Paper>
                        </div>} */}

                    <TaxItemForm finishFlow={handleClose} />
                </DialogContent>

            </Dialog>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
        </>
    );
}
