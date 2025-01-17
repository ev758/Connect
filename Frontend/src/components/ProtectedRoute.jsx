import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../jwt_tokens.js";
import django_api from "../django_api.js";

function ProtectedRoute({ children }) {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        authorization().catch(() => setAuthorized(false))
    }, []);

    //refreshes access token
    const tokenRefresh = async () => {
        //gets refresh token from local storage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            //sends POST request for new access token
            const response = await django_api.post("token/refresh/", {
                refresh: refreshToken,
            });

            if (response.status === 200) {
                //sets new access token
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setAuthorized(true);
            }
            else {
                setAuthorized(false);
            }
        }
        catch (error) {
            console.error(error);
            setAuthorized(false);
        }
    };

    //sets authorization
    const authorization = async () => {
        //gets access token from local storage
        const accessToken = localStorage.getItem(ACCESS_TOKEN);

        //if access token is null, authorized is set to false
        if (!accessToken) {
            setAuthorized(false);
            return;
        }

        //decodes access token
        const accessTokenDecoded = jwtDecode(accessToken);

        //gets expiration date
        const accessTokenExpiration = accessTokenDecoded.exp;

        //gets date in seconds
        const date = Date.now() / 1000;

        //if access token expired, refresh the token
        if (accessTokenExpiration < date) {
            await tokenRefresh();
        }
        else {
            //if access token is not expired, set authorized to true
            setAuthorized(true);
        }
    };

    if (authorized === null) {
        return <div></div>;
    }

    return authorized ? children : <Navigate to="/login"/>;
}

export default ProtectedRoute;