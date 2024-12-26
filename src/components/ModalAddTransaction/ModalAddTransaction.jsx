import React from 'react';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';

const ModalAddTransaction = ({ onClose, onSubmit }) => {
    return (
        <>
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
                onClick={onClose}
            />

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-gradient-to-b from-[#4a2b99] to-[#2a1357] 
                rounded-md p-8 w-full max-w-[540px] 
                shadow-lg shadow-black/20 flex flex-col justify-center items-center
                z-20">

                <button
                    className="absolute top-4 right-4 bg-transparent border-none text-white text-xl cursor-pointer"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className="text-white text-center mb-6 text-2xl">
                    Add transaction
                </h2>

                <AddTransactionForm onSubmit={onSubmit} onCancel={onClose} />
            </div>
        </>
    );
};

export default ModalAddTransaction;
