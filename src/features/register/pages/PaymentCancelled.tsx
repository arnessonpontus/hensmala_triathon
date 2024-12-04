import React from 'react';
import { DEFAULT_CONTACT_EMAIL } from '../../../Constants';

const PaymentCancelled: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>Betalningen Avbruten</h1>
      <p>Betalningen blev avbruten. Försök igen eller kontakta <strong>{DEFAULT_CONTACT_EMAIL}</strong> vid problem.</p>
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
