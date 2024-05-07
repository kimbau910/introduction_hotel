//Layout
import { HeaderOnly } from '~/components/Layout';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Login from '~/pages/Login';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/:nickname', component: Following },
    // { path: '/Login', component: Login },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
