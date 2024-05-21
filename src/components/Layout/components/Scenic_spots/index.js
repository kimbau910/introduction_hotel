import classNames from 'classnames/bind';
import styles from './scenic_spots.module.scss';
import images from '~/assets/image';

const data = [
    {
        image: images.tc1,
        name: 'Phố cổ',
    },
    {
        image: images.tc2,
        name: 'Lăng Chủ Tịch Hồ Chí Minh',
    },
    {
        image: images.tc3,
        name: 'Hồ Hoàn Kiếm',
    },
    {
        image: images.tc4,
        name: 'Nhà Thờ Lớn',
    },
    {
        image: images.tc5,
        name: 'Hỏa Lò',
    },
    {
        image: images.tc6,
        name: 'Văn Miếu Quốc Tử Giám',
    },
];
const cx = classNames.bind(styles);
function Scenic_spots() {
    return (
        <div className={cx('scenic')}>
            <h1>Khách sạn gần thắng cảnh</h1>
            <div className={cx('box')}>
                <span className={cx('boxo')} data-aos="fade-right">
                    <div className={cx('card')}>
                        <div className={cx('card-img')}>
                            <img src={images.tc1} />
                        </div>
                        <div className={cx('card-info')}>
                            <h3 className={cx('text-title')}>Phố Cổ</h3>
                            <button className={cx('card-button')}>Tìm Hiểu Thêm</button>
                        </div>
                    </div>
                </span>
                <span className={cx('boxo')} data-aos="fade-down">
                    <div className={cx('card')}>
                        <div className={cx('card-img')}>
                            <img src={images.tc2} />
                        </div>
                        <div className={cx('card-info')}>
                            <h3 className={cx('text-title')}>Lăng Chủ Tịch Hồ Chí Minh</h3>
                            <button className={cx('card-button')}>Tìm Hiểu Thêm</button>
                        </div>
                    </div>
                </span>
                <span className={cx('boxo')} data-aos="fade-left">
                    <div className={cx('card')}>
                        <div className={cx('card-img')}>
                            <img src={images.tc3} />
                        </div>
                        <div className={cx('card-info')}>
                            <h3 className={cx('text-title')}>Hồ Hoàn Kiếm</h3>
                            <button className={cx('card-button')}>Tìm Hiểu Thêm</button>
                        </div>
                    </div>
                </span>
            </div>

            <div className={cx('box')}>
                <div className={cx('boxo')} data-aos="fade-right">
                    <div className={cx('card')}>
                        <div className={cx('card-img')}>
                            <img src={images.tc4} />
                        </div>
                        <div className={cx('card-info')}>
                            <h3 className={cx('text-title')}>Nhà Thờ Lớn</h3>
                            <button className={cx('card-button')}>Tìm Hiểu Thêm</button>
                        </div>
                    </div>
                </div>
                <span className={cx('boxo')} data-aos="fade-up">
                    <div className={cx('card')}>
                        <div className={cx('card-img')}>
                            <img src={images.tc5} />
                        </div>
                        <div className={cx('card-info')}>
                            <h3 className={cx('text-title')}>Hỏa Lò</h3>
                            <button className={cx('card-button')}>Tìm Hiểu Thêm</button>
                        </div>
                    </div>
                </span>
                <div className={cx('boxo')} data-aos="fade-left">
                    <div className={cx('card')}>
                        <div className={cx('card-img')}>
                            <img src={images.tc6} />
                        </div>
                        <div className={cx('card-info')}>
                            <h3 className={cx('text-title')}>Văn Miếu Quốc Tử Giám</h3>
                            <button className={cx('card-button')}>Tìm Hiểu Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Scenic_spots;
