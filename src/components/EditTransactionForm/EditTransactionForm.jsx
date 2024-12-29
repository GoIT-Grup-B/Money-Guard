import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransaction } from '../../redux/transaction/transactionOps';

const EditTransactionForm = ({ transaction, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(transaction);

    useEffect(() => {
        setFormData(transaction);
    }, [transaction]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTransaction({ transactionId: transaction.id, transactionData: formData }));
        onClose();
    };

    return (
        <div className="edit-transaction-form">
            <h2>Edit Transaction</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditTransactionForm;