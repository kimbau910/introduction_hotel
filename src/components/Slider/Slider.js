import Carousel from 'react-bootstrap/Carousel';
import styles from './Slider.model.scss'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';

import images from '~/assets/image';
function Slider() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx("slider")}>
       
                <div className={cx('banner_slider')}>
                    <Carousel data-bs-theme="dark" style={{ height: 'auto' }}>
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
         
        </div>
    );
}

export default Slider;
