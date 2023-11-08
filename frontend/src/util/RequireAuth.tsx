import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { useEffect } from "react";

export default function RequireAuth({ children }: { children: any }) {
    const auth = useAuth() as any;
    const location = useLocation();
    const navigate = useNavigate();

    // if (!auth.user) {
    //     console.log('==*', location.pathname);
    //     // <Navigate to="/login" state={{ path: location.pathname }} />
    //     // navigate('/login', { state: { path: location.pathname } })
    // }

    useEffect(() => {
        if (!auth.user) {
            console.log('==*', location.pathname);
            // <Navigate to="/login" state={{ path: location.pathname }} />
            navigate('/login', { state: { path: location.pathname } })
        }
    }, []);
    return children;
}