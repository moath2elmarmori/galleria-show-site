import React from "react";
import { useParams } from "react-router-dom";
import Pallet from "../components/Pallet";
import PalletFooter from "../components/PalletFooter";
import data from "../dataStore/data.json";

const PalletPage = () => {
  const params = useParams();
  const palletObject = data.find((obj) => obj.id === +params.imageId);

  if (!palletObject) {
    return (
      <h1 className="error-heading">There is not a pallet id like this one</h1>
    );
  }
  return (
    <>
      <Pallet palletId={params.imageId} />
      <PalletFooter palletId={params.imageId} />
    </>
  );
};

export default PalletPage;
