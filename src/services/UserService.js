import axios from "axios"

export const loginUser = async (data) => {
    const res = await axios.post(`http://localhost:3000/api/user/sign_in`, data)
    return res.data
}