import React from "react";
import { Couverture } from "../../lina-14-etages/commun/Couverture";

// Couverture de « Devant tout le monde », épisode 1.
export const CouvertureDTLM01: React.FC = () => (
  <Couverture fond="ia/devant-tout-le-monde/couverture-ep01-fond.jpg" episode={1} serie="DEVANT TOUT LE MONDE" tailleSerie={64} accent="#E2B65B" question={"Pourquoi t'as\u00a0ma\u00a0bague\u00a0?"} sous="Team Explication ou team Sœurs · A ou B" />
);
