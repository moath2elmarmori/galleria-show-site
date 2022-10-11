import React, { useContext } from "react";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import { AnimationContext } from "../context/context-api";

const overlayVariants = {
  initialState: {
    scale: 0.8,
    opacity: 0,
  },
  visibleState: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exitingState: {
    opacity: 0,
    transition: {
      duration: 0.5,
      delay: 0.25,
    },
  },
};

const ViewingImageDiv = (props) => {
  const ctx = useContext(AnimationContext);
  const handleClosing = () => {
    console.log("handling closing");
    ctx.toggleShowImage();
  };
  return (
    <motion.div
      className="overlay"
      variants={overlayVariants}
      initial="initialState"
      animate="visibleState"
      exit="exitingState"
    >
      <motion.div
        className="viewing-image-div"
        exit={{ x: "-100vw", transition: { duration: 0.5 } }}
      >
        <button onClick={handleClosing}>Close</button>
        <img src={props.palletObject.images.gallery} alt="" />
      </motion.div>
    </motion.div>
  );
};

const Modal = (props) => {
  // document.body.classList.add("no-scroll");
  return (
    <>
      {ReactDOM.createPortal(
        <ViewingImageDiv palletObject={props.palletObject} />,
        document.getElementById("overlay-container")
      )}
    </>
  );
};

export default Modal;
