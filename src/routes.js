import {INFO_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth.tsx";
import Info from "./pages/Info.tsx";


export const publicRoutes = [
    {path: INFO_ROUTE,
        Component: Info
    },
    {path: LOGIN_ROUTE,
        Component: Auth
    },
    {path: REGISTRATION_ROUTE,
        Component: Auth
    }
]