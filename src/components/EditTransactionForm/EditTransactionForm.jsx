import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../AddTransactionForm/datepicker.css";
import { useDispatch } from 'react-redux';
import { updateTransaction } from '../../redux/transaction/transactionOps';

const EXPENSE_CATEGORIES = [
    'Main expenses',
    'Products',
    'Car',
    'Self care',
    'Child care',
    'Household products',
    'Education',
    'Leisure',
    'Entertainment',
    'Other expenses'
];

const EditTransactionForm = ({ transaction, onClose }) => {
    const dispatch = useDispatch();
    const [isIncome, setIsIncome] = useState(transaction.type === 'income');
    const [amount, setAmount] = useState(transaction.amount);
    const [date, setDate] = useState(new Date(transaction.date));
    const [comment, setComment] = useState(transaction.comment);
    const [category, setCategory] = useState(transaction.category);

    useEffect(() => {
        console.log('Original transaction date:', transaction.date);
        const parsedDate = new Date(transaction.date);
        console.log('Parsed date:', parsedDate);
        if (!isNaN(parsedDate)) {
            setDate(parsedDate);
        } else {
            console.error('Invalid date format:', transaction.date);
            setDate(new Date());
        }
    }, [transaction.date]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form with data:', {
            transactionId: transaction.id,
            transactionData: {
                type: isIncome ? 'income' : 'expense',
                amount: parseFloat(amount),
                date: date.toISOString().split('T')[0],
                comment,
                ...((!isIncome) && { category })
            }
        });
        dispatch(updateTransaction({
            transactionId: transaction.id,
            transactionData: {
                type: isIncome ? 'income' : 'expense',
                amount: parseFloat(amount),
                date: date.toISOString().split('T')[0],
                comment,
                ...((!isIncome) && { category })
            }
        }));
        onClose();
    };

    return (
        <div className="edit-transaction-form p-4 rounded-lg shadow-md">
            <form className="flex flex-col justify-center items-center max-w-[394px] gap-5 w-full" onSubmit={handleSubmit}>
                <div className="flex items-center justify-center gap-8 mb-5">
                    <label className="mr-4">
                        <input
                            type="radio"
                            name="type"
                            value="income"
                            checked={isIncome}
                            onChange={() => setIsIncome(true)}
                            className="mr-2"
                        />
                        Income
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="expense"
                            checked={!isIncome}
                            onChange={() => setIsIncome(false)}
                            className="mr-2"
                        />
                        Expense
                    </label>
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Amount"
                    />
                </div>
                <div className="mb-4">
                    <DatePicker
                        onChange={(date) => setDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                {!isIncome && (
                    <div className="mb-4">
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select category</option>
                            {EXPENSE_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="mb-4">
                    <input
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Comment"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                </div>
            </form>
        </div>
    );
};

export default EditTransactionForm;