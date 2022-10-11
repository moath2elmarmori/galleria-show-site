import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import "./Header.css";
import data from "../dataStore/data.json";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AnimationContext } from "../context/context-api";

const Header = () => {
  const location = useLocation();
  const ctx = useContext(AnimationContext);
  const { isSliding } = ctx;
  const imageId = location.pathname.split("/galleria/").join("");
  const navigate = useNavigate();
  const handleSlideShow = useCallback(() => {
    if (+imageId === data[data.length - 1].id) {
      return navigate("/galleria/1");
    }
    navigate(`/galleria/${+imageId + 1}`);
  }, [navigate, imageId]);

  const handleClickingSlideShow = () => {
    if (imageId === "/") {
      navigate("/galleria/1");
    }
    if (!isSliding) {
      ctx.nextClicked();
    }
    ctx.toggleSliding();
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSliding) {
        handleSlideShow();
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [handleSlideShow, isSliding, imageId, navigate]);

  return (
    <>
      <motion.header
        className="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 200 }}
      >
        <Link
          className="galleria"
          to="/"
          onClick={() => {
            if (isSliding) {
              ctx.toggleSliding();
            }
          }}
        >
          galleria.
        </Link>
        <p className="slide-show" onClick={handleClickingSlideShow}>
          {isSliding ? "STOP" : "START"} SLIDESHOW
        </p>
      </motion.header>
      <Outlet />
    </>
  );
};

export default React.memo(Header);
