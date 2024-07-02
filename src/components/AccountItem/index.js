import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/detail/${data._id}`} className={cx('wrapper')}>
           
            <div className={cx('card')}>
                <div className={cx('img')}>
                    <img src={data.image} alt="Hoaa" width="50px" height="50"></img>
                </div>
                <div className={cx('textBox')}>
                    <div className={cx('textContent')}>
                        <p className={cx('h1')}>{data.name}</p>
                        <span className={cx('span')}>
                            <a href="">chi tiet </a>
                        </span>
                    </div>
                    <p className={cx('p')}>{data.nickname}</p>
                    <div></div>
                </div>
            </div>
        </Link>
    );
}

export default AccountItem;
