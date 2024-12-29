import  { useState } from 'react';
import './DashBoardTable.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransaction, deleteTransaction ,getCategories } from '../../redux/transaction/transactionOps';
import penLogo from "../../assets/svg/pen.svg";
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';
//gizem
const DashBoardTable = () => {
    const { transactions, error } = useSelector((state) => state.transaction);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [categories, setCategories] = useState({});
    
    useEffect(() => {
        if (token) {
            dispatch(getTransaction());
            fetchCategories();
        }
    }, [dispatch, token]);

     const fetchCategories = async () => {
        try {
            const result = await dispatch(getCategories()).unwrap();
            const categoryMap = result.reduce((acc, category) => {
                acc[category.id] = category.name; 
                return acc;
            }, {});
            setCategories(categoryMap);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };
    const handleDelete = async(transactionId) => {
        if (token) {
            await dispatch(deleteTransaction({ transactionId }));
            dispatch(getTransaction());
        }
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditModalOpen(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString); // Tarihi bir Date nesnesine çevir
        const day = String(date.getDate()).padStart(2, '0'); // Gün
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay
        const year = String(date.getFullYear()).slice(2); // Yılın son iki hanesi
        return `${day}.${month}.${year}`;
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen px-10 w-11/12">
            <div className="relative max-h-[400px] bg-transparent tablet:w-4/5 tablet:block mobile:hidden">
                <table className="sm:table w-full tablet:rounded-lg  text-sm text-left bg-transparent text-gray-500 dark:text-gray-400 border-collapse rounded-lg border-gray-300" style={{ margin: "0 auto" }}>
                    <thead className="bg-[#523B7E99] rounded-[20px] text-xs text-gray-700 dark:text-gray-400">
                        <tr className="h-auto max-w-lg  rounded-lg text-base text-[#FCFCFC] dark:text-gray-400">
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3 rounded-s-lg w-1/6">Date</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3 w-1/6">Type</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3 w-1/6">Category</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3 w-1/6">Comment</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3 w-1/6">Sum</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3 rounded-e-lg w-1/6" style={{ color: '#523B7E99' }}></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 divide-opacity-20">
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="h-12 dark:bg-transparent bg-transparent border-b dark:bg-gray-800 dark:border-gray-700 border-b-0 divide-opacity-20"
                            >
                                <td className="text-[#FBFBFB] bg-transparent px-6 py-3 font-poppins text-sm font-normal leading-6 text-left">{formatDate(transaction.transactionDate)}</td>
                                <td className="text-[#FBFBFB] bg-transparent px-6 py-3 font-poppins text-sm font-normal leading-6 text-left"> {transaction.type === "INCOME" ? `+` : `-`}</td>
                                <td className="text-[#FBFBFB] bg-transparent px-6 py-3 font-poppins text-sm font-normal leading-6 text-left"> {categories[transaction.categoryId] || "Unknown"}</td>
                                <td className="text-[#FBFBFB] bg-transparent px-6 py-3 font-poppins text-sm font-normal leading-6 text-left">{transaction.comment}</td>
                                <td
                                    className={`px-6 py-3 bg-transparent font-poppins text-sm font-normal leading-6 text-left ${transaction.type === "INCOME" ? "text-[#FFB627]" : "text-[#FF868D]"
                                        }`}                                                             
                                > {Math.abs(transaction.amount)}
                                </td>
                                <td className="text-[#FBFBFB] bg-transparent px-6 py-3 font-poppins text-sm font-normal leading-6 text-left">
                                <div className="flex flex-row gap-2 items-center">
                                    <button 
                                    className="border-none outline-none focus:ring-0 p-1 bg-transparent min-w-[40px] min-h-[40px] flex items-center justify-center"
                                    onClick={() => handleEdit(transaction)}
                                    >
                                    <img 
                                        src={penLogo} 
                                        alt="pen" 
                                        className="w-6 h-6 rounded p-1" 
                                    />
                                    </button>
                                        <button type="button" onClick={() => handleDelete(transaction.id)} className='bg-gradient-to-r from-[#ebac44] to-[#a144b5] rounded-[20px] px-3 py-2 text-white cursor-pointer transition-opacity hover:opacity-90'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>

            <div className="mobile:block tablet:hidden desktop:hidden">
            <div className="space-y-4">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="bg-transparent border border-gray-700 rounded-lg p-4"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[#FBFBFB]">Date:</span>
                            <span className="text-[#FBFBFB]">
                                {formatDate(transaction.transactionDate)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[#FBFBFB]">Type:</span>
                            <span className="text-[#FBFBFB]">
                                {transaction.type === "INCOME" ? "+" : "-"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[#FBFBFB]">Category:</span>
                            <span className="text-[#FBFBFB]">
                                {categories[transaction.categoryId] || "Unknown"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[#FBFBFB]">Comment:</span>
                            <span className="text-[#FBFBFB]">
                                {transaction.comment}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[#FBFBFB]">Sum:</span>
                            <span className={`${transaction.type === "INCOME" ? "text-[#FFB627]" : "text-[#FF868D]"}`}>
                            {Math.abs(transaction.amount)} 
                        </span>

                        </div>
                        <div className="flex justify-end gap-2">
                            <button 
                                className="border-none outline-none focus:ring-0 p-2 bg-transparent"
                                onClick={() => handleEdit(transaction)}
                            >
                                <img src={penLogo} alt="pen" className="w-6 h-6 rounded p-1" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(transaction.id)}
                                className="bg-gradient-to-r from-[#ebac44] to-[#a144b5] rounded-[20px] px-3 py-2 text-white transition-opacity hover:opacity-90"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            {selectedTransaction && (
                <ModalEditTransaction
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    transaction={selectedTransaction}
                />
            )}
        </div>
        
    );
};

export default DashBoardTable;
