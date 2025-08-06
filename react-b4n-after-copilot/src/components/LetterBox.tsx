import React from "react";
import "./LetterBox.css";

interface LetterBoxProps {
  letter: string; // single ASCII character
  visible: boolean;
}

const LetterBox: React.FC<LetterBoxProps> = ({ letter, visible }) => {
  return (
    <div className={`letter-box${visible ? " visible" : " hidden"}`}>
      {visible ? letter : ""}
    </div>
  );
};

export default LetterBox;