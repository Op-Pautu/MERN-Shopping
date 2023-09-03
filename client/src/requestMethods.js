import axios from 'axios'

const BASE_URL = "http://localhost:5000/api"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjFiMjQ4N2I2MDQzM2E3MjJmYjUxYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MzcyMTIwMSwiZXhwIjoxNjkzOTgwNDAxfQ.G9yiV_NcREyS-0Bq3dZ93w2n9xNBqveihkfLO2HP5B8"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}`}
})