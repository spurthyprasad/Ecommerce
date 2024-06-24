import React, { createContext,useEffect, useState } from 'react'



export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
  let cart = {};
  for (let index =0; index < 300+1; index++){
    cart[index]=0;
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [all_product,setAllProduct]=useState([]);
  const [cartItems,setCartItems]= useState(getDefaultCart());
   
  useEffect(()=>
    {
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAllProduct(data))


        if(localStorage.getItem('auth-token'))
            {
                fetch('http://localhost:4000/getcarts',
                    {
                        method:'POST',
                        headers:
                        {
                            Accept:'application/form-data',
                            'auth-token':`${localStorage.getItem('auth-token')}`,
                            'Content-Type':'application/json'
                        },
                        body:"",
                    }).then((response)=>response.json())
                    .then((data)=>setCartItems(data));
                
            }


    },[])
  
    const addToCart =(itemId)=>{
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      if(localStorage.getItem('auth-token'))
        {
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:
                {
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',

                },
                body:JSON.stringify({"item":itemId}),

            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    
    const removeFromCart =(itemId)=>{
      if (cartItems[itemId] > 0) {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(localStorage.getItem('auth-token'))
            {
                fetch('http://localhost:4000/removetocart',{
                    method:'POST',
                    headers:
                    {
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',

                    },
                    body:JSON.stringify({"item":itemId}),

                })
                .then((response)=>response.json())
                .then((data)=>console.log(data));
            }
    }
    }

    const getTotalCartAmount = ()=>{
      let totalAmount =0;
      for(const item in cartItems)
      {
        if(cartItems[item]>0)
          {
            let itemInfo = all_product.find((product)=>product.id===Number(item))
            totalAmount += cartItems[item] * itemInfo.new_price ;
          }
      }
      return totalAmount;
    }
    
    const getTotalCartItems =()=>{
      let totalItem =0;
      for(const item in cartItems)
        {
          if(cartItems[item]>0)
            {
              totalItem+= cartItems[item]
            }
        }
        return totalItem;
    }
  const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    
  return (
    <ShopContext.Provider value={contextValue}>
          {props.children}
      </ShopContext.Provider>
     
  )
}
export default ShopContextProvider;