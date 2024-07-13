import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/image';
import { Badge, Popover } from 'antd';
import Button from '~/components/Button';
import Menu from '~/components/Poper/Menu';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faCircleQuestion, faUser, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';
import { WrapperContentPopup, WrapperHeaderAccout, WrapperTextHeaderSmall } from './style';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '~/services/UserService';
import { resetUser } from '~/redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const Menu_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Tiếng Việt',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    type: 'ngonngu',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'ngonngu',
                    code: 'en',
                    title: 'English',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Trợ Giúp',
        to: '/feedback',
    },
];

function Header({ isHiddenCart = false }) {
    const user = useSelector((state) => state.user);
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userAvatar, setUserAvatar] = useState('');
    const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
    const [isUserNamePopupOpen, setIsUserNamePopupOpen] = useState(false);
    const order = useSelector((state) => state.order);

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'ngonngu':
                break;
            default:
        }
    };

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleLogout = async () => {
        await UserService.logoutUser();
        dispatch(resetUser());
    };

    useEffect(() => {
        setUserName(user?.name);
        setUserAvatar(user?.avatar);
    }, [user?.name, user?.avatar]);

    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>
                Thông tin người dùng
            </WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    const handleClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile-user');
        } else if (type === 'admin') {
            navigate('/admin');
        } else {
            handleLogout();
        }
        setIsAvatarPopupOpen(false);
        setIsUserNamePopupOpen(false);
    };
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    const handleSearchIconClick = () => {
        setIsSearchClicked(!isSearchClicked); // Đảo ngược trạng thái khi click vào icon search
    };

    return (
        <div className={cx('main', { 'main-search-clicked': isSearchClicked })}>
            <div className={cx('search-but')}>
                <Search />
            </div>

            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Link to={'/'} className={cx('logo')}>
                        <img src={images.logo} alt="tiktok"></img>
                    </Link>
                    <div className={cx('search-but1')}>
                        <Search />
                    </div>
                    <button className={cx('search-btn')} onClick={handleSearchIconClick}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    {/* {!isHiddenCart && (
                            <div onClick={() => navigate('/order')} style={{ cursor: 'pointer', margin:'15px' }}>
                                <Badge count={order?.orderItems?.length} size="small">
                                    <ShoppingCartOutlined style={{ fontSize: '30px', color: '#000' }} />
                                </Badge>
                                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                            </div>
                         )}  */}
                    <Popover
                        content={content}
                        trigger="click"
                        open={isAvatarPopupOpen}
                        onOpenChange={(visible) => setIsAvatarPopupOpen(visible)}
                    >
                        {userAvatar ? (
                            <img className={cx('imguser')} src={userAvatar} alt="avatar" />
                        ) : (
                            <UserOutlined style={{ fontSize: '30px', display: 'none' }} />
                        )}
                    </Popover>
                    <div className={cx('actions')}>
                        {user?.access_token ? (
                            <Popover
                                content={content}
                                trigger="click"
                                open={isUserNamePopupOpen}
                                onOpenChange={(visible) => setIsUserNamePopupOpen(visible)}
                            >
                                <Button className={cx('nameUser')}>{userName?.length ? userName : user?.email}</Button>
                            </Popover>
                        ) : (
                            <Link to={'/Login'}>
                                <Button primary leftIcon={<FontAwesomeIcon icon={faUser} />}>
                                    Đăng nhập
                                </Button>
                            </Link>
                        )}

                        <Menu items={Menu_ITEMS}>
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </Menu>
                      
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
