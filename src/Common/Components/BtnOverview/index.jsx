import React from 'react'
import { useTranslation } from "react-i18next";
import imgEN from '../../../Assets/img/en.png'
import imgES from '../../../Assets/img/es.png'

const BtnOverview = () => {
   const { i18n } = useTranslation();

   /* var url = window.location.href.split('/')[3]; */
   var urlInvite = window.location.href.split('/')[5];
   const lang = i18n.language;

   var text = "";
   var desc = "";
   var linkBtn = ""
   var btn = "";
   var video = "";
   var tbm = null;
   var close_text = ""

   if (lang === "es") {
      text = "Visión General";
      desc = "Crea lanzamientos a través de grupos de whatsapp y programa los contenidos en el día y hora que deseas."
      linkBtn = "https://kbspanish.builderallwp.com/?docs=whatsapp-launch-manager-administrador-de-lanzamientos-whatsapp";
      btn = "Más Información";
      video = "https://videomng.builderall.com/embed/yL6NYRzUZI/?controls=1&allowpause=1";
      tbm = imgES;
      close_text = "Cerrar Pantalla Completa"
   } if (lang === "en") {
      text = "Overview";
      desc = "Create launches through WhatsApp groups and schedule the contents whenever you want."
      linkBtn = "";
      btn = "More Info";
      video = "https://videomng.builderall.com/embed/menjkaa3sx/?controls=1&allowpause=1";
      tbm = imgEN;
      close_text = "Close Fullscreen"

   }


   return (
      <div>
         {urlInvite !== "invite" ? <div>{lang === "es" || lang === "en" ? <btn-overview
            data-btn-text={text}
            data-box-opened="0"
            data-box-description={desc}
            data-box-button-text={btn}
            data-box-button-link={linkBtn}
            data-box-thumb={tbm}
            data-modal-opened="0"
            data-modal-close-text={close_text}
            data-modal-video-url={video}
         >
         </btn-overview> : <div></div>}</div>
            : <div> </div>
         }


      </div>
   );
}

export default BtnOverview;