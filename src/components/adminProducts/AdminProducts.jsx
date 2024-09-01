import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import MyContext from "../../context/MyContext";

const AdminProducts = () => {
    const context = useContext(MyContext)
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;

    const navigate = useNavigate();

    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">Product Inventory</h1>
                <Link to={'/pages/addproduct'}>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg transform hover:scale-105 transition duration-300">Add New Product</button>
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
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">No.</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Product Image</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Product Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Price</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Date Added</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {getAllProduct.map((item, index) => {
                                const { id, name, price, date, imageUrl } = item;
                                return (
                                    <tr key={id} className="hover:bg-gray-50 transition duration-200">
                                        <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                        <td className="px-6 py-4">
                                            <img className="w-16 h-16 object-cover rounded-md shadow-md" src={imageUrl} alt={name} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">Rs. {price}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            <div className="flex space-x-4">
                                                <span className="text-green-500 cursor-pointer hover:text-green-700 transition duration-200"
                                                 onClick={() => navigate(`/pages/editproduct/${id}`)}
                                                >
                                                    Edit
                                                </span>
                                                <span className="text-red-500 cursor-pointer hover:text-red-700 transition duration-200"
                                                 onClick={()=> deleteProduct(id)}>Delete</span>
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
