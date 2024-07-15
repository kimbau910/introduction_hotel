import classNames from 'classnames/bind';
import { useState, useEffect, useCallback } from 'react';
import styles from '../Login/login.module.scss';
import { useNavigate } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutation';
import * as message from '../../components/Message/Message';
import Loading from '~/components/LoadingComponent/Loading';
import images from '~/assets/image/background/bglogin.jpg';
const cx = classNames.bind(styles);

function SignUp() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const mutation = useMutationHooks((data) => UserService.signupUser(data));
    const { data, isLoading, isSuccess, isError } = mutation;
    console.log('1', isLoading);
    const handleNavigateLogin = useCallback(() => {
        navigate('/Login');
    });

    useEffect(() => {
        if (isSuccess && data?.status !== 'ERR') {
            message.success();
            handleNavigateLogin();
        } else if (isError || data?.status === 'ERR') {
            message.error(data?.message || 'Đã có lỗi xảy ra');
        }
    }, [isSuccess, isError, data]);

    const handleOnChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Tên đầy đủ là bắt buộc';
        if (!email) newErrors.email = 'Email là bắt buộc';
        if (!password) newErrors.password = 'Mật khẩu là bắt buộc';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        if (validateInputs()) {
            mutation.mutate({ name, email, password });
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
                        rules="required"
                        value={name}
                        onChange={handleOnChange(setName)}
                    />
                    {errors.name && <span className={cx('form-message', 'error-message')}>{errors.name}</span>}
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
                        rules="required"
                        value={email}
                        onChange={handleOnChange(setEmail)}
                    />
                    {errors.email && <span className={cx('form-message', 'error-message')}>{errors.email}</span>}
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
                        rules="required"
                        value={password}
                        onChange={handleOnChange(setPassword)}
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
                    <div className={cx('box')}>
                        <p onClick={handleNavigateLogin}>Đăng nhập ngay</p>
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
