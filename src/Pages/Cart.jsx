import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import toast from 'react-hot-toast';
import {Minus, Plus, ShoppingBag, Trash2, X} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import Title from '../Components/Title';
import { Modal, ModalBody, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import Carttotal from '../Components/Carttotal';

const Cart = () => {
  const MAX_QTY = 5;
  const {products,currency,cartItems,updateQuantity} = useContext(ShopContext);
  const [cartData,setCartData] = useState([]);
  const [openModal,setOpenModal] = useState(false);
  const [deleteItem,setDeleteItem] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const temp = [];
    for(const id in cartItems){
      for(const size in cartItems[id]){
        if(cartItems[id][size]>0){
          temp.push({
            _id:id,
            size,
            quantity:cartItems[id][size]
          })
        }
      }
    }
    setCartData(temp);
  },[cartItems])

  const increaseQty = (item) => {
    if(item.quantity >= MAX_QTY) {
      toast.error("You Cannot Add More Than 5 Items");
      return;
    }
    updateQuantity(item._id,item.size,item.quantity + 1);
  }

  const decreaseQty = (item) => {
    if(item.quantity <= 1) {
      toast.error("You Cannot Remove More Than 1 Item");
      return;
    }
    updateQuantity(item._id,item.size,item.quantity - 1);
  }

  const openDeleteModal = (item,product) => {
    setDeleteItem({...item,name:product.name});
    setOpenModal(true);
  }

  const confirmDelete = () => {
    updateQuantity(deleteItem._id,deleteItem.size,0);
    setOpenModal(false);
    toast.success("Item Removed Successfully")
    return;
  }

  if(cartData.length === 0) {
    return(
      <section className='border-t pt-24 flex flex-col items-center text-center'>
       <ShoppingBag size={72} className='text-gray-300 mb-5'/>
       <h2 className='text-2xl font-semibold mb-2'>Your Cart Is Empty</h2>
       <p className='text-gray-500 max-w-md mb-8'>
        Looks like you haven’t added anything yet. Discover the
        latest fashion collections and find your perfect style.
       </p>
       <button onClick={()=>navigate('/collection')} className='bg-black cursor-pointer text-white px-10 py-3 text-sm hover:bg-gray-800 transition'>Start Shopping</button>
      </section>
    )
  }
  return (
    <section className='border-t pt-14'>
     <div className='text-2xl mb-8'>
      <Title text1={"Your"} text2={"Cart"} />
     </div>
     <div className='hidden md:block'>
      <Table>
        <TableHead>
          <TableHeadCell>Product</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell>Quantity</TableHeadCell>
          <TableHeadCell>Remove</TableHeadCell>  
        </TableHead>
        <TableBody>
          {cartData.map((item,index)=>{
            const product = products.find((p)=>p._id === item._id);

            return(
              <TableRow key={index}>
               <TableCell>
                <div className='flex items-center gap-4'>
                 <img className='w-16 rounded-md' src={product.image[0]} alt="" />
                 <div>
                  <p className='font-medium'>{product.name}</p>
                  <p>Size:{item.size}</p>
                 </div>
                </div>
               </TableCell>
               <TableCell>{currency}{product.basePrice}</TableCell>
               <TableCell>
                <div className='flex items-center gap-3'>
                 <button onClick={()=>decreaseQty(item)} className='border p-1 cursor-pointer'><Minus size={16}/></button>
                 <span>{item.quantity}</span>
                 <button onClick={()=>increaseQty(item)} className='border p-1 cursor-pointer'><Plus size={16}/></button>
                </div>
               </TableCell>
               <TableCell>
                <button onClick={()=>openDeleteModal(item,product)} className='text-red-600 ml-4 cursor-pointer'><Trash2 size={16}/></button>
               </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
     </div>
     <div className='md:hidden space-y-4'>
       {cartData.map((item,index)=>{
        const product = products.find((p)=>p._id === item._id);
        return(
          <div className='border rounded-xl p-4 flex gap-4' key={index}>
           <img className='w-20 rounded-md' src={product.image[0]} alt="" />
           <div className='flex-1'>
            <p className='font-medium'>{product.name}</p>
            <p className="text-sm text-gray-500">
                  {currency}
                  {product.price} · Size {item.size}
            </p>
            <div className='flex items-center justify-between mt-4'>
              <div className='flex items-center gap-3'>
                <button onClick={()=>decreaseQty(item)} className='border p-1 cursor-pointer'><Minus size={16}/></button>
                <span>{item.quantity}</span>
                <button onClick={()=>increaseQty(item)} className='border p-1 cursor-pointer'><Plus size={16}/></button>
              </div>
              <button onClick={()=>openDeleteModal(item,product)} className='text-red-600 ml-4 cursor-pointer'><Trash2 size={16}/></button>
            </div>
           </div>
          </div>
        )
       })}
     </div>
     <div className='flex justify-end my-16'>
      <div className='w-full sm:w-[420px]'>
       <Carttotal/>
       <button onClick={()=>navigate('/place-order')} className='w-full bg-black text-white py-3 mt-6 cursor-pointer'>Proceed To Checkout</button>
      </div>
     </div>
     <Modal show={openModal} onClose={()=>setOpenModal(false)}>
      <ModalBody>
        <div className='flex justify-between items-start'>
         <h3 className='text-lg font-semibold'>Remove Item?</h3>
         <X onClick={()=>setOpenModal(false)} className='cursor-pointer'/>
        </div>
        <p className="text-gray-600 mt-4">
            Are you sure you want to remove{" "}
            <span className="font-medium">
              {deleteItem?.name}
            </span>{" "}
            from your cart?
        </p>
        <div className='flex gap-3 mt-6'>
         <button className='flex-1 bg-red-600 text-white py-2 cursor-pointer' onClick={confirmDelete}>Yes Remove</button>
         <button onClick={()=>setOpenModal(false)} className='flex-1 border py-2 cursor-pointer'>No,Keep</button>
        </div>
      </ModalBody>
     </Modal>
    </section>
  )
}

export default Cart