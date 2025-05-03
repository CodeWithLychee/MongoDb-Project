import React from "react";
import TopBar from "../Components/TopBar";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div>
      <TopBar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
