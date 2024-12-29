import { useState } from 'react';
import './DashBoardTable.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransaction, deleteTransaction } from '../../redux/transaction/transactionOps';
import penLogo from "../../assets/svg/pen.svg";
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';
//gizem
const DashBoardTable = () => {
    const { transactions, loading, error } = useSelector((state) => state.transaction);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        if (token) {
            dispatch(getTransaction(token));
        }
    }, [dispatch, token]);

    const handleDelete = (transactionId) => {
        if (token) {
            dispatch(deleteTransaction({ transactionId, token }));
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

    if (loading) {
        return <p>Loading</p>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen px-10">
            <div className="relative overflow-x-auto bg-transparent">
                <table className="w-full text-sm text-left bg-transparent text-gray-500 dark:text-gray-400 border-collapse rounded-t-lg border-gray-300" style={{ margin: "0 auto" }}>
                    <thead className="bg-[#523B7E99] rounded-t-[20px] text-xs text-gray-700 dark:text-gray-400">
                        <tr className="h-auto max-w-lg rounded-t-[20px] text-base text-[#FCFCFC] dark:text-gray-400">
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3">Date</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3">Type</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3">Category</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3">Comment</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3">Sum</th>
                            <th scope="col" className="text-[#FBFBFB] px-6 py-3" style={{ color: '#523B7E99' }}></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 divide-opacity-20">
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="h-12 dark:bg-transparent bg-transparent border-b dark:bg-gray-800 dark:border-gray-700 divide-y divide-gray-100 divide-opacity-20"
                            >
                                <td className="text-[#FBFBFB] bg-transparent px-6 py-3 font-poppins text-sm font-normal leading-6 text-left">{formatDate(transaction.transactionDate)}</td>
                                <td className="text-[#FBFBFB] bg-transparent px-6 py-3 font-poppins text-sm font-normal leading-6 text-left"> {transaction.type === "income" ? `+` : `-`}</td>
                                <td className="text-[#FBFBFB] bg-transparent px-6 py-3 font-poppins text-sm font-normal leading-6 text-left">{transaction.category}</td>
                                <td className="text-[#FBFBFB] bg-transparent px-6 py-3 font-poppins text-sm font-normal leading-6 text-left">{transaction.comment}</td>
                                <td
                                    className={`px-6 py-3 bg-transparent font-poppins text-sm font-normal leading-6 text-left ${transaction.amount < 0 ? "text-[#ff5760]" : "text-[#24c516]"
                                        }`}
                                >  {transaction.amount}
                                </td>
                                <td className="text-[#FBFBFB] bg-transparent px-6 py-3 font-poppins text-sm font-normal leading-6 text-left">
                                    <div style={{ display: "flex", flexDirection: "row", gap: "2" }}>
                                        <button className='border border-white dark:border-gray-700 rounded p-1' onClick={() => handleEdit(transaction)}>
                                            <img src={penLogo} alt="pen" className='border border-white dark:border-gray-700 rounded p-1' />
                                        </button>
                                        <button type="button" onClick={() => handleDelete(transaction.id)} className='bg-gradient-to-r from-[#ebac44] to-[#a144b5] rounded-[20px] px-3 py-2 text-white cursor-pointer transition-opacity hover:opacity-90'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
