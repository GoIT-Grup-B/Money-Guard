import React, { useState } from 'react';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';

const ButtonAddTransactions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (transactionData) => {
        // Here you would typically dispatch an action to add the transaction
        console.log('Transaction data:', transactionData);
        handleCloseModal();
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
