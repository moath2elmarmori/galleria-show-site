import React from "react";
import "./ImagesGrid.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import data from "../dataStore/data.json";
const appearFromWhereObject = {
  fromBottom: {
    y: 200,
    x: 0,
  },
  fromTop: {
    y: -200,
    x: 0,
  },
  fromLeft: {
    y: 0,
    x: -200,
  },
  fromRight: {
    y: 0,
    x: 200,
  },
};

const appearFromWhereOptions = [
  "fromBottom",
  "fromTop",
  "fromLeft",
  "fromRight",
];

const ImagesGrid = () => {
  const MotionLink = motion(Link);
  return (
    <motion.div
      className="images-grid"
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {data.map((obj) => {
        const randomNumberFromOneToTwo = Math.floor(Math.random() * 2) + 1;
        const randomNumberFromZeroToThree = Math.floor(Math.random() * 4);
        const randomPlacementObjectForIntiial =
          appearFromWhereObject[
            appearFromWhereOptions[randomNumberFromZeroToThree]
          ];
        return (
          <MotionLink
            to={`/galleria/${obj.id}`}
            className={`image-container span-${randomNumberFromOneToTwo}`}
            key={obj.id}
            initial={{ opacity: 0, ...randomPlacementObjectForIntiial }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 2 }}
          >
            <p className="name-of-pallet">{obj.name}</p>
            <p className="name-of-author">{obj.artist.name}</p>
            <img src={obj.images.gallery} alt="" />
          </MotionLink>
        );
      })}
    </motion.div>
  );
};

export default ImagesGrid;
