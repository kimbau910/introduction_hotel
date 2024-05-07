import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
const cards = [
    {
        id: 1,
        name: 'The Oriental Jade Hotel',
        introduce:
            'Nằm tại vị trí thuận tiện ở trung tâm Hà Nội, The Oriental Jade Hotel cung cấp các phòng có điều hòa, hồ bơi ngoài trời, Wi-Fi miễn phí và trung tâm thể dục.  Khách sạn 5 sao này có dịch vụ phòng và quầy lễ tân 24 giờ. Khách có thể sử dụng quầy bar.',
        src: images.card1,
    },
    {
        id: 2,
        name: 'Cozy Fun Homestay 16',
        introduce:
            'Nằm tại vị trí thuận tiện ở trung tâm Hà Nội, The Oriental Jade Hotel cung cấp các phòng có điều hòa, hồ bơi ngoài trời, Wi-Fi miễn phí và trung tâm thể dục. Khách sạn 5 sao này có dịch vụ phòng và quầy lễ tân 24 giờ. Khách có thể sử dụng quầy bar.',
        src: images.card2,
    },
    {
        id: 3,
        name: 'Classic Street Hotel',
        introduce:
            'Classic Street Hotel tọa lạc trên Phố cổ Hàng Bè ở thành phố Hà Nội, nằm trong bán kính 5 phút đi bộ từ Hồ Hoàn Kiếm, Đền Ngọc Sơn và Nhà hát Múa rối Nước Thăng Long. Khách sạn có lối trang trí kiểu Việt Nam truyền thống, Wi-Fi miễn phí và nhà hàng trong khuôn viên phục vụ các món ăn Việt Nam.',
        src: images.card3,
    },
    {
        id: 4,
        name: 'Hanoi Marvellous Hotel & Spa',
        introduce:
            'Nằm cách chợ Hàng Da và trung tâm mua sắm Gallery tại khu Phố Cổ của thành phố Hà Nội 5 phút tản bộ, "Hanoi Marvellous Hotel & Spa" cung cấp chỗ nghỉ với nội thất bằng gỗ bóng và đèn chùm trang nhã. Khách sạn có nhà hàng trong khuôn viên và Wi-Fi miễn phí trong tất cả các khu vực. Du khách có thể tận hưởng các liệu pháp và dịch vụ spa tại trung tâm spa của khách sạn.',
        src: images.card4,
    },
    {
        id: 5,
        name: 'Eliana Premio Hotel Hanoi',
        introduce:
            'Nằm tại vị trí thuận tiện ở Hà Nội, Eliana Premio Hotel Hanoi cung cấp các phòng có điều hòa, sân hiên, Wi-Fi miễn phí và nhà hàng. Khách sạn 4 sao này có quầy lễ tân 24 giờ và bàn bán tour. Một số phòng tại chỗ nghỉ có ban công với view thành phố.',
        src: images.card5,
    },
];
const cx = classNames.bind(styles);
function Home() {
    return (
        <div>
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
            <h1>Địa điểm nổi bật</h1>
            <h4>Gợi ý một số khách sạn cho những du khách lần đầu đến Hà Nội</h4>
            <div>
                <div className={cx('container')}>
                    {cards.map((cardd) => (
                        <div className={cx('item')}>
                            <div className={cx('card')}>
                                <img src={cardd.src} alt="Card Image" />
                                <div className={cx('card__content')}>
                                    <p className={cx('card__title')}>{cardd.name}</p>
                                    <p className={cx('card__description')}>{cardd.introduce}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
