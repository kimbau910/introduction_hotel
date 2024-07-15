import Home from '~/pages/Home';
import Following from '~/pages/Following';
import AdminPage from '~/pages/AdminPage/AdminPage';
import HotelDetail from '~/pages/HotelDetail';
import DetailPage from '~/pages/DetailPage/DetailPage';
import TypeDetailPage from '~/pages/TypeDetailPage/TypeDetailPage';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/:nickname', component: Following },
    { path: '/detail/:id', component: DetailPage },
    { path: '/admin', component: AdminPage },
    { path: '/detailType/:type', component: TypeDetailPage },
];

{
    /* <Route path= '/admin'element={<AdminPage/>}/> */
}
const privateRoutes = [];

export { publicRoutes, privateRoutes };
