import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/image';
import Aos from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faSnowflake, faStar, faBed } from '@fortawesome/free-solid-svg-icons';
import Accordion from '~/components/Layout/components/Accordion';
import Scenic_spots from '~/components/Layout/components/Scenic_spots';
import TravelExp from '~/components/Layout/components/TravelExp';
import * as DetailService from '~/services/DetailService';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDebounce } from '~/hooks/useDebounce';
import { useSelector } from 'react-redux';

const cards = [
    {
        id: 1,
        name: 'The Oriental Jade Hotel',
        map: '94 P. Hàng Trống, Hàng Trống, Hoàn Kiếm, Hà Nội',
        bed: 'Phòng đôi, Phòng gia đình,Phòng 2 giường ',
        service: 'Hồ bơi ngoài trời,Nhà hàng,Quầy bar...',
        star: 'Khách sạn 5 sao',
        src: images.card1,
        ids: '6683f9e2c897fbcf7dfb7e84',
    },
    {
        id: 2,
        name: 'Cozy Fun Homestay 16',
        map: '16 Phố Báo Khánh, Hoan Kiem, Hanoi, Vietnam',
        bed: 'Phòng đôi, Phòng gia đình,Phòng 2 giường ',
        service: 'Dịch vụ phòng,Phòng gia đình,Giặt ủi...',
        star: 'Khách sạn 3 sao',
        src: images.card2,
        ids: '6684ad0d43ff31735829869b',
    },
    {
        id: 3,
        name: 'Classic Street Hotel',
        map: ' 41 Hang Be Street, Hoan Kiem, Hanoi, Vietnam',
        bed: 'Phòng đôi, Phòng 2 giường , ...',
        service: 'Đưa đón sân bay,Bữa sáng tuyệt vời,Spa,Quầy lễ tân 24 giờ...',
        star: 'Khách sạn 3 sao',
        src: images.card3,
        ids: '6683b5a4035fb843bb424269',
    },
    {
        id: 4,
        name: 'Hanoi Marvellous Hotel & Spa',
        map: ' 55 Dương Thành, Hoàn Kiếm, Hà Nội, Việt Nam',
        bed: 'Phòng đôi, Phòng gia đình,Phòng 2 giường  ',
        service: 'Đưa đón sân bay,Nhà hàng,Spa...',
        star: 'Khách sạn 4 sao',
        src: images.card4,
        ids: '667e98e7f1d0a1ef391ade7c',
    },
    {
        id: 5,
        name: 'Eliana Premio Hotel Hanoi',
        map: ' 108 Phố Hàng Bông, Hoan Kiem, Hanoi, Vietnam ',
        bed: 'Phòng đôi, Phòng gia đình...',
        service: 'Nhà hàng,Đưa đón sân bay,Máy pha trà/cà phê trong tất cả các phòng...',
        star: 'Khách sạn 5 sao',
        src: images.card5,
        ids: '666f02dd46570221fd7ec52b',
    },
];

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    // const handleDetail = () => {
    //     navigate('/sign-in');
    // };
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);
    const searchDetail = useSelector((state) => state?.detail?.search);
    const searchDebounce = useDebounce(searchDetail, 500);
    const user = useSelector((state) => state.user)
    const [limit, setLimit] = useState(6);
    const [typeDetails, setTypeDetails] = useState([]);

    const fetchHotelAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const res = await DetailService.getAlldetail(search, limit);

        return res;
    };
    const fetchAllTypeHotel = async () => {
        const res = await DetailService.getAllTypeDetail();

        // if(res?.status === 'OK') {
        setTypeDetails(res?.data);
        // }
    };
    
    const { data: details, isPreviousData } = useQuery({
        queryKey: ['details'],
        limit,
        searchDebounce,
        queryFn: fetchHotelAll,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });

    useEffect(() => {
        fetchAllTypeHotel();
    }, []);
    const handleLg =() =>{
        if(!user?.id) {
            navigate('/Login', {state: location?.pathname})
        }else {
    
           
        }
    }

    return (
        <div>
              
            <div>
                <div className={cx('h1vsLoad')}>
                    <h1>Địa điểm nổi bật</h1>
                    <div className={cx("loading-wave")}>
                        <div  className={cx("loading-bar")}></div>
                        <div className={cx("loading-bar")}></div>
                        <div  className={cx("loading-bar")}></div>
                        <div className={cx("loading-bar")}></div>
                    </div>
                </div>

                <h4>Gợi ý một số khách sạn cho những du khách lần đầu đến Hà Nội</h4>
              
    
                <div className={cx('container')} data-aos="fade-left">
                    {cards.map((cardd) => (
                        <div className={cx('item')}>
                            <div className={cx('card')}>
                                <div className={cx('image')}>
                                    <img src={cardd.src} alt="Card Image" />
                                </div>

                                <div className={cx('content')}>
                                    <p className={cx('title')}>{cardd.name}</p>
                                    <div className={cx('style_icon')}>
                                        <FontAwesomeIcon icon={faMap} />
                                        <p>{cardd.map}</p>
                                    </div>

                                    <div className={cx('style_icon')}>
                                        <FontAwesomeIcon icon={faBed} />
                                        <p>{cardd.bed}</p>
                                    </div>
                                    <div className={cx('style_icon')}>
                                        <FontAwesomeIcon icon={faSnowflake} />
                                        <p>{cardd.service}</p>
                                    </div>
                                    <div className={cx('style_icon')}>
                                        <FontAwesomeIcon icon={faStar} />
                                        <p>{cardd.star}</p>
                                    </div>
                                  <div onClick={handleLg}>
                                    <Link to={`/detail/${cardd.ids}`}>
                                        <a className={cx('action')} >
                                            Xem chi tiết
                                            <span aria-hidden="true">→</span>
                                        </a>
                                    </Link></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <Scenic_spots />
            <Accordion />
            <TravelExp />
        </div>
    );
}

export default Home;
