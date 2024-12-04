import React from 'react';

const PaymentSuccess: React.FC = () => {
  //#TODO add phone compatiblity?
  return (
    <div>
      <div className="container">
        <h1>Betalningen Genomförd!</h1>
        <p>Tack så mycket för din registrering! Du ska ha fått ett mail över detaljer om ditt köp.</p>
        <p>Vi kommer skicka ut mer information löpande, följ gärna våran facebook och instagram för att inte missa någon nyhet!</p>
        <p>Pssssst... Kan du inte bärga dig till det är dags att springa? Kolla in förra årets video och annat skoj på vår Youtube kanal!</p>
        <div className="icon-container">
          <a
            href="https://www.facebook.com/your-facebook-page"
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
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/xiAz4cuyETY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>

  );
};

export default PaymentSuccess;
