

// eslint-disable-next-line react/prop-types
const DashBoardTable = () => {
    //const [data, setData] = useState([]);
    //const [loading, setLoading] = useState(true);

    //if (loading) {return <p>Loading data...</p>; }
    const data = [
        {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "johndoe@example.com",
          phone: "123-456-7890",
          website: "johndoe.com",
          company: { name: "Doe Enterprises" },
        },
        {
          id: 2,
          name: "Jane Smith",
          username: "janesmith",
          email: "janesmith@example.com",
          phone: "987-654-3210",
          website: "janesmith.com",
          company: { name: "Smith Co." },
        },
      ];

return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {/* Tablo Başlıkları */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="col" className="px-6 py-3">A</th>
            <th scope="col" className="px-6 py-3">B</th>
            <th scope="col" className="px-6 py-3">C</th>
            <th scope="col" className="px-6 py-3">D</th>
            <th scope="col" className="px-6 py-3">E</th>
            <th scope="col" className="px-6 py-3">F</th>
            <th scope="col" className="px-6 py-3">G</th>
        </tr>
        </thead>
        {/* Tablo Gövdesi */}
        <tbody>
        {data.map((item) => (
            <tr
            key={item.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
            <td className="px-6 py-4">id</td>
            <td className="px-6 py-4">name</td>
            <td className="px-6 py-4">username</td>
            <td className="px-6 py-4">email</td>
            <td className="px-6 py-4">phone</td>
            <td className="px-6 py-4">website</td>
            <td className="px-6 py-4">company</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default DashBoardTable;
