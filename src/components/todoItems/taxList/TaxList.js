import TaxService from "../../../services/todoItems/tax/TaxService"
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DoneIcon from '@material-ui/icons/Done';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useHistory } from "react-router-dom";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DateService from "../../../services/DateService";
import PublicIcon from '@material-ui/icons/Public';
import { useCallback, useState } from "react";

const filtersInitialState = {
    'cash': { condition: (tax) => tax.payment_method === 'cash', active: false },
    'virtual': { condition: (tax) => tax.payment_method === 'virtual', active: false },
    'automatic_debit': { condition: (tax) => tax.payment_method === 'automatic_debit', active: false },
}

const TaxList = ({ items, refreshList }) => {
    const history = useHistory();

    const [filters, setFilters] = useState([])

    const selectFilter = (property) => () => {
        let newFilters = [...filters]
        if (filters.includes(property)) {
            newFilters = newFilters.filter(filter => filter !== property)
        } else {
            newFilters.push(property)
        }
        setFilters(newFilters)
    }

    const deleteTax = async (tax) => {
        try {
            await TaxService.delete(tax.id)
            await refreshList()
        } catch (error) {
            console.error('Error trying to delete', error)
        }
    }

    const payTax = async (tax) => {
        try {
            await TaxService.pay(tax.id)
            await refreshList();
        } catch (error) {
            console.error('Error trying to paid', error)
        }
    }

    const goToDetailPage = (type, idItem) => {
        history.push(`/${type}/${idItem}`);
    }

    const totalTax = items.reduce((acum, tax) => {
        const sum = !tax.paid ? tax.amount : 0
        return acum + sum
    }, 0)

    const getTaxWithAppliedFilters = useCallback(() => {
        if (filters.length > 0) {
            return items.filter(item => filters.includes(item.payment_method))
        } else {
            return items
        }
    }, [filters, items])
    return <>
        <div style={{
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            <IconButton edge="end" aria-label="done" onClick={selectFilter('cash')}>
                <AttachMoneyIcon />
            </IconButton>
            <IconButton edge="end" aria-label="done" onClick={selectFilter('automatic_debit')}>
                <AccountBalanceIcon />
            </IconButton>
            <IconButton edge="end" aria-label="done" onClick={selectFilter('virtual')}>
                <PublicIcon />
            </IconButton>

        </div>
        <List dense>
            {items ?
                <div>
                    Total a pagar: ${totalTax}
                    {getTaxWithAppliedFilters(items).map((tax) => {
                        const { id, title, paid, estimated_date_pay } = tax
                        const secondary = paid ? `Pagado el ${DateService.transformDate(paid)}` : `Vence el ${DateService.transformDate(estimated_date_pay)}`
                        return <ListItem button onClick={() => goToDetailPage('tax', id)}>
                            <ListItemText
                                primary={title}
                                secondary={secondary}
                            />
                            {!paid && <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="done" onClick={() => payTax(tax)}>
                                    <DoneIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteTax(tax)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                            }

                        </ListItem>
                    })}
                </div>
                : <CircularProgress />
            }
        </List>
    </>
}

export default TaxList