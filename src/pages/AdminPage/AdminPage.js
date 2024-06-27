import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Header from '~/components/Layout/components/Header';
import AdminUser from '~/components/AdminUser/AdminUser';
import AdminDetail from '~/components/AdminDetail/AdminDetail';

import * as DetailService from '~/services/DetailService';
import * as UserService from '~/services/UserService';

import CustomizedContent from './components/CustomizedContent';
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

const AdminPage = () => {
    const user = useSelector((state) => state?.user);

    const items = [
        getItem('Người dùng', 'users', <UserOutlined />),
        getItem('Sản phẩm', 'details', <AppstoreOutlined />),
    ];

    const [keySelected, setKeySelected] = useState('');
    const getAllDetails = async () => {
        const res = await DetailService.getAlldetail();
        console.log('res1', res);
        return { data: res?.data, key: 'details' };
    };

    const getAllUsers = async () => {
        const res = await UserService.getAllUser(user?.access_token);
        console.log('res', res);
        return { data: res?.data, key: 'users' };
    };

    const queries = useQueries({
        queries: [
            { queryKey: ['details'], queryFn: getAllDetails, staleTime: 1000 * 60 },
            { queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60 },
        ],
    });
    const memoCount = useMemo(() => {
        const result = {};
        try {
            if (queries) {
                queries.forEach((query) => {
                    result[query?.data?.key] = query?.data?.data?.length;
                });
            }
            return result;
        } catch (error) {
            return result;
        }
    }, [queries]);
    const COLORS = {
        users: ['#e66465', '#9198e5'],
        details: ['#a8c0ff', '#3f2b96'],
    };

    const renderPage = (key) => {
        switch (key) {
            case 'users':
                return <AdminUser />;
            case 'details':
                return <AdminDetail />;
            default:
                return <></>;
        }
    };

    const handleOnCLick = ({ key }) => {
        setKeySelected(key);
    };
    console.log('memoCount', memoCount);
    return (
        <>
            <div isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex', overflowX: 'hidden' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh',
                    }}
                    items={items}
                    onClick={handleOnCLick}
                />
                <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
                   
                        {!keySelected && (
                            <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
                        )}
                    
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    );
};

export default AdminPage;
