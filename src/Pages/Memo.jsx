import React from "react";

export default React.memo(function Memo() {
  console.log("Child Memo Call");
  return <div>Memo</div>;
});
