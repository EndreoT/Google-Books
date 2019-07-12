import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <button
      className="btn btn-outline-success float-right"
      {...props}
      target='_blank'
    >{props.children}</button>
  );
}

export default SaveBtn;
