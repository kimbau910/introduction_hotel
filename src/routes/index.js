import Home from '~/pages/Home';
import Following from '~/pages/Following';
import AdminPage from '~/pages/AdminPage/AdminPage';
import ProductDetail from '~/pages/ProductDetail';
import DetailPage from '~/pages/DetailPage/DetailPage';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/:nickname', component: Following },
    { path: '/detail/:id', component: DetailPage },
    { path:'/admin',component:AdminPage },
];

{/* <Route path= '/admin'element={<AdminPage/>}/> */}
const privateRoutes = [];

export { publicRoutes, privateRoutes };
