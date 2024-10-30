import React from "react";

import {
    Route,
    Redirect
} from "react-router-dom/cjs/react-router-dom.min";

import {
    jwtDecode
} from "jwt-decode";

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // Optionally, validate the token with some decoding or check its expiry

    if (!token) {
        return false; // No token means user is not authenticated
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Time in seconds

        // Check if the token is expired
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token'); // Optionally remove the expired token
            return false;
        }

        return true; // Token is valid
    } catch (error) {
        // If there's an error in decoding, assume the token is invalid
        return false;
    }
}

const ProtectedRoute = ({
    component: Component,
    ...rest
}) => ( <
    Route {
        ...rest
    }
    render = {
        (props) =>
        isAuthenticated() ? ( <
            Component {
                ...props
            }
            />
        ) : ( <
            Redirect to = "/" / >
        )
    }
    />
)

export default ProtectedRoute;