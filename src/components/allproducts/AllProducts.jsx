import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, deleteToCart } from "../../redux/cartSlice";
import Loader from "../loader/Loader";
import MyContext from "../../context/MyContext";

const AllProducts = () => {
    const navigate = useNavigate();
    const context = useContext(MyContext);
    const { loading, getAllProduct } = context;
    
    const cartItems = useSelector((state)=> state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        alert('Product added successfully');
    }

    const deleteCart = (item) => {
        dispatch(deleteToCart(item));
        alert('Product deleted Successfully');
    }

    useEffect(() => {
       localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    


    return (
        <div className="py-12 px-6 md:px-12 bg-gradient-to-r from-blue-100 to-purple-100">
            {/* Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800">
                    All Products
                </h1>
            </div>

            {/* Products Grid */}
            <section className="text-gray-800 body-font">
                {loading && <Loader />}
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {getAllProduct.map((item) => {
                            const { id, imageUrl, name, price } = item;
                            return (
                                <div
                                    key={id}
                                    className="bg-white border border-transparent rounded-2xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl overflow-hidden"
                                >
                                    <img
                                        onClick={() => navigate(`/pages/productinfo/${id}`)}
                                        className="w-full h-64 object-cover rounded-t-2xl cursor-pointer"
                                        src={imageUrl}
                                        alt={name}
                                    />
                                    <div className="p-6">
                                        <h2 className="text-sm font-medium text-blue-500 mb-1">
                                            Exclusive
                                        </h2>
                                        <h1 className="text-xl font-bold text-gray-900 mb-2">
                                            {name.length > 25 ? `${name.substring(0, 25)}...` : name}
                                        </h1>
                                        <p className="text-xl font-semibold text-orange-600 mb-4">
                                            Rs.{price}
                                        </p>
                                        {cartItems.some((p) => p.id === item.id)?
                                        <button className="w-full bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white py-3 rounded-full font-bold transform transition-transform hover:scale-105"
                                        onClick={() => deleteCart(item)}>
                                           Delete To Cart
                                       </button>
                                       :
                                       <button className="w-full bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white py-3 rounded-full font-bold transform transition-transform hover:scale-105"
                                        onClick={() => addCart(item)}>
                                           Add To Cart
                                       </button>
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AllProducts;
