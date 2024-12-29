import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { useDispatch } from 'react-redux';
import { getTransaction } from '../../redux/transaction/transactionOps';

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

const AddTransactionForm = ({ onSubmit, onCancel }) => {
    const dispatch = useDispatch();
    const [isIncome, setIsIncome] = useState(true);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [comment, setComment] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit({
            type: isIncome ? 'income' : 'expense',
            amount: parseFloat(amount),
            date: date.toISOString().split('T')[0],
            comment,
            ...((!isIncome) && { category })
        });
        dispatch(getTransaction());
    };

    const textColor = isIncome ? 'text-[#ebac44]' : 'text-[#a144b5]';

    return (
        <form className="flex flex-col justify-center items-center max-w-[394px] gap-5 w-full" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-8 mb-5">
                <span className={`text-lg ${isIncome ? 'text-[#ebac44]' : 'text-white/50'}`}>Income</span>
                <label className="relative inline-block w-[80px] h-[40px]">
                    <input
                        type="checkbox"
                        className="opacity-0 w-0 h-0"
                        checked={!isIncome}
                        onChange={() => setIsIncome(!isIncome)}
                    />
                    <span className="absolute cursor-pointer inset-0 rounded-full transition-all duration-400 
                        bg-white">
                        <span className={`absolute w-[44px] h-[44px] 
                            left-[-2px] top-[-2px] rounded-full 
                            transition-all duration-400 flex items-center justify-center
                            ${!isIncome
                                ? 'translate-x-[40px] bg-[#a144b5] shadow-[0_2px_10px_rgba(161,68,181,0.8)]'
                                : 'bg-[#ebac44] shadow-[0_2px_10px_rgba(235,172,68,0.8)]'
                            }`}>
                            <span className="text-2xl font-bold text-white">
                                {!isIncome ? '−' : '+'}
                            </span>
                        </span>
                    </span>
                </label>
                <span className={`text-lg ${!isIncome ? 'text-[#a144b5]' : 'text-white/50'}`}>Expense</span>
            </div>

            {!isIncome && (
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-transparent border-b border-white/30 py-2.5 text-white text-base focus:outline-none w-full"
                    required
                >
                    <option value="" disabled className="bg-[#4a2b99] text-white/50">
                        Select a category
                    </option>
                    {EXPENSE_CATEGORIES.map((cat) => (
                        <option
                            key={cat}
                            value={cat}
                            className="bg-[#4a2b99] text-white"
                        >
                            {cat}
                        </option>
                    ))}
                </select>
            )}

            <div className="flex w-full gap-8 mobile:flex-col tablet:flex-row">
                <div className="flex-1">
                    <input
                        type="number"
                        className={`w-full bg-transparent border-b border-white/30 py-2.5 text-base placeholder:text-white/50 focus:outline-none text-center`}
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
                        className="w-full bg-transparent border-b border-white/30 py-2.5 text-white text-base focus:outline-none text-center"
                    />
                </div>
            </div>

            <input
                type="text"
                className={`w-full bg-transparent border-b border-white/30 py-2.5 text-base placeholder:text-white/50 focus:outline-none`}
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
                    ADD
                </button>
                <button
                    type="button"
                    className="bg-white rounded-[20px] py-3 text-[#4a2b99] cursor-pointer transition-opacity hover:opacity-90"
                    onClick={onCancel}
                >
                    CANCEL
                </button>
            </div>
        </form>
    );
};

export default AddTransactionForm;