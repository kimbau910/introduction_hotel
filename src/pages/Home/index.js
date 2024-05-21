import React, { useEffect } from 'react';
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

const cards = [
    {
        id: 1,
        name: 'The Oriental Jade Hotel',
        map: '94 P. Hàng Trống, Hàng Trống, Hoàn Kiếm, Hà Nội',
        bed: 'Phòng đôi, Phòng gia đình,Phòng 2 giường ',
        service: 'Hồ bơi ngoài trời,Nhà hàng,Quầy bar...',
        star: 'Khách sạn 5 sao',
        src: images.card1,
    },
    {
        id: 2,
        name: 'Cozy Fun Homestay 16',
        map: '16 Phố Báo Khánh, Hoan Kiem, Hanoi, Vietnam',
        bed: 'Phòng đôi, Phòng gia đình,Phòng 2 giường ',
        service: 'Dịch vụ phòng,Phòng gia đình,Giặt ủi...',
        star: 'Khách sạn 3 sao',
        src: images.card2,
    },
    {
        id: 3,
        name: 'Classic Street Hotel',
        map: ' 41 Hang Be Street, Hoan Kiem, Hanoi, Vietnam',
        bed: 'Phòng đôi, Phòng 2 giường , Phòng gia đình ',
        service: 'Đưa đón sân bay,Bữa sáng tuyệt vời,Spa,Quầy lễ tân 24 giờ...',
        star: 'Khách sạn 3 sao',
        src: images.card3,
    },
    {
        id: 4,
        name: 'Hanoi Marvellous Hotel & Spa',
        map: ' 55 Dương Thành, Hoàn Kiếm, Hà Nội, Việt Nam',
        bed: 'Phòng đôi, Phòng gia đình,Phòng 2 giường  ',
        service: 'Đưa đón sân bay,Nhà hàng,Spa...',
        star: 'Khách sạn 4 sao',
        src: images.card4,
    },
    {
        id: 5,
        name: 'Eliana Premio Hotel Hanoi',
        map: ' 108 Phố Hàng Bông, Hoan Kiem, Hanoi, Vietnam ',
        bed: 'Phòng đôi, Phòng gia đình,Phòng 2 giường ',
        service: 'Nhà hàng,Đưa đón sân bay,Máy pha trà/cà phê trong tất cả các phòng...',
        star: 'Khách sạn 5 sao',
        src: images.card5,
    },
];

const cx = classNames.bind(styles);
function Home() {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);
    return (
        <div>
            <ParallaxBanner style={{ aspectRatio: '2 / 1' }}>
                <ParallaxBannerLayer expanded={false} speed={-10} scale={[1, 1.2]} opacity={[0.9, 1]}>
                    <div className={cx('banner_slider')}>
                        <Carousel data-bs-theme="dark">
                            <Carousel.Item>
                                <img className="d-block w-100" src={images.slider1} alt="First slide" />
                                <Carousel.Caption>
                                    <h5>The Oriental Jade Hotel</h5>
                                    <p>92 - 94 Hang Trong, Hoan Kiem, Quận Hoàn Kiếm, Hà Nội, Việt Nam.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src={images.slider2} alt="Second slide" />
                                <Carousel.Caption>
                                    <h5>Hanoi Marvellous Hotel & Spa</h5>
                                    <p>55 Duong Thanh Street, Quận Hoàn Kiếm, Hà Nội, Việt Nam.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src={images.slider2} alt="Third slide" />
                                <Carousel.Caption>
                                    <h5>Classic Street Hotel</h5>
                                    <p>41 Hang Be Street, Quận Hoàn Kiếm, Hà Nội, Việt Nam.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
            <div>
                <h1>Địa điểm nổi bật</h1>
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
                                    <a className={cx('action')} href="#">
                                        Xem chi tiết
                                        <span aria-hidden="true">→</span>
                                    </a>
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
