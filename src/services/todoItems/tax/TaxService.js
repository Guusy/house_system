import axios from "axios"

class TaxService {

    getAll() {
        return axios.get('/api/todo-items/tax')
    }

    getById(id) {
        return axios.get(`/api/todo-items/tax/${id}`)
    }

    addTax(tax) {
        return axios.post('/api/todo-items/tax', tax)
    }

    pay(taxId) {
        return axios.put(`/api/todo-items/tax/${taxId}/pay`)
    }

    delete(taxId) {
        return axios.delete(`/api/todo-items/tax/${taxId}`)
    }
}

export default new TaxService()
