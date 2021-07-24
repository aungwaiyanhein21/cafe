import axios from 'axios';

const getCartQuantity = async () => {
    // will need to contact the server
    const url = `${process.env.REACT_APP_SERVER_URL}/cart?search=quantity`;
    
    let quantity;
    try {
        const info = await axios.get(url, { withCredentials: true, credentials: 'include'});
        console.log(info);
        if ("isAuthenticated" in info.data && !info.data.isAuthenticated) {
            quantity = 0;
        }
        else {
            quantity = info.data.totalNum;
        }
    }
    catch(err) {
        console.log(err.response);
    }
   
    return quantity;
};

export default getCartQuantity;