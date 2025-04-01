import React from 'react';
import { PrimaryButton } from '../../../components/Button/PrimaryButton';
import { Link } from 'react-router-dom';
import { FillCenterLayout } from '../../../components/FillCenterLayout';

const PaymentSuccess: React.FC = () => {
  return (
    <FillCenterLayout>
      <div className="redirect-page-container successful">
        <h1>Betalningen Genomförd!</h1>
        <p>Tack så mycket för din registrering! Du ska ha fått ett mail över detaljer om ditt köp.</p>
        <p>Vi kommer skicka ut mer information löpande, följ gärna våran facebook och instagram för att inte missa någon nyhet!</p>
        <p>Pssssst... Kan du inte bärga dig till det är dags att springa? Kolla in förra årets video och annat skoj på vår Youtube kanal!</p>
        <div className="icon-container">
          <a
            href="https://www.facebook.com/61557863443816"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <i className="fa fa-facebook-square icon facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/hensmalatriathlon"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <i className="fa fa-instagram icon instagram" ></i>
          </a>
          <a
            href="https://www.youtube.com/@lennartarnesson694"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <i className="fa fa-youtube-play icon youtube"></i>
          </a>
        </div>
      </div>
        <Link style={{textDecoration: "none"}} to="/anmalan">
          <PrimaryButton>Anmäl fler personer <i className="fas fa-arrow-right" style={{color: "white"}}></i></PrimaryButton>
        </Link>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/watch?v=ZLqLqEJarTA"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </FillCenterLayout>
  );
};

export default PaymentSuccess;
