import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import { Modal, ModalBody, Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import RelatedProducts from '../Components/RelatedProducts';
import { X } from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const product = products.find((p) => p._id === productId);
    if (product) {
      setProductData(product);
      setActiveImage(product.image[0]);
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please Select Your Size");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      addToCart(productData._id, selectedSize);
      setLoading(false);
      setOpenModal(true);
    }, 3000);
  };

  if (!productData) return null;

  return (
    <div className="pt-10 border-t">

      {/* Product Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Images */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">

          {/* Thumbnail Images (SCROLL ADDED FOR MOBILE) */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible max-w-full pb-2">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-24 object-cover rounded-md cursor-pointer border flex-shrink-0
                  ${activeImage === img ? "border-black" : "border-gray-200"}`}
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={activeImage}
              className="w-full rounded-xl shadow-sm object-cover"
              alt=""
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-light tracking-wide">
            {productData.name}
          </h1>

          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <img key={i} className="w-4" src={assets.star_icon} alt="" />
            ))}
            <span className="text-sm text-gray-400 ml-2">
              122 Reviews
            </span>
          </div>

          <p className="text-2xl font-semibold mt-6">
            {currency}{productData.basePrice}
          </p>

          <p className="text-gray-500 mt-4 leading-relaxed">
            {productData.description}
          </p>

          {/* Sizes */}
          <div className="mt-8">
            <p className="text-sm font-medium mb-3 uppercase tracking-wide">
              Select Size
            </p>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2 rounded-full border text-sm transition
                    ${selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-black"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="mt-10 w-full bg-black text-white py-4 uppercase tracking-widest text-sm
                       flex justify-center items-center gap-2 hover:opacity-90 disabled:opacity-70 cursor-pointet"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                Adding To Cart
              </>
            ) : (
              "Add To Cart"
            )}
          </button>

          <div className="mt-6 text-xs text-gray-500 space-y-2">
            <p>✔ Premium quality fabric</p>
            <p>✔ Cash on delivery available</p>
            <p>✔ Easy returns within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <b className="border px-5 py-3 text-sm">Reviews (122)</b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the buying
            and selling of products or services over the internet.
          </p>
          <p>
            Products are displayed with descriptions, images, prices, and variations
            such as size or color.
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />

      {/* Modal */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
        <ModalBody>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">
              Your Item Added Successfully To Your Cart
            </h3>
            <X
              onClick={() => setOpenModal(false)}
              className="cursor-pointer text-gray-500"
            />
          </div>

          <div className="flex items-center gap-4 mt-6">
            <img
              src={productData.image[0]}
              className="w-24 rounded-lg"
              alt=""
            />
            <p className="text-sm font-medium">{productData.name}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => navigate('/cart')}
              className="w-full border py-3 text-sm uppercase cursor-pointet tracking-wide"
            >
              View Cart
            </button>
            <button
              onClick={() => navigate('/place-order')}
              className="w-full bg-black text-white py-3 text-sm uppercase cursor-pointer tracking-wide"
            >
              Proceed To Checkout
            </button>
          </div>
        </ModalBody>
      </Modal>

    </div>
  );
};

export default Product;
