import axios from 'axios';

const checkAuth = async () => {
    // will need to contact the server
    const url = `${process.env.REACT_APP_SERVER_URL}/check-auth`;
    
    const info = await axios.get(url, { withCredentials: true, credentials: 'include'});
    const isAuthenticated = info.data.isAuthenticated;
    
    return isAuthenticated;
};

export default checkAuth;