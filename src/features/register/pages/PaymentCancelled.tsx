import React from 'react';
import { DEFAULT_CONTACT_EMAIL } from '../../../Constants';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../../../components/Button/PrimaryButton';
import { FillCenterLayout } from '../../../components/FillCenterLayout';

const PaymentCancelled: React.FC = () => {
  return (
    <FillCenterLayout>
      <div className='redirect-page-container cancelled'>
        <h1>Betalningen Avbruten</h1>
        <p>Betalningen blev avbruten. Försök igen eller kontakta <strong>{DEFAULT_CONTACT_EMAIL}</strong> vid problem.</p>
      </div>
      <Link style={{ textDecoration: "none" }} to="/anmalan">
        <PrimaryButton>Försök igen</PrimaryButton>
      </Link>
    </FillCenterLayout>
  );
};

export default PaymentCancelled;
