import axios from 'axios';

export const loginUser = async (data) => {
    const res = await axios.post(`http://localhost:3001/api/user/sign_in`, data);
    return res.data;
};

export const signupUser = async (data) => {
    const res = await axios.post(`http://localhost:3001/api/user/sign_up`, data);
    return res.data;
};
export const getDetailsUser = async (id) => {
    const res = await axios.get(`http://localhost:3001/api/user/get-details/${id}`);

    return res.data;
};

//     , {
//     // headers: {
//     //     token: `Bearer ${access_token}`,
//     // }
// },)
