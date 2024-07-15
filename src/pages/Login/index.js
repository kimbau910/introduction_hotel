import classNames from 'classnames/bind';
import { useState, useEffect, useCallback } from 'react';
import styles from './login.module.scss';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutation';
import { useLocation, useNavigate } from 'react-router-dom';
import * as message from '../../components/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/components/LoadingComponent/Loading';
import { updateUser } from '../../redux/slides/userSlide';
import { jwtDecode } from 'jwt-decode';
import images from '~/assets/image/background/bglogin.jpg';
import { Button } from 'antd';
const cx = classNames.bind(styles);

function Login() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user);

    const mutation = useMutationHooks((data) => UserService.loginUser(data));
    const { data, isLoading, isSuccess, isError } = mutation;

    const handleGetDetailsUser = useCallback(
        async (id, token) => {
            const storage = localStorage.getItem('refresh_token');
            const refreshToken = JSON.parse(storage);
            const res = await UserService.getDetailsUser(id, token);
            dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
        },
        [dispatch],
    );

    useEffect(() => {
        if (isSuccess && data?.status !== 'ERR') {
            if (location?.state) {
                navigate(location.state);
            } else {
                navigate('/');
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
            if (data?.access_token) {
                const decoded = jwtDecode(data.access_token);
                if (decoded?.id) {
                    handleGetDetailsUser(decoded.id, data.access_token);
                }
            }
        } else if (isError || data?.status === 'ERR') {
            message.error(data?.message || 'Đã có lỗi xảy ra');
        }
    }, [isSuccess, isError, data, location, navigate, handleGetDetailsUser]);

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleNavigateSignUp = () => {
        navigate('/signUp');
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email là bắt buộc';
        if (!password) newErrors.password = 'Mật khẩu là bắt buộc';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignIn = (event) => {
        event.preventDefault();
        if (validateInputs()) {
            mutation.mutate({ email, password });
        }
    };
    const divStyle = {
        backgroundImage: `url(${images})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className={cx('main')} style={divStyle}>
            <form action="" method="POST" className={cx('form')} id="register-form">
                <h3 className={cx('heading')}>Đăng Nhập</h3>
                <div className={cx('spacer')}></div>
                <div className={cx('form-group')}>
                    <label htmlFor="email" className={cx('form-label')}>
                        Tên đầy đủ
                    </label>
                    <input
                        id="email"
                        name="email"
                        rules="required"
                        type="text"
                        placeholder="Nhập Tài Khoản"
                        className={cx('form-control')}
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                    {errors.email && <span className={cx('form-message', 'error-message')}>{errors.email}</span>}
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-label')}>Mật khẩu</label>
                    <input
                        id="password"
                        name="password"
                        className={cx('form-control')}
                        placeholder="Nhập mật khẩu"
                        type={isShowPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handleOnChangePassword}
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
                    {errors.password && <span className={cx('form-message', 'error-message')}>{errors.password}</span>}
                </div>
                <div className={cx('form-group')}>
                    <div className={cx('box_login')}>
                        <button
                            onClick={handleNavigateSignUp}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                color: 'blue',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                        >
                            Đăng kí
                        </button>

                        <div className={cx('space')}></div>
                    </div>
                    {/* <button onClick={() => navigate('/')}>Trang chủ</button> */}
                </div>
                {data?.status === 'ERR' && <span className={cx('error-message')}>{data?.message}</span>}
                <button className={cx('form-submit')} onClick={handleSignIn}>
                    Đăng nhập
                </button>{' '}
            </form>
        </div>
    );
}

export default Login;
