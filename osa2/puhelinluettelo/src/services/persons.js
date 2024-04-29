import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response =>response.data)

}

const add = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response =>response.data)
}

const remove = personToBeRemoved => {
    return axios.delete(`${baseUrl}/${personToBeRemoved.id}`)}

 

export default {
    getAll: getAll,
    add: add,
    remove, remove
}