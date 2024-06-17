import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import Login from './pages/Login';
import { ParallaxProvider } from 'react-scroll-parallax';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function App() {
    // useEffect(() => {
    //     fetchApi();
    // }, []);
    const fetchApi = async () => {
        const res = await axios.get(`http://localhost:3000/api/Detail/get_all`);
        return res.data;
    };
    const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
    console.log('query',query)
    return (
        <ParallaxProvider>
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
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            );
                        })}
                        <Route path="/Login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </ParallaxProvider>
    );
}

export default App;
