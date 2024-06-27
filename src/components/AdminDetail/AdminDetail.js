import { Button, Form, Select, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import { WrapperHeader, WrapperUploadFile } from './style';
import TableComponent from '../TableComponent/TableComponent';
import { useState } from 'react';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64, renderOptions } from '../../utils';
import * as DetailService from '../../services/DetailService';
import { useMutationHooks } from '../../hooks/useMutation';
import { useEffect } from 'react';
import * as message from '../../components/Message/Message';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const user = useSelector((state) => state?.user);
    const searchInput = useRef(null);
    const inittial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        newType: '',
        discount: '',
    });
    const [stateDetail, setStateDetail] = useState(inittial());
    const [stateDetailDetails, setStateDetailDetails] = useState(inittial());

    const [form] = Form.useForm();

    const mutation = useMutationHooks((data) => {
        const { name, price, description, rating, image, type, countInStock, discount } = data;
        const res = DetailService.createDetail({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock,
            discount,
        });
        return res;
    });
    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = DetailService.updateDetail(id, token, { ...rests });
        return res;
    });

    const mutationDeleted = useMutationHooks((data) => {
        const { id, token } = data;
        const res = DetailService.deleteDetail(id, token);
        return res;
    });

    const mutationDeletedMany = useMutationHooks((data) => {
        const { token, ...ids } = data;
        const res = DetailService.deleteManyDetail(ids, token);
        return res;
    });

    const getAllDetails = async () => {
        const res = await DetailService.getAlldetail();
        return res;
    };

    const fetchGetDetailsDetail = async (rowSelected) => {
        const res = await DetailService.getDetailsDetail(rowSelected);
        if (res?.data) {
            setStateDetailDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
                discount: res?.data?.discount,
            });
        }
    };

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateDetailDetails);
        } else {
            form.setFieldsValue(inittial());
        }
    }, [form, stateDetailDetails, isModalOpen]);

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetDetailsDetail(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const handleDetailsDetail = () => {
        setIsOpenDrawer(true);
    };

    const handleDelteManyDetails = (ids) => {
        mutationDeletedMany.mutate(
            { ids: ids, token: user?.access_token },
            {
                onSettled: () => {
                    queryDetail.refetch();
                },
            },
        );
    };

    const fetchAllTypeDetail = async () => {
        const res = await DetailService.getAllTypeDetail();
        return res;
    };

    const { data, isSuccess, isError } = mutation;
    const {
        data: dataUpdated,

        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;
    const {
        data: dataDeleted,

        isSuccess: isSuccessDelected,
        isError: isErrorDeleted,
    } = mutationDeleted;
    const {
        data: dataDeletedMany,

        isSuccess: isSuccessDelectedMany,
        isError: isErrorDeletedMany,
    } = mutationDeletedMany;

    const queryDetail = useQuery({ queryKey: ['Details'], queryFn: getAllDetails });
    const typeDetail = useQuery({ queryKey: ['type-Detail'], queryFn: fetchAllTypeDetail });
    const { data: Details } = queryDetail;
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined
                    style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }}
                    onClick={() => setIsModalOpenDelete(true)}
                />
                <EditOutlined
                    style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }}
                    onClick={handleDetailsDetail}
                />
            </div>
        );
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{
        //     //     backgroundColor: '#ffc069',
        //     //     padding: 0,
        //     //   }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50;
                }
                return record.price <= 50;
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.rating) >= 3;
                }
                return Number(record.rating) <= 3;
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable =
        Details?.data?.length &&
        Details?.data?.map((Detail) => {
            return { ...Detail, key: Detail._id };
        });

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
            message.success();
        } else if (isErrorDeletedMany) {
            message.error();
        }
    }, [isSuccessDelectedMany]);

    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success();
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error();
        }
    }, [isSuccessDelected]);

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateDetailDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
        });
        form.resetFields();
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated]);

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handleDeleteDetail = () => {
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryDetail.refetch();
                },
            },
        );
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateDetail({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            discount: '',
        });
        form.resetFields();
    };

    const onFinish = () => {
        const params = {
            name: stateDetail.name,
            price: stateDetail.price,
            description: stateDetail.description,
            rating: stateDetail.rating,
            image: stateDetail.image,
            type: stateDetail.type === 'add_type' ? stateDetail.newType : stateDetail.type,
            countInStock: stateDetail.countInStock,
            discount: stateDetail.discount,
        };
        mutation.mutate(params, {
            onSettled: () => {
                queryDetail.refetch();
            },
        });
    };

    const handleOnchange = (e) => {
        setStateDetail({
            ...stateDetail,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnchangeDetails = (e) => {
        setStateDetailDetails({
            ...stateDetailDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDetail({
            ...stateDetail,
            image: file.preview,
        });
    };

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateDetailDetails({
            ...stateDetailDetails,
            image: file.preview,
        });
    };
    const onUpdateDetail = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateDetailDetails },
            {
                onSettled: () => {
                    queryDetail.refetch();
                },
            },
        );
    };

    const handleChangeSelect = (value) => {
        setStateDetail({
            ...stateDetail,
            type: value,
        });
    };

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button
                    style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    handleDelteMany={handleDelteManyDetails}
                    columns={columns}
                    data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            },
                        };
                    }}
                />
            </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <InputComponent value={stateDetail['name']} onChange={handleOnchange} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                        <Select
                            name="type"
                            // defaultValue="lucy"
                            // style={{ width: 120 }}
                            value={stateDetail.type}
                            onChange={handleChangeSelect}
                            options={renderOptions(typeDetail?.data?.data)}
                        />
                    </Form.Item>
                    {stateDetail.type === 'add_type' && (
                        <Form.Item
                            label="New type"
                            name="newType"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateDetail.newType} onChange={handleOnchange} name="newType" />
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Count inStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your count inStock!' }]}
                    >
                        <InputComponent
                            value={stateDetail.countInStock}
                            onChange={handleOnchange}
                            name="countInStock"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your count price!' }]}
                    >
                        <InputComponent value={stateDetail.price} onChange={handleOnchange} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your count description!' }]}
                    >
                        <InputComponent value={stateDetail.description} onChange={handleOnchange} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input your count rating!' }]}
                    >
                        <InputComponent value={stateDetail.rating} onChange={handleOnchange} name="rating" />
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: 'Please input your discount of Detail!' }]}
                    >
                        <InputComponent value={stateDetail.discount} onChange={handleOnchange} name="discount" />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your count image!' }]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button>Select File</Button>
                            {stateDetail?.image && (
                                <img
                                    src={stateDetail?.image}
                                    style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px',
                                    }}
                                    alt="avatar"
                                />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </ModalComponent>
            <DrawerComponent
                title="Chi tiết sản phẩm"
                isOpen={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                width="90%"
            >
                <Form
                    name="basic"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 22 }}
                    onFinish={onUpdateDetail}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <InputComponent
                            value={stateDetailDetails['name']}
                            onChange={handleOnchangeDetails}
                            name="name"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                        <InputComponent
                            value={stateDetailDetails['type']}
                            onChange={handleOnchangeDetails}
                            name="type"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Count inStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your count inStock!' }]}
                    >
                        <InputComponent
                            value={stateDetailDetails.countInStock}
                            onChange={handleOnchangeDetails}
                            name="countInStock"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your count price!' }]}
                    >
                        <InputComponent
                            value={stateDetailDetails.price}
                            onChange={handleOnchangeDetails}
                            name="price"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your count description!' }]}
                    >
                        <InputComponent
                            value={stateDetailDetails.description}
                            onChange={handleOnchangeDetails}
                            name="description"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input your count rating!' }]}
                    >
                        <InputComponent
                            value={stateDetailDetails.rating}
                            onChange={handleOnchangeDetails}
                            name="rating"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: 'Please input your discount of Detail!' }]}
                    >
                        <InputComponent
                            value={stateDetailDetails.discount}
                            onChange={handleOnchangeDetails}
                            name="discount"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your count image!' }]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button>Select File</Button>
                            {stateDetailDetails?.image && (
                                <img
                                    src={stateDetailDetails?.image}
                                    style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px',
                                    }}
                                    alt="avatar"
                                />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>
            <ModalComponent
                title="Xóa sản phẩm"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteDetail}
            >
                <div>Bạn có chắc xóa sản phẩm này không?</div>
            </ModalComponent>
        </div>
    );
};

export default AdminDetail;
