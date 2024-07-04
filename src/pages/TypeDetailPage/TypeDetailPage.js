import CardComponent from '~/components/CardComponent/CardComponent';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { useLocation } from 'react-router-dom';
import * as DetailService from '~/services/DetailService';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDebounce } from '~/hooks/useDebounce';
import { Col, Pagination, Row } from 'antd';
const cx = classNames.bind(styles);
function TypeDetailPage() {
    const searchDetail = useSelector((state) => state?.detail?.search);
    console.log('Search detail:', searchDetail);
    const searchDebounce = useDebounce(searchDetail, 500);
    const { state } = useLocation();

    const [details, setDetails] = useState([]);
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    });
    const fetchDetailType = async (type, page, limit) => {
        const res = await DetailService.getDetailType(type, page, limit);

        setDetails(res?.data);
        setPanigate({ ...panigate, total: res?.totalPage });
    };
    useEffect(() => {
        if (state) {
            fetchDetailType(state, panigate.page, panigate.limit);
        }
    }, [state, panigate.page, panigate.limit]);
    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize });
    };
    return (
        <div>
            <h2 className={cx('styleH2')}> Khách sạn gần: {state} </h2>
            <div className={cx('container')}>
                {details.map((data) => {
                    return (
                        <CardComponent
                            key={data._id}
                            description={data.description}
                            image={data.image}
                            name={data.name}
                            rating={data.rating}
                            type={data.type}
                            id={data._id}
                        />
                    );
                })}
            </div>
            <Pagination
                defaultCurrent={panigate.page + 1}
                total={panigate?.total}
                onChange={onChange}
                style={{ textAlign: 'center', marginTop: '10px',marginBottom:'20px' }}
            />
        </div>
    );
}

export default TypeDetailPage;
