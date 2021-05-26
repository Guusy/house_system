import axios from "axios"

class ProductsService {

    getAll() {
        return axios.get('/api/shopping/items')
    }

    addProduct(product) {
        return axios.post('/api/shopping/items', product)
    }

    addUnit(product) {
        const newProduct = { ...product }
        newProduct.quantity = Number.parseInt(product.quantity, 10) + 1
        return axios.put('/api/shopping/items', newProduct)
    }
}

export default new ProductsService()