import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/helpers';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const getProfile = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/me`, config);
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            // Handle error here
            setLoading(true);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <Fragment>
            {loading ? (
                <p>Loading user profile...</p>
            ) : (
                <div>
                    <h2>User Profile</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {/* Add other user profile fields here */}
                </div>
            )}
        </Fragment>
    );
};

export default Profile;
