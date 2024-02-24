export const authenticate = (data) => {
    if (typeof window !== 'undefined' && data && data.token && data.user) {
        sessionStorage.setItem('token', JSON.stringify(data.token));
        sessionStorage.setItem('user', JSON.stringify(data.user));
        return true; // Indicate successful authentication
    }
    return false; // Indicate authentication failure
};

// remove token from session storage
export const logout = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
};

export const getToken = () => {
    if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            return JSON.parse(sessionStorage.getItem('token'));
        } else {
            return false;
        }
    } else {
        return false; // Return false if window is undefined
    }
};

