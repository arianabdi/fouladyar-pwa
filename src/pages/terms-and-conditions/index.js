import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import { Field } from "../../components/fouladyar/field/field";
import axios from "axios";

const TermsAndConditions = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const [youAre, setYouAre] = useState("doctor");
  const [data, setData] = useState({
  });








  return (
    <React.Fragment>
      <ModalHelper
        size={"sm"}
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
        component={modalComponent}
      />

      <HeaderDoctor title={"Conditions générales"} />
      <div className="nk-content ">
        <div className="container-fluid-doctor">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block">
                <div className="container terms-and-conditions">
                    <div className="header">
                      Conditions Générales pour l'Application de Prendre un rendez-vous consultation d’urgence médicale CLICONSULT :
                    </div>
                    <div className="title">
                      1. Introduction
                    </div>
                    <div className="paragraph">
                      Bienvenue sur CLICONSULT Ces Conditions Générales définissent les termes et conditions régissant votre utilisation de notre application pour la prise de rendez-vous médical. En utilisant notre application, vous acceptez de vous conformer à ces conditions. Veuillez les lire attentivement.
                      <br/><br/>
                      Le Service CLICONSULT est proposé via le site internet " https://cliconsult.fr " et les applications CLICONSULT et CLICONSULT PRO sont accessibles gratuitement.
                      <br/><br/>
                      Une application qui permet, après inscription, à des personnes physiques majeures٫ de rentrer, par son intermédiaire, en relation avec des professionnels de santé qui sont également inscrits ou au moins répertoriés sur l’application dans le but de donner des rendez-vous pour des consultations d’urgence médicale
                      <br/><br/>
                      Remarque importante : les fonctions de recherche de professionnels de santé et de prise de rendez-vous ne sont pas un dispositif d'urgence vitale. Si la vie ou la santé de l'utilisateur ou d'un tiers est en danger, contactez le 15.
                      <br/> <br/>
                    </div>

                    <div className="title">
                      2. Protection des Données et Confidentialité
                    </div>
                    <div className="title">
                      2.1 Conformité avec le RGPD
                    </div>
                    <div className="paragraph">
                      Nous nous engageons à protéger votre vie privée et à assurer la sécurité de vos données personnelles. Nos pratiques sont conformes au Règlement Général sur la Protection des Données (RGPD) et aux autres lois applicables en matière de protection des données.
                      Le Service CLICONSULT est proposé via le site internet " https://cliconsult.fr " et les applications CLICONSULT et CLICONSULT PRO sont accessibles gratuitement.
                    </div>

                    <div className="title">
                      2.2 Collecte et Objectif des Données
                    </div>
                    <div className="paragraph">
                      Nous collectons et traitons des données personnelles uniquement dans le but de fournir nos services de planification médicale. Les données collectées peuvent inclure, sans s'y limiter :
                       - Informations sur les patients (nom, coordonnées),
                       - Détails sur les prestataires de soins de santé,
                       - Programmes de rendez-vous.
                    </div>

                    <div className="title">
                      2.3 Consentement de l'Utilisateur
                    </div>
                    <div className="paragraph">
                      En utilisant notre application, vous consentez explicitement à la collecte, au traitement et au stockage de vos données personnelles telles que décrites dans notre Politique de Confidentialité.
                    </div>

                    <div className="title">
                      2.4 Sécurité des Données
                    </div>
                    <div className="paragraph">
                      Nous utilisons des mesures de sécurité conformes aux normes de l'industrie pour protéger vos données personnelles contre tout accès, divulgation, altération et destruction non autorisés.
                    </div>

                    <div className="title">
                      3. Droits de l'Utilisateur
                    </div>

                    <div className="title">
                      3.1 Accès et Correction
                    </div>
                    <div className="paragraph">
                      Vous avez le droit d'accéder à vos données personnelles et de les corriger dans notre application. Vous pouvez le faire en suivant [fournir des instructions sur la manière dont les utilisateurs peuvent accéder et modifier leurs données].
                    </div>

                    <div className="title">
                      3.2 Portabilité des Données
                    </div>
                    <div className="paragraph">
                      Vous avez le droit de recevoir une copie de vos données personnelles dans un format structuré, couramment utilisé et lisible par machine.
                    </div>

                    <div className="title">
                      3.3 Suppression
                    </div>
                    <div className="paragraph">
                      Vous pouvez demander la suppression de vos données personnelles, et nous nous y conformerons, à moins qu'il n'y ait des raisons légales de conserver certaines informations.
                    </div>

                    <div className="title">
                      4. Base Juridique du Traitement
                    </div>
                    <div className="paragraph">
                      Notre traitement des données personnelles est basé sur la nécessité de l'exécution d'un contrat, le respect des obligations légales et des intérêts légitimes poursuivis par CLICONSULT
                    </div>

                    <div className="title">
                      5. Cookies et Technologies de Suivi
                    </div>
                    <div className="paragraph">
                      Nous utilisons des cookies et des technologies de suivi similaires pour améliorer votre expérience utilisateur. En utilisant notre application, vous consentez à l'utilisation de cookies telle que décrite dans notre Politique de Cookies.
                    </div>

                    <div className="title">
                      6. Modifications des Conditions Générales
                    </div>
                    <div className="paragraph">
                      Nous nous réservons le droit de modifier ces Conditions Générales à tout moment. Les changements seront effectifs immédiatement après leur publication. Nous vous informerons de tout changement substantiel.
                    </div>

                    <div className="title">
                      7. Informations de Contact
                    </div>
                    <div className="paragraph">
                      Si vous avez des questions ou des préoccupations concernant ces Conditions Générales ou nos pratiques en matière de données, veuillez nous contacter sur support@cliconsult.fr
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
};

export default TermsAndConditions;
