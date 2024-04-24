import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/image';
import Tippy from '@tippyjs/react/headless';
import HeadlessTippy from '@tippyjs/react/headless';
import Button from '~/components/Button';
import { Wrapper as PoperWraper } from '~/components/Poper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Poper/Menu';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faCircleQuestion, faUser, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { type } from '@testing-library/user-event/dist/type';
import Search from '../Search';

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
    // {
    //     icon: <FontAwesomeIcon icon={faKeyboard} />,
    //     title: 'Keyboard shortcuts',
    // },
];

function Header() {
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'ngonngu':
                // Handle change language
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="tiktok">
                    </img>
                </div>
                <Search />

                <div className={cx('actions')}>
                    {/* <Button leftIcon={<FontAwesomeIcon icon={faCircleQuestion} />}>Trợ giúp</Button>
                    <Button leftIcon={<FontAwesomeIcon icon={faEarthAsia} />}>Tiếng Việt</Button> */}

                    <Button primary leftIcon={<FontAwesomeIcon icon={faUser} />}>
                        Đăng nhập
                    </Button>
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
