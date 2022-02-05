import {ANALYTICS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth.tsx";
import Analytics from "./pages/Analytics.tsx";


export const publicRoutes = [
    {path: ANALYTICS_ROUTE,
        Component: Analytics
    },
    {path: LOGIN_ROUTE,
        Component: Auth
    },
    {path: REGISTRATION_ROUTE,
        Component: Auth
    }
]