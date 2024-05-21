// Layout
import { HeaderOnly } from '~/components/Layout';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Login from '~/pages/Login';
// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send({ path: '/', component: Home });
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/:nickname', component: Following },
    // { path: '/Login', component: Login },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
