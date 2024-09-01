import React, { useContext, useState } from 'react';
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../context/MyContext';

const AddProductPage = () => {
  const context = useContext(MyContext);
  const { loading, setLoading } = context;
  const [addproduct, setAddProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
    quantity: 1,
    description: '',
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const navigate = useNavigate();

  const addProductFunction = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (
      addproduct.name === '' ||
      addproduct.price === '' ||
      addproduct.imageUrl === '' ||
      addproduct.description === ''
    ) {
      return alert('All Fields Required');
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, addproduct);
      alert('Product Added Successfully');
      navigate('/pages/dashboard/adminDashboard');
    } catch (error) {
      console.log(error);
      alert('Error on adding Product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      {loading && <Loader />}
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <form onSubmit={addProductFunction}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={addproduct.name}
            onChange={(e) =>
              setAddProduct({ ...addproduct, name: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={addproduct.price}
            onChange={(e) =>
              setAddProduct({ ...addproduct, price: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            value={addproduct.imageUrl}
            onChange={(e) =>
              setAddProduct({ ...addproduct, imageUrl: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Description</label>
          <textarea
            value={addproduct.description}
            onChange={(e) =>
              setAddProduct({ ...addproduct, description: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
