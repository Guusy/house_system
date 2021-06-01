import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useState } from 'react';
import TaxService from '../../../../services/todoItems/tax/TaxService';


export default ({ finishFlow }) => {
    const [tax, setTax] = useState({
        title: '',
        description: '',
        category: '',
        payment_method: '',
        estimated_date_pay: null,
        amount: 0
    })

    const addTax = async () => {
        try {
            await TaxService.addTax(tax)
            finishFlow()
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeProperty = ({ target: { id, value, name } }) => {
        console.log(id, value, name);
        const identifier = !!id ? id : name
        setTax({ ...tax, [identifier]: value })
    }

    const handleDateChange = (newDate) => {
        setTax({ ...tax, estimated_date_pay: newDate })
    };

    return <>
        <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Titulo"
            type="text"
            fullWidth
            value={tax.title}
            onChange={onChangeProperty}
        />
        <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Descripción"
            type="text"
            fullWidth
            value={tax.description}
            onChange={onChangeProperty}

        />
        <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Categoria"
            type="text"
            fullWidth
            value={tax.category}
            onChange={onChangeProperty}

        />
        <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Monto"
            type="number"
            fullWidth
            value={tax.amount}
            onChange={onChangeProperty}

        />
        <div style={{ display: 'flex', marginTop: '1em', marginBottom: '1em' }}>
            <div>
                <FormLabel component="legend">Metodo de pago</FormLabel>
                <RadioGroup aria-label="payment_method" name="payment_method" value={tax.payment_method} onChange={onChangeProperty}>
                    <FormControlLabel value="cash" control={<Radio />} label="Efectivo" />
                    <FormControlLabel value="virtual" control={<Radio />} label="Virtual" />
                    <FormControlLabel value="automatic_debit" control={<Radio />} label="Debito automatico" />
                </RadioGroup>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="estimated_date_pay"
                    label="Día estimado de pago"
                    value={tax.estimated_date_pay}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </div>

        <Button variant="contained" color="primary" onClick={addTax}>Agregar</Button>

    </>
}

// title VARCHAR (50) NOT NULL,
// 	description VARCHAR ( 55),
// 	category VARCHAR ( 50 ) NOT NULL,
//     amount INT,
//     payment_method VARCHAR ( 50 ) NOT NULL,
//     estimated_date_pay DATE NOT NULL,
//     paid DATE