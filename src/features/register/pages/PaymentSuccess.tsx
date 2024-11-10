import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1>Payment Successful</h1>
            <p>Thank you for your purchase! Your payment has been processed successfully.</p>
            <Link to="/" style={styles.link}>Continue Shopping</Link>
            <Link to="/order-details" style={styles.link}>View Order Details</Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center' as 'center', // Ensuring correct typing for CSS values
        padding: '20px',
        backgroundColor: '#d4edda',
        color: '#155724',
        borderRadius: '8px',
        margin: '50px',
    },
    link: {
        margin: '10px',
        textDecoration: 'none',
        color: '#007bff',
    },
};

export default PaymentSuccess;
