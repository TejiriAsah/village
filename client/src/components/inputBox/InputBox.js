import React from "react";
import "./inputBox.scss";

// const InputBox = (props) => {
//   return (
//     <>
//       {/* <label className="input__label">{props.label}</label> */}
//       <input type="text" className="input__field" />
//     </>
//   );
// };

const InputBox = (props) => {
  return (
    <>
      <input type="text" className="bob" placeholder={props.placeholder} />
    </>
  );
};

export default InputBox;
