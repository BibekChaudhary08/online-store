import { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";

const AdminProducts = () => {
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;

    return (
        <div className="p-8 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
                {/* Header */}
                <h1 className="text-2xl font-bold text-blue-600">Product Inventory</h1>
                {/* Add Product Button */}
                <Link to={'/pages/addproduct'}>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200">Add New Product</button>
                </Link>
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="flex justify-center items-center mt-10">
                    <Loader />
                </div>
            )}

            {/* Product Table */}
            {!loading && (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">#</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">Product Image</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">Product Name</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">Price</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">Date Added</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-blue-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getAllProduct.map((item, index) => {
                                const { id, name, price, date, imageUrl } = item;
                                return (
                                    <tr key={id} className="border-b">
                                        <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <img className="w-16 h-16 object-cover rounded-md" src={imageUrl} alt={name} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">₹{price}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex space-x-4">
                                                <span className="text-green-600 cursor-pointer hover:underline">Edit</span>
                                                <span className="text-red-600 cursor-pointer hover:underline">Delete</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
