import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import MyContext from "../../context/myContext";

const TotalOrders = () => {
    const context = useContext(MyContext);
    const { setLoading } = context;

    const [adminOrders, setAdminOrders] = useState([]);

    const totalOrdersFunction = async () => {
        setLoading(true);
        const q = query(
            collection(fireDB, 'orders'),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            const adminOrders = [];
            QuerySnapshot.forEach((doc) => {
                adminOrders.push({ ...doc.data(), id: doc.id });
            });
            setLoading(false);
            setAdminOrders(adminOrders);
        });

        return () => data;
    };

    useEffect(() => {
        totalOrdersFunction();
    }, []);

    return (
        <div className="max-w-full">
            <div className="py-5">
                <h1 className="text-2xl font-semibold text-gray-800">All Orders</h1>
            </div>

            <div className="overflow-x-auto">
                {adminOrders.map((order, orderIndex) => {
                    const { id: orderId, date, status, pincode, address, mobile_no, cartItemsCopy: orderCartItemsCopy, user } = order;

                    return (
                        <div key={orderIndex} className="min-w-[1024px] mb-8">
                            {orderCartItemsCopy.map((item, index) => (
                                <div key={index} className="bg-white shadow rounded-lg">
                                    <table className="w-full text-left border border-collapse sm:border-separate border-gray-200 text-gray-600">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="h-12 px-6 text-sm border-l first:border-l-0 border-gray-200 bg-gray-100 font-semibold">
                                                    S.No.
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Order Id
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Image
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Name
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Price
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Quantity
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Total Price
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Status
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Name
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Address
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Pincode
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Phone Number
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Email
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Date
                                                </th>
                                                <th scope="col" className="h-12 px-6 text-sm font-semibold border-l first:border-l-0 border-gray-200 bg-gray-100">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-gray-50 hover:bg-gray-100 transition duration-150">
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200">
                                                    {orderIndex + 1}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200">
                                                    {orderId}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200">
                                                    <img src={item.imageUrl} alt="img" className="h-12 w-12 object-cover rounded" />
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200 capitalize">
                                                    {item.name}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200">
                                                    Rs.{item.price}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200">
                                                    {item.quantity}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200">
                                                    Rs.{item.price * item.quantity}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200 capitalize">
                                                    {status}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200 capitalize">
                                                    {user.name}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200 capitalize">
                                                    {address}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200">
                                                    {pincode}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200">
                                                    {mobile_no}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200 lowercase">
                                                    {user.email}
                                                </td>
                                                <td className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200">
                                                    {date}
                                                </td>
                                                <td
                                                    className="h-12 px-6 text-sm border-t border-l first:border-l-0 border-gray-200 text-red-600 cursor-pointer hover:text-red-800 transition"
                                                    onClick={() => deleteUserOrder(orderId)}
                                                >
                                                    Delete
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TotalOrders;
