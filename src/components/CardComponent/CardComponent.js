import classNames from 'classnames/bind';
import styles from './style.module.scss';
import Link from 'antd/es/typography/Link';
const cx = classNames.bind(styles);

function CardComponent() {
    return (
        <div className={cx('')} >
           
            <div className={cx('item')}>
                <div className={cx('card')}>
                    <div className={cx('image')}>
                        <img  alt="Card Image" />
                    </div>

                    <div className={cx('content')}>
                        <p className={cx('title')}>{}</p>

                        <Link to={`/detail/`}>
                            <a className={cx('action')}>
                                Xem chi tiết
                                <span aria-hidden="true">→</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardComponent;
