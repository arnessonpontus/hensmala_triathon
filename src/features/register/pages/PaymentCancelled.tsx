import React from 'react';
import { DEFAULT_CONTACT_EMAIL } from '../../../Constants';

const PaymentCancelled: React.FC = () => {
  return (
    <div className='redirect-page-container'>
      <h1>Betalningen Avbruten</h1>
      <p>Betalningen blev avbruten. Försök igen eller kontakta <strong>{DEFAULT_CONTACT_EMAIL}</strong> vid problem.</p>
    </div>
  );
};

export default PaymentCancelled;
