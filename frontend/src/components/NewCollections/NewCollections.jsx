import React, { useEffect, useState } from 'react'
import './NewCollections.css'
//import new_collection from '../assets/new_collections'
import Item from '../Item/Item'

export const NewCollections = () => {
  const [new_collection,set_newcollections]=useState([]);

  useEffect(()=>
    {
        fetch('http://localhost:4000/newcollections')
        .then((response)=>response.json())
        .then((data)=>set_newcollections(data))
  
  
    },[])

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item,i)=>{
          return<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      
      </div>
    </div>
   
  )
}
export default NewCollections