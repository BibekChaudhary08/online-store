import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../context/myContext';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToCart } from '../../redux/cartSlice';
import { toast } from 'react-hot-toast';

const BuyNow = () => {
  const [inputdetail, setInputDetail] = useState({
    name: '',
    address: '',
    pincode: '',
    mobile_no: '',
    zip_code: '',
    city: '',
    status: 'confirmed',
    time: Timestamp.now(),
    date: new Date().toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }),
  });

  const user = JSON.parse(localStorage.getItem('users'));

  const context = useContext(MyContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartItemsCopy = [...cartItems];

  const deleteToCartFunction = (item) => {
    dispatch(deleteToCart(item));
  };

  const orderDetails = async () => {
    if (
      inputdetail.name === '' ||
      inputdetail.address === '' ||
      inputdetail.pincode === '' ||
      inputdetail.mobile_no === '' ||
      inputdetail.zip_code === '' ||
      inputdetail.city === ''
    ) {
      toast.error('All Fields are Required');
    } else {
      setLoading(true);
      try {
        const orderRef = collection(fireDB, 'orders');
        const orderData = {
          ...inputdetail,
          cartItemsCopy: cartItemsCopy, // Use the copy of cartItems
          user: user,
        };
        localStorage.setItem('cartItemsCopy', JSON.stringify(cartItemsCopy));

        await addDoc(orderRef, orderData);
        setInputDetail({
          name: '',
          address: '',
          pincode: '',
          mobile_no: '',
          zip_code: '',
          city: ''
        });
        toast.success('Order Placed Successfully');
        alert('Orde Placed Successfully')
        setLoading(false); 

        // Remove items from cart
        cartItems.forEach((item) => {
          if (cartItemsCopy.some((i) => i.id === item.id)) {
            deleteToCartFunction(item);
          }
        });

        // Navigate to the user dashboard
        navigate('/pages/dashboard/userdashboard');
      } catch (error) {
        toast.error('Error on order Placed.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Buy Now</h2>
      <div className="space-y-4">
        <input
          placeholder="Enter Name"
          value={inputdetail.name}
          onChange={(e) => setInputDetail({ ...inputdetail, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          placeholder="Enter Address"
          value={inputdetail.address}
          onChange={(e) => setInputDetail({ ...inputdetail, address: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          placeholder="Enter Pincode"
          value={inputdetail.pincode}
          onChange={(e) => setInputDetail({ ...inputdetail, pincode: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          placeholder="Enter Mobile Number"
          value={inputdetail.mobile_no}
          onChange={(e) => setInputDetail({ ...inputdetail, mobile_no: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          placeholder="Enter Zip code"
          value={inputdetail.zip_code}
          onChange={(e) => setInputDetail({ ...inputdetail, zip_code: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          placeholder="Enter city"
          value={inputdetail.city}
          onChange={(e) => setInputDetail({ ...inputdetail, city: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={orderDetails}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BuyNow;
