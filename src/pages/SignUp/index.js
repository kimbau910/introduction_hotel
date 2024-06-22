import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from '../Login/login.module.scss';
import { useNavigate } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutation';
import * as message from '../../components/Message/Message';
const cx = classNames.bind(styles);
function SignUp() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const mutation = useMutationHooks((data) => UserService.signupUser(data));
    const { data, isSuccess, isError } = mutation;
    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleNavigateLogin();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handleNavigateLogin = () => {
        navigate('/Login');
    };
    const handleOnchangeName = (e) => {
        setName(e.target.value);
    };
    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        mutation.mutate({ name, email, password });
    };
    return (
        <div className={cx('main')}>
            <form action="" method="POST" className={cx('form')} id="register-form">
                <h3 className={cx('heading')}>Đăng Kí</h3>
                <div className={cx('spacer')}></div>
                <div className={cx('form-group')}>
                    <label htmlFor="fullname" className={cx('form-label')}>
                        Tên đầy đủ
                    </label>
                    <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="VD: KimBau"
                        className={cx('form-control')}
                        value={name}
                        onChange={handleOnchangeName}
                    />
                    <span className={cx('form-message')}></span>
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="email" className={cx('form-label')}>
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="VD: kimbau@gmail.com"
                        className={cx('form-control')}
                        value={email}
                        onChange={handleOnchangeEmail}
                    />
                    <span className={cx('form-message')}></span>
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="password" className={cx('form-label')}>
                        Mật khẩu
                    </label>
                    <input
                        id="password"
                        name="password"
                        placeholder="Nhập mật khẩu"
                        className={cx('form-control')}
                        type={isShowPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handleOnchangePassword}
                    />
                    <span
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        style={{
                            zIndex: 10,
                            position: 'relative',
                            top: '-30px',
                            left: '280px',
                            height: '5px',
                            width: '10px',
                        }}
                    >
                        {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                    </span>
                    <span className={cx('form-message')}></span>
                </div>

                <div className={cx('form-group')}>
                    <div className={cx('box')}>
                        <a onClick={handleNavigateLogin}>Đăng nhập ngay</a>
                    </div>
                </div>
                {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                <button className={cx('form-submit')} onClick={handleSignUp}>
                    Đăng ký
                </button>
            </form>
        </div>
    );
}

export default SignUp;
