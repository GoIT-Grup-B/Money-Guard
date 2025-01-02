import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateTransaction, getCategories, getTransaction } from '../../redux/transaction/transactionOps';

const EditTransactionForm = ({ transaction, onClose }) => {
    const dispatch = useDispatch();
    const [isIncome, setIsIncome] = useState(transaction.type === 'INCOME');
    const [amount, setAmount] = useState(transaction.amount);
    const [date, setDate] = useState(new Date(transaction.transactionDate));
    const [comment, setComment] = useState(transaction.comment);
    const [category, setCategory] = useState(transaction.categoryId);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        setIsIncome(transaction.type === 'INCOME');
        setCategory(transaction.categoryId); // Ensure category state is updated
    }, [transaction]);

    useEffect(() => {
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

        fetchCategories();
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionData = {
            transactionDate: date.toISOString(),
            type: isIncome ? 'INCOME' : 'EXPENSE',
            categoryId: transaction.categoryId, // Use the current category ID
            comment,
            amount: parseFloat(amount),
        };

        // Log the transaction data to the console
        console.log('Submitting transaction data:', transactionData);

        dispatch(
            updateTransaction({
                transactionId: transaction.id,
                transactionData,
            })
        )
            .unwrap()
            .then(() => {
                dispatch(getTransaction());
                onClose();
            });
    };

    return (
        <div className="edit-transaction-form p-4 rounded-lg shadow-md">
            <form className="flex flex-col justify-center items-center max-w-[394px] gap-5 w-full" onSubmit={handleSubmit}>
                <div className="flex items-center justify-center gap-8 mb-5">
                    <span>
                        <span className={isIncome ? 'text-[#ebac44] text-lg font-bold' : 'text-white/50'}>Income</span>
                        /
                        <span className={!isIncome ? 'text-[#a144b5] text-lg font-bold' : 'text-white/50'}>Expense</span>
                    </span>
                </div>

                {!isIncome && (
                    <div
                        className="bg-transparent border-b border-white/30 py-2.5 text-white text-base focus:outline-none w-full"
                    >
                        <span className=" text-white">
                            {categories[category] || 'Unknown Category'}
                        </span>
                    </div>
                )}                <div className="flex w-full gap-8 mobile:flex-col tablet:flex-row">
                    <div className="flex-1">
                        <input
                            type="number"
                            className={`w-full bg-transparent border-b border-white/30 py-2.5 text-base placeholder:text-white/50 focus:outline-none text-center `}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            dateFormat="dd.MM.yyyy"
                            className={`w-full bg-transparent border-b border-white/30 py-2.5 text-white text-base focus:outline-none text-center`}
                        />
                    </div>
                </div>
                <input
                    type="text"
                    className={`w-full bg-transparent border-b border-white/30 py-2.5 text-base placeholder:text-white/50 focus:outline-none `}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment"
                    required
                />
                <div className="flex flex-col gap-2.5 mt-5 w-[300px]">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-[#ebac44] to-[#a144b5] rounded-[20px] py-3 text-white cursor-pointer transition-opacity hover:opacity-90"
                    >
                        SAVE
                    </button>
                    <button
                        type="button"
                        className="bg-white rounded-[20px] py-3 text-[#4a2b99] cursor-pointer transition-opacity hover:opacity-90"
                        onClick={onClose}
                    >
                        CANCEL
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTransactionForm;