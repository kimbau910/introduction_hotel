import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PoperWraper } from '~/components/Poper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AccountItem from '~/components/AccountItem';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { searchDetail as searchDetailAction } from '~/redux/slides/detailSlide';
import { useDebounce } from '~/hooks/useDebounce';
import * as DetailService from '~/services/DetailService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Loading from '~/components/LoadingComponent/Loading';

const cx = classNames.bind(styles);

function Search() {
    const searchTerm = useSelector((state) => state?.detail?.search);
    const searchDebounce = useDebounce(searchTerm, 500);
    const [limit, setLimit] = useState(6);
    const [isLoading, setIsLoading] = useState(false); // State để theo dõi trạng thái loading
    const { id } = useParams();

    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);

    const inputRef = useRef();

    const handleHideResult = () => {
        setShowResult(false);
    };

    const onSearch = async (e) => {
        setSearchValue(e.target.value);
        dispatch(searchDetailAction(e.target.value));
        if (e.target.value.trim()) {
            setShowResult(true);
            setIsLoading(true); 
        } else {
            setShowResult(false);
            setIsLoading(false); 
        }

        try {
            const res = await DetailService.getAlldetail(searchDebounce, limit);
           
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); 
        }
    };

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const res = await DetailService.getAlldetail(search, limit);
        return res;
    };

    const { data: details, isPreviousData } = useQuery({
        queryKey: ['details', limit, searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });

    return (
        <HeadlessTippy
            interactive
            visible={showResult && details?.data?.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PoperWraper>
                        <h4 className={cx('search-title')}>Khách sạn</h4>
                        {details?.data?.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PoperWraper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('text_search')}>
                <div className={cx('search')}>
                    <input
                        className={cx('input')}
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm khách sạn"
                        spellCheck={false}
                        onChange={onSearch}
                        onFocus={() => {
                            if (searchValue.trim()) {
                                setShowResult(true);
                            }
                        }}
                    />
                    {!!searchValue && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setSearchValue('');
                                inputRef.current.focus();
                                setShowResult(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <Loading isLoading={isLoading}>
                    {/* Component Loading để hiển thị khi isLoading true */}
                </Loading>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
