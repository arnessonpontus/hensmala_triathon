import React, { Component } from "react";
import { NavLink as RRNavLink } from "react-router-dom";

class GenerealInfo extends Component {
  render() {
    return (
      <>
        <p>
          I det fina småländska landskapet arrangeras årligen ett
          minitriathlon till förmån för ALS-forskningen. Alla sträckor
          är anpassade till den vackra Stora Hensjön och Hensmålas
          landskap.
        </p>
        <b>Vart går pengarna?</b>
        <p>
          Sedan 2012 har vi nu samlat in över 1 000 000kr och skänkt
          till ALS-forskningen. Pengarna har igenom åren gått till olika organisationer men de senaste åren har gåvan riktats
          mot Stoppa ALS och ALS Treatment Center Karolinska. I år ger vi hälften av överskottet till Stoppa ALS och andra hälften till Börje Salmings ALS Stiftelse.
        </p>
        <p>Hit ska pengarna gå i år.</p>
        <ul class="donation-list">
          <li>
            50% till <a
              href="https://stoppaals.se/index.php"
              target="_blank"
              rel="noopener noreferrer"
            >Stoppa ALS</a>
          </li>
          <li>
            50% till <a
              href="https://www.borjesalmingstiftelse.se/forskning/tilldelning-av-forskningsmedel"
              target="_blank"
              rel="noopener noreferrer"
            >Börje Salmings ALS Stiftelse</a>
          </li>
        </ul>

        <p>
          Här är lite blandade länkar till artiklar som beskriver var vi har gett tidigare år. Fler artiklar hittar du på
          <RRNavLink
            rel="noopener noreferrer"
            to="/artiklar"
          > Artiklar
          </RRNavLink>.
        </p>
        <ul class="donation-list">
          <li>
            <a
              href="/images/articleImages/2016/nya_allehanda_nr10_2016.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >2018 överlämnande</a> på Neuros kansli
          </li>
          <li>
            <a
              href="/images/articleImages/2017/neuroforbundet-halv_neuromiljon_till_ingres_als-forskning_med_hensmalas_stod.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >2017 överlämnande</a> till Caroline Ingre, neurologläkare på Karolinska sjukhuset
          </li>
          <li>
            <a
              href="/images/articleImages/2016/nya_allehanda_nr10_2016.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >2016 överlämnande</a> till Lise Lidbäck, ordförande på Neruoförbundet
          </li>
          <li>Skapa gärna en insamling under
            <a
              href="https://egnainsamlingar.neuro.se/projects/neuro-10"
              target="_blank"
              rel="noopener noreferrer"
            > vårt projekt </a> på Neuros hemsida
          </li>
        </ul>

        <b>Vad finns att göra på hensmåla Triathlon?</b>
        <p>
          Hensmåla Triathlon är en folkfest där publiken är grunden till den goda stämningen. Det kommer finnas bland annat mat i form av grillad korv, fika, lotteri och musik på plats. Kom gärna och heja på!
        </p>
      </>
    );
  }
}

export default GenerealInfo;
