import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteToCart } from "../../redux/cartSlice";
import MyContext from "../../context/MyContext";

const ProductInfo = () => {
    const context = useContext(MyContext);
    const { loading, setLoading, getAllProduct } = context;

    const [product, setProduct] = useState(null);

    const { id } = useParams();

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (product) => {
        dispatch(addToCart(product));
        alert('Product Added Successfully');
    }

    const deleteCart = (product) => {
        dispatch(deleteToCart(product));
        alert('Product Remove Successfully');
    }

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])
    

    // getProductData
    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            setProduct(productTemp.data());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-w-6xl px-4 mx-auto bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                    <img
                                        className="w-full h-auto max-h-[500px] object-contain"
                                        src={product?.imageUrl}
                                        alt={product?.name}
                                    />
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                            {product?.name}
                                        </h2>
                                        <div className="flex flex-wrap items-center mb-6">
                                            <ul className="flex mb-4 mr-2 lg:mb-0">
                                                {[...Array(5)].map((_, index) => (
                                                    <li key={index}>
                                                        <a href="#">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={16}
                                                                height={16}
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-400">
                                            <span>Rs {product?.price}</span>
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                                            Description:
                                        </h2>
                                        <p>{product?.description}</p>
                                    </div>
                                    <div className="flex flex-wrap items-center mb-6">
                                        {cartItems.some((p) => p.id === product?.id)?
                                        <button className="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 hover:bg-blue-600 hover:text-gray-100 rounded-xl transition duration-300"
                                        onClick={() => deleteCart(product)}>
                                           Delete to cart
                                       </button>
                                        :
                                        <button className="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 hover:bg-blue-600 hover:text-gray-100 rounded-xl transition duration-300"
                                        onClick={() => addCart(product)}>
                                           Add to cart
                                       </button>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default ProductInfo;
