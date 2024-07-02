import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import images from '~/assets/image';

import * as DetailService from '../../services/DetailService';
import { useQuery } from '@tanstack/react-query';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    FaSwimmingPool,
    FaWifi,
    FaShuttleVan,
    FaDumbbell,
    FaSpa,
    FaSmokingBan,
    FaConciergeBell,
    FaCocktail,
    FaUser,
    FaAdjust,
} from 'react-icons/fa';
const cx = classNames.bind(styles);
const icons = [
    FaSwimmingPool,
    FaWifi,
    FaShuttleVan,
    FaDumbbell,
    FaAdjust,
    FaSpa,
    FaSmokingBan,
    FaUser,
    FaCocktail,
    FaConciergeBell,
];
function ProductDetail({ idDetail }) {
    const { data: detailDetails } = useQuery({
        queryKey: ['detail', idDetail],
        queryFn: () => fetchGetDetailsDetail(idDetail),
        enabled: !!idDetail,
    });

    const datas = [
        {
            h1: 'Tổng quan',
            content: detailDetails?.overview,
        },
        {
            h1: 'Các tiện nghi được ưa chuộng nhất',
            content: detailDetails?.convenient,
        },
        {
            h1: 'Giá Phòng',
            content: 'ôkdáokdóakdóakd',
        },
    ];
    const [selected, setSelected] = useState(null);

    const fetchGetDetailsDetail = async (rowSelected) => {
        // const id = context?.queryKey && context?.queryKey[1]
        // console.log('id',id)
        // if(id) {
        const res = await DetailService.getDetailsDetail(rowSelected);
        return res.data;
        // }
    };

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    };
    const imgs = [
        { id: 0, value: detailDetails?.image },
        { id: 1, value: detailDetails?.image },
        { id: 2, value: detailDetails?.image },
    ];

    const [wordData, setWordData] = useState(imgs[0]);
    const [val, setVal] = useState(0);

    const handleClick = (index) => {
        setVal(index);
        setWordData(imgs[index]);
    };

    const handleNext = () => {
        let index = val < imgs.length - 1 ? val + 1 : 0;
        setVal(index);
        setWordData(imgs[index]);
    };

    const handlePrevious = () => {
        let index = val > 0 ? val - 1 : imgs.length - 1;
        setVal(index);
        setWordData(imgs[index]);
    };
    console.log('name', detailDetails?.name);
    return (
        <div>
            <h1>{detailDetails?.name}</h1>

            <h5>{detailDetails?.description}</h5>

            <div className={cx('main')}>
                <div className={cx('slider')}>
                    <button className={cx('btns')} onClick={handlePrevious}>
                        {'<'}
                    </button>
                    <img src={wordData.value} height="300" width="500" />
                    <button className={cx('btns')} onClick={handleNext}>
                        {'>'}
                    </button>
                </div>
                <div className={cx('flex_row')}>
                    {imgs.map((data, i) => (
                        <div className={cx('thumbnail')} key={i}>
                            <img
                                className={cx({ clicked: wordData.id === i })}
                                src={data.value}
                                onClick={() => handleClick(i)}
                                height="70"
                                width="100"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {datas.map((item, i) => (
                <div key={i} className={cx('item_accor')}>
                    <div className={cx('overview')}>
                        <div className={cx('title_accor')} onClick={() => toggle(i)}>
                            <h1>{item.h1}</h1>
                            <span>{selected === i ? '-' : '+'}</span>
                        </div>
                        <div className={cx({ 'content_accor show': selected === i, content_accor: selected !== i })}>
                            <div className={cx('content_card')}>
                                {selected === i && (
                                    <Container>
                                        <Row>
                                            {item === datas[1] ? (
                                                <>
                                                    {item.content.split(', ').map((item1, index) => {
                                                        const IconComponent = icons[index % icons.length];
                                                        return (
                                                            <Col key={index} sm={6}>
                                                                <ul className={cx('list-unstyled')}>
                                                                    <li className={cx('d-flex', 'align-items-center')}>
                                                                        <IconComponent className={cx('me-2')} />
                                                                        {item1.trim()}
                                                                    </li>
                                                                </ul>
                                                            </Col>
                                                        );
                                                    })}
                                                </>
                                            ) : (
                                                <Col>
                                                    <p>{item.content}</p>
                                                </Col>
                                            )}
                                        </Row>
                                    </Container>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductDetail;
