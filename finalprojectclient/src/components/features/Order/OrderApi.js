import axios from 'axios'

const baseUrl="http://localhost:4000/order"

export const getOrders=async()=>{
    const getResponse = await axios.get(baseUrl)
    return getResponse.data
}

export const getOrderByIdA=async(id)=>{
    const getResponse = await axios.get(`${baseUrl}/${id}`)
    return getResponse.data
}

export const postOrderA=async(newOrder)=>{
    const getResponse = await axios.post(baseUrl,newOrder)
    return getResponse.data
}

export const deleteOrderA=async(id)=>{
    const getResponse = await axios.delete(`${baseUrl}/${id}`)
    return getResponse.data
}