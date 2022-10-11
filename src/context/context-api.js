import { createContext, useState } from "react";

const contextValue = {
  howToAnimate: {
    exitingElementAnimateTo: "-100vw",
    enteringElementAnimateFrom: "100vw",
  },
  previousClicked: () => {
    return (contextValue.howToAnimate = {
      exitingElementAnimateTo: "100vw",
      enteringElementAnimateFrom: "-100vw",
    });
  },
  nextClicked: () => {
    return (contextValue.howToAnimate = {
      exitingElementAnimateTo: "-100vw",
      enteringElementAnimateFrom: "100vw",
    });
  },
  viewImage: false,
  toggleShowImage: () => {},
  isSliding: false,
  toggleSliding: () => {},
};

export const AnimationContext = createContext(contextValue);

const AnimationContextProvider = ({ children }) => {
  const [viewingImageState, setViewingImageState] = useState(false);
  const [isSlidingState, setIsSlidingState] = useState(false);
  const contextVal = {
    ...contextValue,
    viewImage: viewingImageState,
    toggleShowImage: () => {
      console.log("toggling show image");
      console.log(contextVal);
      document.body.classList.toggle("no-scroll");
      setViewingImageState((prevState) => {
        return !prevState;
      });
      setIsSlidingState(false);
    },
    isSliding: isSlidingState,
    toggleSliding: () => {
      setIsSlidingState((prevState) => {
        return !prevState;
      });
    },
  };
  return (
    <AnimationContext.Provider value={contextVal}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationContextProvider;
