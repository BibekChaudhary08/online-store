import { useContext, useState, useEffect } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import Loader from "../../components/loader/Loader";
import MyContext from "../../context/MyContext";

const EditProductPage = () => {
  const context = useContext(MyContext);
  const { loading, setLoading, getAllProductFunction } = context;
  const { id } = useParams();
  const navigate = useNavigate();

  // State to manage the edited product details
  const [editProduct, setEditProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
    quantity: '',
    description: '',
    time: Timestamp.now(),
    date: new Date().toLocaleString('en-US', {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  });

  // Function to fetch and populate product data for editing
  const editProductFunction = async () => {
    setLoading(true);
    try {
      const getProduct = await getDoc(doc(fireDB, 'products', id));
      const Productdata = getProduct.data();
      // Populate editProduct state with fetched product data
      setEditProduct({
        name: Productdata?.name || '',
        price: Productdata?.price || '',
        imageUrl: Productdata?.imageUrl || '',
        quantity: Productdata?.quantity || '',
        description: Productdata?.description || '',
        time: Productdata?.time || Timestamp.now(),
        date: Productdata?.date || new Date().toLocaleString('en-US', {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      });
      setLoading(false);
      getAllProductFunction(); // This is done to instantly update the product.

    } catch (error) {
      toast.error('Error fetching product data');
      setLoading(false);
    }
  };

  // Log the updated product state when it changes
  useEffect(() => {
    console.log("Updated product state:", editProduct);
  }, [editProduct]);

  // Fetch product data on component mount
  useEffect(() => {
    editProductFunction();
  }, []);

  // Function to update the product details
  const updateProductFunction = async () => {
    setLoading(true);
    try {
      // Update the product in the Firestore database
      await setDoc(doc(fireDB, 'products', id), editProduct);
      // Clear the editProduct state after updating
      setEditProduct({
        name: '',
        price: '',
        imageUrl: '',
        description: '',
        time: Timestamp.now(),
        date: new Date().toLocaleString('en-US', {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      });
      setLoading(false);
      toast.success('Product Edit Successfully');
      // Redirect to the admin dashboard after updating
      navigate('/pages/dashboard/adminDashboard');

    } catch (error) {
      toast.error('Error updating product');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center h-screen'>
        {loading && <Loader />}
        {/* Product Update Form */}
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Form Heading */}
          <div className="mb-5">
            <h2 className='text-center text-2xl font-bold text-pink-500 '>
              Update Product
            </h2>
          </div>
          {/* Product Name Input */}
          <div className="mb-3">
            <input
              type="text"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              name="name"
              placeholder='Product Name'
              className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
            />
          </div>
          {/* Product Price Input */}
          <div className="mb-3">
            <input
              type="number"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              name="price"
              placeholder='Product Price'
              className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
            />
          </div>
          {/* Product Image URL Input */}
          <div className="mb-3">
            <input
              type="text"
              value={editProduct.imageUrl}
              onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
              name="imageUrl"
              placeholder='Product Image Url'
              className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
            />
          </div>
          {/* Product Description Input */}
          <div className="mb-3">
            <textarea
              value={editProduct.description}
              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              name="description" placeholder="Product Description" rows="5" className="w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300">
            </textarea>
          </div>
          {/* Update Product Button */}
          <div className="mb-3">
            <button
              onClick={updateProductFunction}
              type='button'
              className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md'>
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductPage;
