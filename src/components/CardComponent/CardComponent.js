import classNames from 'classnames/bind';
import styles from './style.module.scss';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function CardComponent(props) {
    const { description, image, name, rating, type, id } = props;
    const navigate = useNavigate();
    const handleDetails = (id) => {
        navigate(`/detail/${id}`);
    };
    return (
        <div className={cx('')}>
            <div className={cx('item')}>
                <div className={cx('card')}>
                    <div className={cx('image')}>
                        <img alt="Card Image" src={image} />
                    </div>

                    <div className={cx('content')}>
                        <p className={cx('title')}>{name}</p>

                        <a className={cx('action')}  onClick={() =>  handleDetails(id)}>
                            Xem chi tiết
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardComponent;
