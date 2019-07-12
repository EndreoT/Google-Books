import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <a
      className="btn btn-outline-success float-right"
      {...props}
      target='_blank'
      role="button"
    >Save Book</a>
  );
}

export default SaveBtn;
