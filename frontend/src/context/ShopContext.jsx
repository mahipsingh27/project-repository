
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency ='₹';
    const deliveryCharge = 10;
    // Default to local backend if env not set to avoid undefined API base
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    // products is an array; start as empty list so map/find work before data loads
    const [products,setProducts] = useState([]);
    const[token,setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const cartData = { ...prev };
            cartData[itemId] = (cartData[itemId] || 0) + 1;
            return cartData;
        });
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add',{itemId},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            const qty = cartItems[itemId];
            if (qty > 0) totalCount += qty;
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,quantity) =>{
        setCartItems((prev) => {
            const cartData = { ...prev };
            cartData[itemId] = Math.max(0, quantity);
            return cartData;
        });
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update',{itemId,quantity}, {headers:{token}})
            } catch (error) {
                 console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () =>{
        // If products haven't loaded correctly yet, treat amount as 0
        if (!Array.isArray(products) || !products.length) return 0;

        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (!itemInfo) continue; // skip if product not found

            const price = Number(itemInfo.price) || 0;
            const qty = cartItems[itemId];
            if (qty > 0) {
                totalAmount += price * qty;
            }
        }
        return totalAmount;
    }

    const getShippingFee = () => {
        // No shipping charge for empty cart
        return getCartAmount() === 0 ? 0 : deliveryCharge;
    }

    const getProductsData = useCallback(async () => {
        try {
            const url = `${backendUrl || ''}/api/product/list`;
            const response = await axios.get(url);

            if (response.data && response.data.success && Array.isArray(response.data.products)) {
                setProducts(response.data.products);
            } else {
                console.error('Unexpected products response:', response.data);
                setProducts([]); // keep app stable even if API shape is wrong
                toast.error(response.data?.message || 'Failed to load products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]); // avoid leaving products as undefined
            toast.error(error.message || 'Error fetching products');
        }
    }, [backendUrl])

    const getUserCart = useCallback(
        async (token) => {
            try {
                const response = await axios.post(
                    backendUrl + '/api/cart/get',
                    {},
                    { headers: { token } }
                );
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        },
        [backendUrl]
    );

    useEffect(()=>{
        getProductsData()
    },[getProductsData])

    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) {
            setToken(storedToken);
            getUserCart(storedToken);
        }
    },[token, setToken,getUserCart])

    const value ={
        products,currency,deliveryCharge,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,setCartItems,
        getCartCount,updateQuantity,
        getCartAmount,getShippingFee,
        navigate,backendUrl,
        setToken,token
    }

    return (
        <ShopContext.Provider value={value}>
        {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;