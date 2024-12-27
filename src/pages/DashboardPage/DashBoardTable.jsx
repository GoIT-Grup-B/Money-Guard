import './DashBoardTable.module.css'; 
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransaction,deleteTransaction } from '../../redux/transaction/transactionOps';
import penLogo from "../../assets/svg/pen.svg"
// eslint-disable-next-line react/prop-types
const DashBoardTable = () => {
    //const [data, setData] = useState([]);
    //const [loading, setLoading] = useState(true);
    const { transactions, loading, error } = useSelector((state) => state.transaction);
    const token = useSelector((state) => state.user.token);
    console.log(transactions);

    //if (loading) {return <p>Loading data...</p>; }
    const dispatch = useDispatch();
    useEffect(() => {
        if (token) {
            dispatch(getTransaction());
        }
    }, [dispatch, token]);

    const handleDelete = (transactionId) => {
        if (token) {
            dispatch(deleteTransaction({ transactionId, token }));
        }
    };

      if(loading){
        return <p>Loading</p>
      }
        
      if (error) {
        return <div>Error: {error}</div>;
      }

      return (

        <div className="flex justify-center items-center h-screen  px-10" >


            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400 border-collapse rounded-t-lg border-gray-300" style={{margin:"0 auto"}}>
                    {/* Tablo Başlıkları */}
                    <thead className="bg-[#523B7E99] rounded-t-[20px] text-xs text-gray-700 dark:text-gray-400">
                        <tr className="h-auto max-w-lg rounded-t-[20px] text-base text-[#FCFCFC] dark:text-gray-400" >
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3">Date</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3">Type</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3">Category</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3">Comment</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3">Sum</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3" style={{ color: '#523B7E99' }}></th>
                        </tr>
                    </thead>
                    {/* Tablo Gövdesi */}
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="text-[#FBFBFB] px-6 py-4 font-poppins text-sm font-normal leading-6 text-left hover:underline">{transaction.transactionDate}</td>
                                <td className="text-[#FBFBFB] px-6 py-4 font-poppins text-sm font-normal leading-6 text-left hover:underline"> {transaction.type === "income" ? `+` : `-`}</td>
                                <td className="text-[#FBFBFB] px-6 py-4 font-poppins text-sm font-normal leading-6 text-left hover:underline">{transaction.categoryId}</td>
                                <td className="text-[#FBFBFB] px-6 py-4 font-poppins text-sm font-normal leading-6 text-left hover:underline">{transaction.comment}</td>
                                <td
                                    className={`px-6 py-4 font-poppins text-sm font-normal leading-6 text-left ${
                                        transaction.amount < 10000 ? "text-[#FF868D]" : "text-[#FFB627]"
                                    }`}
                                    >  {transaction.amount}
                                    </td>
                               <td className="text-[#FBFBFB] px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">
                                    <div style={{display:"flex", flexDirection:"row", gap:"2"}}>
                                        <button>
                                            <img src={penLogo} alt="pen" />
                                        </button>
                                        <button type="button" onClick={() => handleDelete(transaction.id)} className='class="bg-gradient-to-r from-[#ebac44] to-[#a144b5] rounded-[20px] py-3 text-white cursor-pointer transition-opacity hover:opacity-90'>Delete</button>
                                    </div>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

//         <div className="flex justify-center items-center h-screen bg-gray-100 px-10">
//         <div className="relative overflow-x-auto">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border border-gray-300" style={{margin:"0 auto"}}>
//             {/* Tablo Başlıkları */}
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" style={{ backgroundColor: '#523B7E99' }}>
//                 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
//                     <th scope="col" className="px-6 py-3">Date</th>
//                     <th scope="col" className="px-6 py-3">Type</th>
//                     <th scope="col" className="px-6 py-3">Category</th>
//                     <th scope="col" className="px-6 py-3">Comment</th>
//                     <th scope="col" className="px-6 py-3">Sum</th>
//                     <th scope="col" className="px-6 py-3" style={{ color: '#523B7E99' }}>G</th>
//                 </tr>
//             </thead>
//             {/* Tablo Gövdesi */}
//             <tbody>
//                 {data.map((item) => (
//                     <tr
//                         key={item.id}
//                         className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
//                     >
//                         <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.id}</td>
//                         <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.name}</td>
//                         <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.username}</td>
//                         <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.email}</td>
//                         <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">{item.phone}</td>
//                         <td className="px-6 py-4 font-poppins text-sm font-normal leading-6 text-left">
//                             <div style={{display:"flex", flexDirection:"row", gap:"2"}}>
//                                  <button>
//                                     <img src={penLogo} alt="pen" />
//                                 </button>
//                                 <button type="button" className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'>Delete</button>
//                             </div>
//                             </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
// </div> 


    );

};

export default DashBoardTable;
