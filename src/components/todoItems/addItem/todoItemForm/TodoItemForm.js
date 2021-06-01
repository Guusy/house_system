import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default () => {
    return <>
        <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Cantidad"
            type="text"
            fullWidth
        />
    </>
}