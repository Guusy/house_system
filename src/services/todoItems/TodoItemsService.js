import axios from "axios"

class TodoItemsService {

    getAll() {
        return axios.get('/api/todo-items')
    }
    
}

export default new TodoItemsService()