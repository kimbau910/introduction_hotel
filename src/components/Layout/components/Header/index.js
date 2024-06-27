// import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/image';
import { useState, useEffect } from 'react';
import {Popover } from 'antd'
// import Tippy from '@tippyjs/react/headless';
// import HeadlessTippy from '@tippyjs/react/headless';
import Button from '~/components/Button';
// import { Wrapper as PoperWraper } from '~/components/Poper';
// import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Poper/Menu';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faCircleQuestion, faUser, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
// import { type } from '@testing-library/user-event/dist/type';
import Search from '../Search';
// import Login from '~/pages/Login';
import { WrapperContentPopup} from './style'
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '~/services/UserService';
import { resetUser } from '~/redux/slides/userSlide';
import {useNavigate } from 'react-router-dom';
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

function Header() {
    const user = useSelector((state) => state.user)
    const [userName, setUserName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'ngonngu':
                break;
            default:
        }
    };

    const handleLogout = async () => {
        
        await UserService.logoutUser()
        dispatch(resetUser())
      }

      useEffect(() => {
        setUserName(user?.name)
      }, [user?.name])
    
      const content = (
        <div>
          <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
          {user?.isAdmin && (
    
            <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
          )}
          <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
        </div>
      );

      const handleClickNavigate = (type) => {
        if(type === 'profile') {
          navigate('/profile-user')
        }else if(type === 'admin') {
          navigate('/system/admin')
        }else {
          handleLogout()
        }
        setIsOpenPopup(false)
      }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={'/'} className={cx('logo')}>
                    <img src={images.logo} alt="tiktok"></img>
                </Link>
                <Search />

                <div className={cx('actions')}>
                    {/* <Button leftIcon={<FontAwesomeIcon icon={faCircleQuestion} />}>Trợ giúp</Button>
                    <Button leftIcon={<FontAwesomeIcon icon={faEarthAsia} />}>Tiếng Việt</Button> */}
                    {user?.name ?(
                        <>
                        <Popover  content={content} trigger="click" open={isOpenPopup}>
                          <Button primary style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</Button>
                        </Popover>
                      </>
                        
                    ):( <Link to={'/Login'}>
                        <Button primary leftIcon={<FontAwesomeIcon icon={faUser} />}>
                            Đăng nhập 
                        </Button>
                       
                    </Link>)}
                   
                    <Menu items={Menu_ITEMS}>
                        {/* <Menu items={Menu_ITEMS} onChange={handleMenuChange} /> */}
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
