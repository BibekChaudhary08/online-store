import { useContext } from "react";
import MyContext from "../../context/MyContext";

const TotalUsers = () => {
  const context = useContext(MyContext);
  const { allUsers } = context;

  return (
    <div className="px-6 py-8 bg-gray-50">
      <div className="py-5 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-indigo-600">All Users</h1>
      </div>

      <div className="w-full mt-6 shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-indigo-100 text-indigo-600">
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
              >
                S.No.
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
              >
                UID
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allUsers.map((user, index) => {
              const { name, email, uid, role, date } = user;
              return (
                <tr key={index} className="hover:bg-indigo-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 capitalize">
                    {name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 cursor-pointer">
                    {email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 cursor-pointer">
                    {uid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                    {role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalUsers;
