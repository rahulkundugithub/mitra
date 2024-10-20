import { createBrowserRouter } from 'react-router-dom'
import HomeLayout from '../layout/homelayout/HomeLayout';
import Home from './homePageProvider/Home';
const router = createBrowserRouter (
    [
        {
            element : <HomeLayout/>,
            children : [
                {
                    path : '/',
                    element : <Home/>
                },
            ]
        }
    ]
);
export default router