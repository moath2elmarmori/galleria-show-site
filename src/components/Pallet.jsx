import React, { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationContext } from "../context/context-api";
import { CgMaximizeAlt } from "react-icons/cg";
import "./Pallet.css";

import data from "../dataStore/data.json";
import Modal from "./Modal";

const Pallet = ({ palletId }) => {
  // const MotionModal = motion(Modal);
  const ctx = useContext(AnimationContext);
  const [renderSmallImage, setRenderSmallImage] = useState(false);
  // const [viewImage, setViewImage] = useState(false);
  console.log("rendering pallet");
  window.addEventListener("resize", (e) => {
    if (e.target.innerWidth <= 541) {
      setRenderSmallImage(true);
    }
  });
  const palletObject = data.find((obj) => obj.id === +palletId);
  const handleViewImage = () => {
    console.log("clicked the view image");
    ctx.toggleShowImage();
    console.log(ctx);
  };
  return (
    <motion.div
      className="pallet-container"
      exit={{
        x: ctx.howToAnimate.exitingElementAnimateTo,
        transition: "easeInOut",
        opacity: 0,
      }}
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: ctx.howToAnimate.enteringElementAnimateFrom, opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence>
        {ctx.viewImage && (
          // <motion.div exit={{ x: -200 }} transition={{ duration: 2 }}>
          <Modal palletObject={palletObject} />
          // </motion.div>
        )}
      </AnimatePresence>

      <div className="photos-side">
        <div className="name-and-author-of-pallet-div">
          <h1 className="name-of-pallet">{palletObject.name}</h1>
          <p className="name-of-author">{palletObject.artist.name}</p>
        </div>
        <div className="pallet-image-div">
          <img
            src={
              renderSmallImage
                ? palletObject.images.hero.small
                : palletObject.images.gallery
            }
            alt=""
          />
          <motion.div
            className="view-image-div"
            onClick={handleViewImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <CgMaximizeAlt />
            <p>View Image</p>
          </motion.div>
        </div>
        <div className="author-image-div">
          <img src={palletObject.artist.image} alt="" />
        </div>
      </div>
      <div className="info-side">
        <h1 className="published-year">{palletObject.year}</h1>
        <p className="pallet-description">{palletObject.description}</p>
        <a href={palletObject.source} target="_blank" rel="noreferrer">
          GO TO SOURCE
        </a>
      </div>
    </motion.div>
  );
};

export default Pallet;
