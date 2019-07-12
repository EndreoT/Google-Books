import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function ViewBtn(props) {
  return (
    <a
      className="btn btn-outline-info float-right"
      {...props}
      target='_blank'
      role="button"
    >View Book</a>
  );
}

export default ViewBtn;
