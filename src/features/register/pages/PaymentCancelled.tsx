import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancelled: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1>Payment Cancelled</h1>
            <p>We're sorry, but your payment was cancelled.</p>
            <Link to="/" style={styles.link}>Return to Home</Link>
            <Link to="/payment" style={styles.link}>Retry Payment</Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center' as 'center', // Ensuring correct typing for CSS values
        padding: '20px',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        borderRadius: '8px',
        margin: '50px',
    },
    link: {
        margin: '10px',
        textDecoration: 'none',
        color: '#007bff',
    },
};

export default PaymentCancelled;
