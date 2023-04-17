import React from "react";
import { Icon } from "@iconify/react";

import "../assets/css/components/footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__app">
        Shred Nepal<sup>TM</sup> 2023
      </div>
      <div className="footer__links">
        <span>Find Us On:</span>
        <a href="https://www.instagram.com/niravstha" target="_blank" rel="noreferrer"><Icon icon="mdi:instagram" /></a>
        <a href="https://www.youtube.com/@niravshrestha6448" target="_blank" rel="noreferrer"><Icon icon="mdi:youtube" /></a>
        <a href="mailto:sthanirav@gmail.com" target="_blank" rel="noreferrer"><Icon icon="material-symbols:mail" /></a>
      </div>
    </div>
  )
}

export default Footer;
