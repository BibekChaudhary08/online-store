import Layout from "../../components/layout/Layout";

const products = [
    {
        id: 1,
        name: 'Nike Air Force 1 07 LV8',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
        href: '#',
        price: '61,999',
        color: 'Orange',
        imageAlt: 'Nike Air Force 1 07 LV8',
        quantity: 1,
    },
]

const UserDashboard = () => {

    const userDetail = JSON.parse(localStorage.getItem('users'));
    const {name, email} = userDetail;
    return (
        <Layout>
            <div className="container mx-auto px-6 py-10 lg:py-12">
                {/* User Info */}
                <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-2xl p-8 md:p-12">
                    {/* User Image */}
                    <div className="flex-shrink-0 mb-6 md:mb-0">
                        <img 
                            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md"
                            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" 
                            alt="User" 
                        />
                    </div>
                    {/* User Details */}
                    <div className="ml-0 md:ml-8 text-center md:text-left">
                        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
                        <p className="mt-2 text-lg text-gray-500">{email}</p>
                    </div>
                </div>

                {/* Order Details */}
                <div className="mt-10">
                    <h2 className="text-3xl font-bold text-gray-900">Order Details</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                        {/* Order Summary */}
                        <div className="col-span-1 bg-gradient-to-r from-indigo-600 to-purple-500 p-6 rounded-2xl shadow-lg text-white">
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">Order ID</h3>
                                <p className="text-2xl font-bold">#74557994327</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">Date</h3>
                                <p className="text-xl">4 March, 2023</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">Total Amount</h3>
                                <p className="text-xl">Rs84,499</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">Order Status</h3>
                                <p className="text-xl text-green-300">Confirmed</p>
                            </div>
                        </div>

                        {/* Product List */}
                        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-700">Products</h3>
                            <ul className="mt-4 divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li
                                        key={product.id}
                                        className="py-6 flex items-center"
                                    >
                                        <img
                                            className="w-20 h-20 rounded-lg border border-gray-300"
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                        />
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                                            <p className="text-sm text-gray-500">{product.color}</p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <p className="text-lg font-semibold text-gray-900">{product.price}</p>
                                            <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;
