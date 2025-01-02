import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
import { addTransaction, getCategories } from '../../redux/transaction/transactionOps';

const ButtonAddTransactions = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await dispatch(getCategories()).unwrap();
                const categoryMap = result.reduce((acc, category) => {
                    acc[category.name] = category.id;
                    return acc;
                }, {});
                setCategories(categoryMap);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, [dispatch]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (transactionData) => {
        try {
            const formattedData = {
                transactionDate: transactionData.date,
                type: transactionData.type.toUpperCase(),
                categoryId: transactionData.type === 'income'
                    ? categories['Income']
                    : categories[transactionData.category],
                comment: transactionData.comment,
                amount: transactionData.type === 'income'
                    ? transactionData.amount.toString()
                    : `-${transactionData.amount.toString()}`
            };


            const response = await dispatch(addTransaction(formattedData)).unwrap();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to add transaction:', error);
        }
    };

    return (
        <>
            <button
                onClick={handleOpenModal}
                className="fixed bottom-5 right-5 flex items-center justify-center w-11 h-11 
                    bg-gradient-to-r from-[#ff9a3c] to-[#ff6b6b] 
                    rounded-full shadow-lg cursor-pointer 
                    transition-transform hover:scale-110"
            >
                <span className="text-white text-2xl font-bold">+</span>
            </button>

            {isModalOpen && (
                <ModalAddTransaction
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};

export default ButtonAddTransactions;
