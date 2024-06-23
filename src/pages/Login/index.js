import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './login.module.scss';
import images from '~/assets/image';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutation';
import { useLocation, useNavigate } from 'react-router-dom';
import * as message from '../../components/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import { jwtDecode } from 'jwt-decode';

const cx = classNames.bind(styles);

function Login() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user);

    const mutation = useMutationHooks((data) => UserService.loginUser(data));
    const { data, isSuccess } = mutation;
    useEffect(() => {
        if (isSuccess) {
            if (location?.state) {
                navigate(location?.state);
            } else {
                navigate('/');
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                console.log('deco',decoded)
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token);
                }
            }
        }
    }, [isSuccess]);

    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storage)
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token,refreshToken }))
      }
    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnchangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleNavigateSignUp = () => {
        navigate('/signUp');
    };
    const handleSignIn = (event) => {
        event.preventDefault();

        mutation.mutate({
            email,
            password,
        });
    };
    
    return (
        <div className={cx('main')}>
            <form action="" method="POST" className={cx('form')} id="register-form">
                <h3 className={cx('heading')}>Đăng Nhập</h3>
                <div className={cx('spacer')}></div>
                <div className={cx('form-group')}>
                    <label htmlFor="fullname" className={cx('form-label')}>
                        Tên đầy đủ
                    </label>
                    <input
                        id="fullname"
                        name="fullname"
                        rules="required"
                        type="text"
                        placeholder="Nhập Tài Khoản"
                        className={cx('form-control')}
                        value={email}
                        onChange={handleOnchangeEmail}
                    />
                    <span className={cx('form-message')}></span>
                </div>
                <div className={cx('form-group')}>
                    <label className={cx('form-label')}>Mật khẩu</label>

                    <input
                        id="password"
                        name="password"
                        className={cx('form-control')}
                        placeholder="password"
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
                    <div className={cx('box_login')}>
                        <a onClick={handleNavigateSignUp}>Đăng kí</a>
                        <div className={cx('space')}></div>
                    </div>
                </div>
                {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                <button className={cx('form-submit')} onClick={handleSignIn}>
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}

export default Login;
