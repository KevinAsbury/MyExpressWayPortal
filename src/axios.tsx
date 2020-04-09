import axios from 'axios'

const production = axios.create({
    baseURL: 'https://myexpressway.herokuapp.com/'
})

const development = axios.create({
    baseURL: 'http://localhost:5000/'
})

export default development