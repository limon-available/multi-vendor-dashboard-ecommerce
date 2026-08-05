 import { privateRoutes } from './privateRoutes';
import MainLayout from './../../layout/MainLayout';
import ProtectRoute from './ProtectRoute';

export const getRoutes = () => {
    return {
        path : '/',
        element : <MainLayout />,
        children : privateRoutes.map((route) => ({
            ...route,
            element: <ProtectRoute route={route}>{route.element}</ProtectRoute>
        }))
    }
}
