import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            {/* <img
                className={cx('avatar')}
                src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474014bom/anh-gai-xinh-cute-de-thuong-hot-girl-2.jpg"
                alt="Hoaa"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('usename')}>nguyenvana</span>
            </div> */}
            <div className={cx('card')}>
                <div
                    className={cx('img')}
                    
                ><img src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474014bom/anh-gai-xinh-cute-de-thuong-hot-girl-2.jpg" alt="Hoaa" width="50px" height="50"></img></div>
                <div className={cx('textBox')}>
                    <div className={cx('textContent')}>
                        <p className={cx('h1')}>Clans of Clash</p>
                        <span className={cx('span')}><a href=''>Chi tiết    </a></span>
                    </div>
                    <p className={cx('p')}>Xhattmahs is not attacking your base!</p>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default AccountItem;
