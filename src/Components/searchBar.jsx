import React from "react";
import "./searchbar.css";
import { IconButton } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useTranslation } from "react-i18next";
const searchBar = () => {
  const { t } = useTranslation();
  return (
    <>
      <div class="fixed-search-bar">
        <div className="search-bar">
          <input classname="search-input" placeholder={t("Search...")} />
          <IconButton color="primary">
            <TuneIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
export default searchBar;
