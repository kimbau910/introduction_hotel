import classNames from 'classnames/bind';
import styles from './Hotel.module.scss';
import { useEffect, useState } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
// import images from '~/assets/image';
import { WrapperQualityProduct, WrapperInputNumber } from './style';
import ButtonComponent from '~/components/ButtonComponent/ButtonComponent';
import * as DetailService from '../../services/DetailService';
import { useQuery } from '@tanstack/react-query';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '~/components/LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderDetail, resetOrder } from '../../redux/slides/orderSlide';
import * as message from '../../components/Message/Message';
import LikeButtonComponent from '~/components/LikeButtonComponent/LikeButtonComponent';
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
function HotelDetail({ idDetail }) {
    const [numDetail, setNumDetail] = useState(1);
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();
    const location = useLocation();
    const order = useSelector((state) => state.order);
    console.log('order', order);
    const [errorLimitOrder, setErrorLimitOrder] = useState(false);
    const dispatch = useDispatch();
    const { isLoading, data: detailDetails } = useQuery({
        queryKey: ['detail', idDetail],
        queryFn: () => fetchGetDetailsDetail(idDetail),
        enabled: !!idDetail,
    });

    const onChange = (value) => {
        setNumDetail(Number(value));
    };

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
            content: detailDetails?.price,
        },
    ];
    const [selected, setSelected] = useState(null);

    const fetchGetDetailsDetail = async (rowSelected) => {
        // const id = context?.queryKey && context?.queryKey[1]

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
        { id: 1, value: detailDetails?.image1 },
        { id: 2, value: detailDetails?.image2 },
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
    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.detail === detailDetails?._id);

        if (
            orderRedux?.amount + numDetail <= orderRedux?.countInstock ||
            (!orderRedux && detailDetails?.countInStock > 0)
        ) {
            setErrorLimitOrder(false);
        } else if (detailDetails?.countInStock === 0) {
            setErrorLimitOrder(true);
        }
    }, [numDetail]);

    useEffect(() => {
        if (order.isSucessOrder) {
            message.success('Đã thêm');
        }
        return () => {
            dispatch(resetOrder());
        };
    }, [order.isSucessOrder]);

    const handleChangeCount = (type, limited) => {
        if (type === 'increase') {
            if (!limited) {
                setNumDetail(numDetail + 1);
            }
        } else {
            if (!limited) {
                setNumDetail(numDetail - 1);
            }
        }
    };
    const handlePrevious = () => {
        let index = val > 0 ? val - 1 : imgs.length - 1;
        setVal(index);
        setWordData(imgs[index]);
    };
    const handleAddOrderHotel = () => {
        if (!user?.id) {
            navigate('/Login', { state: location?.pathname });
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.detail === detailDetails?._id);
            console.log('orderRedux', orderRedux);
            if (
                orderRedux?.amount + numDetail <= orderRedux?.countInstock ||
                (!orderRedux && detailDetails?.countInStock > 0)
            ) {
                dispatch(
                    addOrderDetail({
                        orderItem: {
                            name: detailDetails?.name,
                            amount: numDetail,
                            image: detailDetails?.image,
                            price: detailDetails?.price,
                            detail: detailDetails?._id,
                            discount: detailDetails?.discount,
                            countInstock: detailDetails?.countInStock,
                        },
                    }),
                );
            } else {
                setErrorLimitOrder(true);
            }
        }
    };

    return (
        <Loading isLoading={isLoading}>
            <div>
            <LikeButtonComponent
                    dataHref="https://developers.facebook.com/docs/plugins/"
                    data-width=""
                    data-layout=""
                    data-action=""
                    data-size=""
                    data-share={true}
                />
                <h1>{detailDetails?.name}</h1>

                <h5>{detailDetails?.description}</h5>

                <div className={cx('main')}>
                    <div className={cx('slider')}>
                        <button className={cx('btns')} onClick={handlePrevious}>
                            {'<'}
                        </button>
                        <img src={wordData.value} height="300" width="500" alt="ảnh" />
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
                                    alt="ảnh"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    {/* <ButtonComponent
                        size={40}
                        styleButton={{
                            background: 'rgb(255, 57, 69)',
                            height: '48px',
                            width: '220px',
                            margin: '30px',
                            border: 'none',
                            borderRadius: '4px',
                        }}
                        onClick={handleAddOrderHotel}
                        textbutton={'Đặt Phòng Ngay'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                    <div
                        style={{
                            margin: '10px 0 20px',
                            padding: '10px 0',
                            borderTop: '1px solid #e5e5e5',
                            borderBottom: '1px solid #e5e5e5',
                        }}
                    >
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQualityProduct>
                            <button
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                onClick={() => handleChangeCount('decrease', numDetail === 1)}
                            >
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber
                                onChange={onChange}
                                defaultValue={1}
                                max={detailDetails?.countInStock}
                                min={1}
                                value={numDetail}
                                size="small"
                            />
                            <button
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                onClick={() => handleChangeCount('increase', numDetail === detailDetails?.countInStock)}
                            >
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>

                    {/* {errorLimitOrder && <div style={{color: 'red'}}>San pham het hang</div>} */}
                </div> 
              

                {datas.map((item, i) => (
                    <div key={i} className={cx('item_accor')}>
                        <div className={cx('overview')}>
                            <div className={cx('title_accor')} onClick={() => toggle(i)}>
                                <h1>{item.h1}</h1>
                                <span>{selected === i ? '-' : '+'}</span>
                            </div>
                            <div
                                className={cx({ 'content_accor show': selected === i, content_accor: selected !== i })}
                            >
                                <div className={cx('content_card')}>
                                    {selected === i && (
                                        <Container>
                                            <Row>
                                                {item === datas[1] ? (
                                                    <>
                                                        {item.content.split('| ').map((item1, index) => {
                                                            const IconComponent = icons[index % icons.length];
                                                            return (
                                                                <Col key={index} sm={6}>
                                                                    <ul className={cx('list-unstyled')}>
                                                                        <li
                                                                            className={cx(
                                                                                'd-flex',
                                                                                'align-items-center',
                                                                            )}
                                                                        >
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
                                                        {item.content.split('| ').map((item1, index) => (
                                                            <p key={index}>{item1.trim()}</p>
                                                        ))}
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
           
        </Loading>
    );
}

export default HotelDetail;
