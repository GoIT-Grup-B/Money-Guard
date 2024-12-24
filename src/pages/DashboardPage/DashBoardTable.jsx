import './DashBoardTable.module.css'; 
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
        <div className="flex justify-center items-start h-screen bg-gray-100 px-10">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-6xl">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {/* Tablo Başlıkları */}
            <thead className="text-xs text-white uppercase " style={{ backgroundColor: '#523B7E99' }}>
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
                        <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.id}</td>
                        <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.name}</td>
                        <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.username}</td>
                        <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.email}</td>
                        <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.phone}</td>
                        <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.website}</td>
                        <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.company.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );

};

export default DashBoardTable;
