import { Fragment } from 'react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slides/userSlide';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService';
import { isJsonString } from './utils';
import ProfilePage from './pages/Profile/ProfilePage';
import AdminPage from './pages/AdminPage/AdminPage';

import Loading from './components/LoadingComponent/Loading';
import Chatbot from './components/Chatbot/Chatbot';
import Slider from './components/Slider/Slider';

function App() {
   
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        setIsLoading(true);
        const { storageData, decoded } = handleDecoded();
        if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, storageData);
        }
        setIsLoading(false);
    }, []);

    const handleDecoded = () => {
        let storageData = user?.access_token || localStorage.getItem('access_token');
        let decoded = {};
        if (storageData && isJsonString(storageData) && !user?.access_token) {
            storageData = JSON.parse(storageData);
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData };
    };

    UserService.axiosJWT.interceptors.request.use(
        async (config) => {
           
            const currentTime = new Date();
            const { decoded } = handleDecoded();
            let storageRefreshToken = localStorage.getItem('refresh_token');
            const refreshToken = JSON.parse(storageRefreshToken);
            const decodedRefreshToken = jwtDecode(refreshToken);
            if (decoded?.exp < currentTime.getTime() / 1000) {
                if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
                    const data = await UserService.refreshToken(refreshToken);
                    config.headers['token'] = `Bearer ${data?.access_token}`;
                } else {
                  
                }
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );

    const handleGetDetailsUser = async (id, token) => {
        let storageRefreshToken = localStorage.getItem('refresh_token');
        const refreshToken = JSON.parse(storageRefreshToken);
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken }));
    };

    return (
        <ParallaxProvider>
            <Loading isLoading={isLoading}>
                <Router>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;

                                let Layout = DefaultLayout;

                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                const isHomePage = route.path === '/';
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout slider={isHomePage ? <Slider /> : null}>
                                                <Page />
                                            </Layout>
                                        }
                                    ></Route>
                                );
                            })}
                            <Route path="/Login" element={<Login />} />
                            <Route path="/signUp" element={<SignUp />} />
                            <Route path="/profile-user" element={<ProfilePage />} />
                        </Routes>
                        <Chatbot />
                    </div>
                </Router>
            </Loading>
        </ParallaxProvider>
    );
}

export default App;
