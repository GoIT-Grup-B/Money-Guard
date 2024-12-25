import penLogo from "../../assets/img/pen.svg"
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
        <div className="flex justify-center items-center h-screen bg-gray-100 px-10">
        <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border border-gray-300" style={{margin:"0 auto"}}>
            {/* Tablo Başlıkları */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" style={{ backgroundColor: '#523B7E99' }}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Type</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Comment</th>
                    <th scope="col" className="px-6 py-3">Sum</th>
                    <th scope="col" className="px-6 py-3" style={{ color: '#523B7E99' }}>G</th>
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
                        <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">
                            <div style={{display:"flex", flexDirection:"row", gap:"2"}}>
                                 <button>
                                    <img src={penLogo} alt="pen" />
                                </button>
                                <button type="button" className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'>Delete</button>
                            </div>
                            </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );

};

export default DashBoardTable;
