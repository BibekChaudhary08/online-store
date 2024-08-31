import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { decrementQuantity, deleteToCart, incrementQuantity } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteToCart(item));
        toast.success("Delete cart");
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const navigate = useNavigate();

    return (
        <Layout>
            <div className="container mx-auto max-w-7xl p-4 lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8 xl:gap-x-10">
                        <section aria-labelledby="cart-heading" className="rounded-xl bg-gray-50 lg:col-span-8 shadow-md">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cartItems.length > 0 ? (
                                    <>
                                        {cartItems.map((item, index) => {
                                            const { id, title, price, imageUrl, quantity } = item;
                                            return (
                                                <div key={index} className="p-4">
                                                    <li className="flex py-6 sm:py-8">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={imageUrl}
                                                                alt={title}
                                                                className="sm:h-36 sm:w-36 h-24 w-24 rounded-lg object-contain object-center shadow-lg"
                                                            />
                                                        </div>
                                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                            <div className="relative sm:grid sm:grid-cols-2 sm:gap-x-6">
                                                                <div>
                                                                    <div className="flex justify-between">
                                                                        <h3 className="text-lg font-semibold text-blue-600">
                                                                            {title}
                                                                        </h3>
                                                                    </div>
                                                                    <div className="mt-2 text-gray-700">
                                                                        <p className="text-sm">Quantity: {quantity}</p>
                                                                    </div>
                                                                    <div className="mt-2 text-lg font-bold text-green-600">
                                                                        Rs. {price}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex">
                                                            <button
                                                                onClick={() => handleDecrement(id)}
                                                                type="button"
                                                                className="h-8 w-8 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="text"
                                                                className="mx-2 h-8 w-12 text-center bg-gray-100 rounded-md"
                                                                value={quantity}
                                                                readOnly
                                                            />
                                                            <button
                                                                onClick={() => handleIncrement(id)}
                                                                type="button"
                                                                className="h-8 w-8 bg-green-500 text-white rounded-full hover:bg-green-600"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            type="button"
                                                            className="text-sm font-medium text-red-600 hover:underline"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <h1 className="text-center py-6 text-gray-600">No items found in your cart.</h1>
                                )}
                            </ul>
                        </section>
                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-xl bg-white shadow-lg lg:col-span-4 lg:mt-0"
                        >
                            <h2
                                id="summary-heading"
                                className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div className="p-4">
                                <dl className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-700">Price ({cartItemTotal} items)</dt>
                                        <dd className="text-sm font-semibold text-gray-900">Rs. {cartTotal}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-sm text-gray-700">Delivery Charges</dt>
                                        <dd className="text-sm font-semibold text-green-600">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-dashed pt-4">
                                        <dt className="text-base font-bold text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-bold text-gray-900">Rs. {cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="mt-6">
                                
                                        <button onClick={() => navigate('/pages/buynow')} className="p-2 rounded-md bg-gray-400 hover:bg-blue-gray-400">Buy Now</button>
                                  
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;
