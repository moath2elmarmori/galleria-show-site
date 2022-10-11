import React from "react";
import data from "../dataStore/data.json";
import { GiNextButton, GiPreviousButton } from "react-icons/gi";

import "./PalletFooter.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AnimationContext } from "../context/context-api";

const PalletFooter = ({ palletId }) => {
  const ctx = useContext(AnimationContext);
  const navigate = useNavigate();
  const palletObject = data.find((obj) => obj.id === +palletId);
  const widthOfPalletBar = (+palletId * 100) / data.length;

  const handleClickingPrev = () => {
    ctx.previousClicked();
    if (+palletId === data[0].id) {
      return navigate(`/galleria/${data[data.length - 1].id}`);
    }
    navigate(`/galleria/${+palletId - 1}`);
  };
  const handleClickingNext = () => {
    ctx.nextClicked();
    if (+palletId === data[data.length - 1].id) {
      return navigate("/galleria/1");
    }
    navigate(`/galleria/${+palletId + 1}`);
  };
  return (
    <div className="pallet-footer">
      <div className="pallets-progress-bar-container">
        <div
          className="pallets-progress-bar"
          style={{ width: `${widthOfPalletBar}%` }}
        ></div>
      </div>
      <div className="footer-functionality">
        <div className="pallet-info">
          <h2>{palletObject.name}</h2>
          <p>{palletObject.artist.name}</p>
        </div>
        <div className="next-prev-div">
          <div className="prev-div" onClick={handleClickingPrev}>
            <GiPreviousButton />
          </div>
          <div className="next-div" onClick={handleClickingNext}>
            <GiNextButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PalletFooter;
