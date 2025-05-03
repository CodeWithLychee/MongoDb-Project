import React from "react";
import Button1 from "./Second/Button";
import Button2 from "./Third/Button";
import AddNewMovie from "./First/AddNewMovie";
import Button3 from "./Fourth/Button";
import Button4 from "./Fifth/Button";
import Button6 from "./Sixth/Button";

function UpdateQueries() {
  return (
    <div className="mt-24">
      <AddNewMovie />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button6 />
    </div>
  );
}

export default UpdateQueries;
