import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <a
      className="btn btn-outline-danger float-right"
      {...props}
      target='_blank'
      role="button"
    >Delete Book</a>
  );
}

export default DeleteBtn;
