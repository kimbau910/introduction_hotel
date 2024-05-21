import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wapper')}>
            <div className={cx('loader')}>
                <svg viewBox="0 0 80 80">
                    <circle id="test" cx="40" cy="40" r="32"></circle>
                </svg>
            </div>

            <div className={cx('loader', ' triangle')}>
                <svg viewBox="0 0 86 80">
                    <polygon points="43 8 79 72 7 72"></polygon>
                </svg>
            </div>

            <div className={cx('loader')}>
                <svg viewBox="0 0 80 80">
                    <rect x="8" y="8" width="64" height="64"></rect>
                </svg>
            </div>
            <h3>email:Nguyenkimbau2k2@gmail.com</h3>

            <div className={cx('wrapper')}>
                <div className={cx('circle')}></div>
                <div className={cx('circle')}></div>
                <div className={cx('circle')}></div>
                <div className={cx('shadow')}></div>
                <div className={cx('shadow')}></div>
                <div className={cx('shadow')}></div>
            </div>
        </div>
    );
}

export default Footer;
