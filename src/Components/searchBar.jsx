import React from "react";
import "./searchbar.css";
import { IconButton } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
const searchBar = () => {
  return (
    <>
      <div class="fixed-search-bar">
        <div className="search-bar">
          <input classname="search-input" placeholder="Search..." />
          <IconButton color="primary">
            <TuneIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
export default searchBar;
