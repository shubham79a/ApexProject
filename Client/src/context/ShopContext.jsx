import React, { createContext, useEffect, useState } from "react"
import { products } from "../assets/assets"
import { toast } from "react-toastify";
import { menCategory } from "../assets/assets";
import { womenCategory } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState('')
    
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size")
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

    }
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                }
                catch (error) {
                    console.error();
                }

            }
        }
        return totalCount
    }
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = Number(quantity);
        setCartItems(cartData)
    }


    const value = {
        products,
        menCategory,
        womenCategory,
        currency,
        delivery_fee,
        search,
        setSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity

    }
    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;