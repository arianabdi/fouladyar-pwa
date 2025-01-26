import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalHelper from "../../components/fouladyar/modal-helper/modalHelper";
import HeaderDoctor from "../../layout/header/Header-doctor";
import { Field } from "../../components/fouladyar/field/field";
import axios from "axios";

const PrivacyPolicy = () => {
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

                  <div className="paragraph">
                    Merci d'avoir choisi CLICONSULT! Cette politique de confidentialité décrit comment nous recueillons, utilisons et divulguons vos informations personnelles lorsque vous utilisez notre application web, ainsi que les choix qui s'y rapportent.
                  </div>
                  <div className="title">
                    1. Informations que nous recueillons
                  </div>
                  <div className="title">
                    1.1 Informations personnelles :
                  </div>

                  <div className="paragraph">
                    Nous pouvons recueillir des informations personnelles que vous nous fournissez directement (entre autres :  votre nom, vos coordonnées et d'autres détails nécessaires au bon fonctionnement de CLICONSULT).
                  </div>


                  <div className="title">
                    1.2 Données de rendez-vous :
                  </div>
                  <div className="paragraph">
                    nous recueillons des informations liées à vos rendez-vous, y compris les détails de planification, les durées de session et les statuts des rendez-vous.
                  </div>


                  <div className="title">
                    2. Comment nous utilisons vos informations
                  </div>
                  <div className="paragraph">
                    Nous utilisons les informations que nous recueillons à diverses fins, notamment :
                    <ul>
                      <li>
                        faciliter la planification et la gestion des rendez-vous,
                      </li>
                      <li>
                        fournir une vue en direct des rendez-vous planifiés,
                      </li>
                      <li>
                        analyser l'historique des rendez-vous pour améliorer nos services,
                      </li>
                      <li>
                        répondre aux demandes de renseignements et fournir un support client,
                      </li>
                    </ul>
                  </div>



                  <div className="title">
                    3. Sécurité des données
                  </div>
                  <div className="paragraph">
                    Nous accordons la priorité à la sécurité de vos données Nous avons également mis en place des mesures pour protéger contre tout accès, altération, divulgation ou destruction non autorisés de vos informations personnelles.
                  </div>

                  <div className="title">
                    4. Vos choix
                  </div>
                  <div className="paragraph">
                    Vous pouvez choisir de ne pas fournir certaines informations, mais cela peut limiter votre capacité à utiliser des fonctionnalités spécifiques de CLICONSULT.
                  </div>


                  <div className="title">
                    5. Cookies et technologies similaires
                  </div>
                  <div className="paragraph">
                    Nous pouvons utiliser des cookies et des technologies similaires pour améliorer votre expérience. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou certains cookies.
                  </div>

                  <div className="title">
                    6. Droits des utilisateurs
                  </div>
                  <div className="paragraph">
                    En tant qu'utilisateur de CLICONSULT, vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles.
                  </div>

                  <div className="title">
                    7. Conservation des données
                  </div>
                  <div className="paragraph">
                    Nous conserverons vos informations personnelles aussi longtemps que nécessaire aux fins décrites dans cette politique de confidentialité. Les critères utilisés pour déterminer la période de conservation incluent la nature des données et les fins pour lesquelles elles ont été recueillies. 
                  </div>

                  <div className="title">
                    8. Mises à jour de cette politique
                  </div>
                  <div className="paragraph">
                    Nous pouvons mettre à jour cette politique de confidentialité de temps à autre pour refléter des changements dans nos pratiques de données. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité mise à jour sur cette page.
                  </div>
                  <div className="title">
                    9. Contactez-nous
                  </div>
                  <div className="paragraph">
                    Si vous avez des questions sur cette politique de confidentialité, veuillez nous contacter à support@cliconsult.fr.
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

export default PrivacyPolicy;
