import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory, useParams } from "react-router-dom";
import AddItem from '../../components/todoItems/addItem/AddItem';
import TaxService from '../../services/todoItems/tax/TaxService';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateService from '../../services/DateService';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
}));

const TaxByIdPage = () => {
    let { id } = useParams();
    let history = useHistory();
    const classes = useStyles();
    const [tax, setTax] = useState(null)

    const fetchData = useCallback(async () => {
        try {
            const response = await TaxService.getById(id)
            setTax(response.data)
        } catch (error) {
            console.log('Error fetching tax items', error)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const deleteTax = async () => {
        try {
            await TaxService.delete(tax.id)
            history.push('/')
        } catch (error) {
            console.error('Error trying to delete', error)
        }
    }

    const pay = async () => {
        try {
            await TaxService.pay(tax.id)
            await fetchData();
        } catch (error) {
            console.error('Error trying to paid', error)
        }
    }

    const getCategory = (category) => {
        return category.toLowerCase().replace('_', ' ')
    }
    return <div>
        {tax ?
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {tax.title}

                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        ${tax.amount} - {DateService.transformDate(tax.estimated_date_pay)}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {tax.description}
                        <br />
                        Categoria: {getCategory(tax.category)}
                        <br />
                        Metodo de pago: {tax.payment_method}
                        <br />
                        Categoria: {getCategory(tax.category)}
                        <br />
                        Estado: {tax.paid ? `Pagado el ${DateService.transformDate(tax.paid)}` : 'No pagado'}
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'flex-end' }}>
                    <Button size="small" onClick={pay}>
                        <AttachMoneyIcon />
                    </Button>
                    <Button size="small" onClick={deleteTax}>
                        <DeleteIcon />
                    </Button>
                </CardActions>
            </Card>
            : <CircularProgress />}

    </div>
}

export default TaxByIdPage
