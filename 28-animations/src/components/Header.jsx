import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {/*this component allows animating before removing from dome*/}
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          onClick={handleStartAddNewChallenge}
          className="button"
          whileHover={{ scale: 1.1, rotate: 3, backgroundColor: "#8b11f0" }}
          transition={{ type: "spring", stiffness: 250, mass: 3 }}
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
