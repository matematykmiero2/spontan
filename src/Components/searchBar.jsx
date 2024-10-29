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
  Select,
  MenuItem,
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
  const [radius, setRadius] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategories();
      setCategories(categories);
    }
    fetchCategories();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleApplyFilters = async () => {
    let bounds;
    if (radius) {
      if (userLocation) {
        const lat = userLocation.lat;
        const lng = userLocation.lng;

        const latOffset = 0.009;
        const lngOffset = 0.009;

        bounds = {
          north: lat + latOffset * radius,
          south: lat - latOffset * radius,
          east: lng + lngOffset * radius,
          west: lng - lngOffset * radius,
        };
      } else {
        console.log("User location is not available.");
      }
    } else {
      bounds = undefined;
    }

    setEvents(
      await filterEvents(selectedCategories, startDate, endDate, bounds)
    );
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

          <FormControl fullWidth margin="normal">
            <InputLabel>{t("Search Radius (km)")}</InputLabel>
            <Select value={radius} onChange={(e) => setRadius(e.target.value)}>
              <MenuItem value="">
                <em>{t("None")}</em>
              </MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
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
