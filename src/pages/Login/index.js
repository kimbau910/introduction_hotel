import classNames from 'classnames/bind';
import styles from './login.module.scss';
import images from '~/assets/image';
const cx = classNames.bind(styles);

function Login() {
    return (
        <div
            className={cx('wrapper')}
            style={{ backgroundImage: `url(${images.login1})`, backgroundSize: 'cover', backgroundPosition: 'center', height:'700px' }}
        >
            <div className={cx('card-switch')}> 
                <label className={cx('switch')}>
                    <input type="checkbox" className={cx('toggle')} />
                    <span className={cx('slider')}></span>
                    <span className={cx('card-side')}></span>
                    <div className={cx('flip-card__inner')}>
                        <div className={cx('flip-card__front')}>
                            <div className={cx('title')}>Đăng Nhập</div>
                            <form className={cx('flip-card__form')} action="">
                                <input
                                    className={cx('flip-card__input')}
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                />
                                <input
                                    className={cx('flip-card__input')}
                                    name="password"
                                    placeholder="Mật Khẩu"
                                    type="password"
                                />
                                <button className={cx('flip-card__btn')}>Đăng Nhập!</button>
                            </form>
                        </div>
                        <div className={cx('flip-card__back')}>
                            <div className={cx('title')}>Đăng kí</div>
                            <form className={cx('flip-card__form')} action="">
                                <input className={cx('flip-card__input')} placeholder="Tên Đăng Nhập" type="text" />
                                <input
                                    className={cx('flip-card__input')}
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                />
                                <input
                                    className={cx('flip-card__input')}
                                    name="password"
                                    placeholder="Mật Khẩu"
                                    type="password"
                                />
                                <button className={cx('flip-card__btn')}>Xác Nhận!</button>
                            </form>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
}

export default Login;
