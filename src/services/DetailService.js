import axios from 'axios';
import { axiosJWT } from './UserService';

export const getAlldetail = async (search, limit) => {
    let res = {};
    if (search?.length > 0) {
        res = await axios.get(`http://localhost:3001/api/detail/get_all?filter=name&filter=${search}&limit=${limit}`);
    } else {
        res = await axios.get(`http://localhost:3001/api/detail/get_all?limit=${limit}`);
    }
    return res.data;
};

export const getDetailType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(
            `http://localhost:3001/api/detail/get_all?filter=type&filter=${type}&limit=${limit}&page=${page}`,
        );
        return res.data;
    }
};

export const createDetail = async (data) => {
    const res = await axios.post(`http://localhost:3001/api/detail/create`, data);
    return res.data;
};

export const getDetailsDetail = async (id) => {
    const res = await axios.get(`http://localhost:3001/api/detail/get_details/${id}`);
    return res.data;
};

export const updateDetail = async (id, access_token, data) => {
    const res = await axiosJWT.put(`http://localhost:3001/api/detail/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteDetail = async (id, access_token) => {
    const res = await axiosJWT.delete(`http://localhost:3001/api/detail/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const deleteManyDetail = async (data, access_token) => {
    const res = await axiosJWT.post(`http://localhost:3001/api/detail/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const getAllTypeDetail = async () => {
    const res = await axios.get(`http://localhost:3001/api/detail/get-all-type`);
    return res.data;
};
