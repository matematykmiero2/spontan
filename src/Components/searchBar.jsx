import React, { useRef, useState, useEffect } from "react";
import "../Components/components.css";
import EventList from "../Components/list";
import { getAllEvents, search } from "../functions";
import Multiselect from "../Components/multiselect";
import SearchIcon from "@mui/icons-material/Search";
import "../Components/searchbar.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getAllCategories, filterEvents } from "../functions";
import TuneIcon from "@mui/icons-material/Tune";
import { useTranslation } from "react-i18next";

const SearchBar = React.memo(({ onSearch, inputRef, setEvents }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleApplyFilters = async () => {
    setEvents(await filterEvents(selectedCategories, startDate, endDate));

    handleCloseModal();
  };

  return (
    <div className="fixed-search-bar">
      <div className="search-bar">
        <input
          className="search-input"
          placeholder={t("Search...")}
          onChange={onSearch}
          ref={inputRef}
        />
        <IconButton color="primary" onClick={onSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton color="primary" onClick={handleOpenModal}>
          <TuneIcon />
        </IconButton>
      </div>
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t("Filter Options")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("Start Date")}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label={t("End Date")}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl fullWidth margin="normal">
            <Multiselect
              categories={categories}
              selectedCategories={selectedCategories}
              selectCategory={setSelectedCategories}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            {t("Close")}
          </Button>
          <Button onClick={handleApplyFilters} color="primary">
            {t("Apply")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default SearchBar;
