import axios from "axios"

class TaxService {

    getAll() {
        return axios.get('/api/todo-items/tax')
    }


    addTax(tax) {
        return axios.post('/api/todo-items/tax', tax)
    }
}

export default new TaxService()
