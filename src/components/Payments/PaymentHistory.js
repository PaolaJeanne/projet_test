import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiClient from '../../services/api';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            apiClient.get('/payments/')
                .then(response => setPayments(response.data))
                .catch(error => console.error('Error fetching payments', error));
        }
    }, [currentUser]);

    return (
        <div>
            <h2>Historique des paiements</h2>
            <ul>
                {payments.map(payment => (
                    <li key={payment.id}>
                        {payment.amount} € - {new Date(payment.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentHistory;