import axios from 'axios'

const baseUrl="http://localhost:4000/product"

export const getProducts=async()=>{
    const getResponse = await axios.get(baseUrl)
    return getResponse.data
}

export const getProductByIdA=async(id)=>{
    const getResponse = await axios.get(`${baseUrl}/${id}`)
    return getResponse.data
}

export const postProductA=async(newProduct)=>{
    const getResponse = await axios.post(baseUrl,newProduct)
    return getResponse.data
}

export const putProductA=async(id,newProduct)=>{
    const getResponse = await axios.put(`${baseUrl}/${id}`,newProduct)
    return getResponse.data
}

export const deleteProductA=async(id)=>{
    const getResponse = await axios.delete(`${baseUrl}/${id}`)
    return getResponse.data
}