import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const backendUrl = "http://localhost:4000";
  const [token, setToken] = useState("");
 

 const addToCart = async (itemId, size) => {
  if (!size) {
    toast.error("Please select size");
    return;
  }

  // ✅ Clone safely
  let cartData = JSON.parse(JSON.stringify(cartItems));

  if (cartData[itemId]) {
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
  } else {
    cartData[itemId] = { [size]: 1 };
  }

  // ✅ Update UI immediately
  setCartItems(cartData);

  // ✅ Sync with backend
  if (token) {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size, quantity: cartData[itemId][size] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update cart");
    }
  }
};

 

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
  try {
    
    let cartData = JSON.parse(JSON.stringify(cartItems));

    if (quantity <= 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

   
    setCartItems(cartData);
    if (token) {
      await axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, size, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to update cart");
  }
};


  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);

      if (!product) continue;

      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];

        if (quantity > 0) {
          totalAmount += product.basePrice * quantity;
        }
      }
    }

    return totalAmount;
  };

  useEffect(() => {}, [cartItems]);

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/public-product`
      );
      console.log(response.data);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Fetch Products");
    }
  };


  const getUserCart = async () => {
  try {
    if (!token) return;

    const response = await axios.get(
      `${backendUrl}/api/cart/get`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      setCartItems(response.data.cartData || {});
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to load cart");
  }
};


const getCartSummary = () => {
  let subTotal = 0;
  let discountTotal = 0;
  let gstTotal = 0;
  let shippingTotal = 0;

  for (const productId in cartItems) {
    const product = products.find(p => p._id === productId);
    if (!product) continue;

    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      if (quantity <= 0) continue;

      const base = product.basePrice * quantity;

      const discount =
        (product.basePrice * product.discountPercentage / 100) * quantity;

      const afterDiscount = base - discount;

      const gst =
        (afterDiscount * product.gstPercentage) / 100;

      const shipping =
        product.shippingFee * quantity;

      subTotal += base;
      discountTotal += discount;
      gstTotal += gst;
      shippingTotal += shipping;
    }
  }

  const finalTotal =
    subTotal -
    discountTotal +
    gstTotal +
    shippingTotal; 

  return {
    subTotal,
    discountTotal,
    gstTotal,
    shippingTotal,
    finalTotal,
  };
};






  useEffect(() => {
    getProductsData();
  }, []);

useEffect(() => {
  const savedToken = sessionStorage.getItem("token");
  if (savedToken) {
    setToken(savedToken);
  }
}, []);

// Fetch cart when token changes
useEffect(() => {
  if (token) {
    getUserCart();
  } else {
    setCartItems({});
  }
}, [token]);


  const value = {
    backendUrl,
    products,
    setProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token,
    setToken,
    getCartSummary,
    getUserCart
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
