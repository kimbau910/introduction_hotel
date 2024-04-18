import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '~/assets/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div>
        

            <div className={cx('gallery js-flickity')} data-flickity-options='{ "wrapAround": true }'>
                <div className={cx('gallery-cell')}></div>
                <div className={cx('gallery-cell')}></div>
                <div className={cx('gallery-cell')}></div>
                <div className={cx('gallery-cell')}></div>
                <div className={cx('gallery-cell')}></div>
            </div>
        </div>
    );
}

export default Home;
