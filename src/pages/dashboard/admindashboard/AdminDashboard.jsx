import { useContext } from "react";
import AdminProducts from "../../../components/adminProducts/AdminProducts";
import MyContext from "../../../context/myContext";
import TotalOrders from "../../../components/totalOrders/TotalOrders";
import TotalUsers from "../../../components/totalUsers/TotalUsers";

const AdminDashboard = () => {

    const getuserDetail = JSON.parse(localStorage.getItem('users'));
    const {name, email} = getuserDetail;
    const context = useContext(MyContext);
    const {getAllProduct, userOrder, allUsers  } = context;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Top */}
            <div className="top mb-8 px-4 mt-5">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-6 rounded-lg shadow-lg">
                    <h1 className="text-center text-3xl font-extrabold">Admin Dashboard</h1>
                </div>
            </div>

            <div className="px-4">
                {/* Mid */}
                <div className="mid mb-8 flex flex-col lg:flex-row justify-between items-center bg-white rounded-lg shadow-lg p-6">
                    {/* Image */}
                    <div className="lg:w-1/3 flex justify-center mb-6 lg:mb-0">
                        <img
                            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md"
                            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                            alt="Profile"
                        />
                    </div>
                    {/* Text */}
                    <div className="lg:w-2/3 text-center lg:text-left">
                        <h1 className="text-xl font-bold text-gray-700">
                            Name: <span className="text-indigo-600">{name}</span>
                        </h1>
                        <h2 className="text-lg font-medium text-gray-500 mt-2">
                            Email: <span className="text-indigo-600">{email}</span>
                        </h2>
                    </div>
                </div>

                {/* Bottom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Products */}
                    <div className="p-6 bg-white hover:bg-blue-50 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                        <div className="flex justify-center mb-4 text-blue-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={50}
                                height={50}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-shopping-basket"
                            >
                                <path d="m5 11 4-7" />
                                <path d="m19 11-4-7" />
                                <path d="M2 11h20" />
                                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                                <path d="m9 11 1 9" />
                                <path d="M4.5 15.5h15" />
                                <path d="m15 11-1 9" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-700">{getAllProduct.length}</h2>
                        <p className="mt-2 text-lg font-semibold text-indigo-600">Total Products</p>
                    </div>

                    {/* Total Order */}
                    <div className="p-6 bg-white hover:bg-blue-50 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                        <div className="flex justify-center mb-4 text-blue-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={50}
                                height={50}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-list-ordered"
                            >
                                <line x1={10} x2={21} y1={6} y2={6} />
                                <line x1={10} x2={21} y1={12} y2={12} />
                                <line x1={10} x2={21} y1={18} y2={18} />
                                <path d="M4 6h1v4" />
                                <path d="M4 10h2" />
                                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-700">{userOrder.length}</h2>
                        <p className="mt-2 text-lg font-semibold text-indigo-600">Total Orders</p>
                    </div>

                    {/* Total Users */}
                    <div className="p-6 bg-white hover:bg-blue-50 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                        <div className="flex justify-center mb-4 text-blue-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={50}
                                height={50}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-users"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx={9} cy={7} r={4} />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-700">{allUsers.length}</h2>
                        <p className="mt-2 text-lg font-semibold text-indigo-600">Total Users</p>
                    </div>
                </div>
                <AdminProducts />
                <TotalOrders />
                <TotalUsers />
            </div>
        </div>
    );
};

export default AdminDashboard;
