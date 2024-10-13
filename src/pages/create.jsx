import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Multiselect from "../Components/multiselect";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useNavigate } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import Checkbox from "@mui/material/Checkbox";
import {
  set_event_categories,
  getUserLocations,
  addEvent,
  addLocation,
  getAllCategories,
} from "../functions";
import LoadPhoto from "../Components/loadPhoto";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateEvent = () => {
  const [locations, setLocations] = useState([]);
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const [newLocation, setNewLocation] = useState({
    city: "",
    street: "",
    number: "",
    apartment: "",
    postalCode: "",
  });
  const [newEvent, setNewEvent] = useState({
    public: true,
    location_id: "",
    duration: "",
    price: 0,
    max_participants: "",
    name: "",
    description: "",
    start_time: "",
    photo: "",
  });
  const [open, setOpen] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);
  useEffect(() => {
    async function fetchLocations() {
      const userLocations = await getUserLocations();
      setLocations(userLocations);
      const categories = await getAllCategories();
      setCategories(categories);
    }
    fetchLocations();
  }, []);

  const handleEventInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLocationChange = (event) => {
    console.log(event.target.value);
    setNewEvent((prev) => ({
      ...prev,
      location_id: event.target.value,
    }));
  };

  const handleLocationInputChange = (event) => {
    const { name, value } = event.target;
    setNewLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEventSubmit = async () => {
    if (validateEvent(newEvent)) {
      const newId = await addEvent(newEvent, locations);
      if (newId) {
        await set_event_categories(newId, selectedCategories);
        navigate(`/event/${newId}`);
      }
    } else {
      alert(t("Please fill out all required fields."));
    }
  };
  const validateEvent = (event) => {
    if (selectedCategories.length < 1) return false;
    const requiredFields = [
      "public",
      "location_id",
      "duration",
      "price",
      "name",
      "description",
      "start_time",
      "photo",
    ];

    for (let field of requiredFields) {
      if (event[field] === "") {
        return false;
      }
    }

    return true;
  };
  const handleLocationSubmit = async () => {
    handleClose();
    await addLocation(newLocation);
    const userLocations = await getUserLocations();
    setLocations(userLocations);
  };
  const handlePhotoSubmit = (url) => {
    setNewEvent((prev) => ({
      ...prev,
      photo: url,
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenPhoto = () => setOpenPhoto(true);
  const handleClosePhoto = () => setOpenPhoto(false);

  return (
    <div className="page">
      <Box sx={{ paddingInline: 5, paddingBlockEnd: 5, overflow: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("Create New Event")}
        </Typography>
        <Grid container spacing={2}>
          {locations && (
            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth>
                <InputLabel id="location-select-label">
                  {" "}
                  {t("Location")}
                </InputLabel>

                <Select
                  labelId="location-select-label"
                  id="location-select"
                  value={newEvent.location_id}
                  label={t("Location")}
                  onChange={handleLocationChange}
                >
                  {locations.map((item, index) => (
                    <MenuItem key={index} value={index}>
                      {`${item.city} ${item.street} ${item.number} ${item.apartment}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpen}
              sx={{ height: "100%", width: "100%" }}
            >
              {t("Add New Location")}
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={t("Name")}
              name="name"
              value={newEvent.name}
              onChange={handleEventInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("Description")}
              name="description"
              value={newEvent.description}
              onChange={handleEventInputChange}
              fullWidth
              required
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("Start Time")}
              name="start_time"
              type="datetime-local"
              value={newEvent.start_time}
              onChange={handleEventInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl required>
              <Stack>
                {t("Public")}
                <Switch
                  id="public-toggle"
                  name="public"
                  checked={newEvent.public}
                  onChange={handleEventInputChange}
                />
              </Stack>
            </FormControl>
            <Multiselect
              categories={categories}
              selectedCategories={selectedCategories}
              selectCategory={setSelectedCategories}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={`${t("Duration")} [h]`}
              name="duration"
              type="number"
              value={newEvent.duration}
              onChange={handleEventInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("Price")}
              name="price"
              type="number"
              value={newEvent.price}
              onChange={handleEventInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("Photo URL")}
              name="photo"
              value={newEvent.photo}
              onChange={handleEventInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenPhoto}
              sx={{ height: "100%", width: "100%" }}
            >
              {t("Upload photo")}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("Max Participants")}
              name="max_participants"
              type="number"
              value={newEvent.max_participants}
              onChange={handleEventInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEventSubmit}
              fullWidth
            >
              {t("Submit Event")}
            </Button>
          </Grid>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              {t("Add New Location")}
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="City"
                name="city"
                value={newLocation.city}
                onChange={handleLocationInputChange}
                fullWidth
              />
              <TextField
                label="Street"
                name="street"
                value={newLocation.street}
                onChange={handleLocationInputChange}
                fullWidth
              />
              <TextField
                label="Number"
                name="number"
                value={newLocation.number}
                onChange={handleLocationInputChange}
                fullWidth
              />
              <TextField
                label="Apartment"
                name="apartment"
                value={newLocation.apartment}
                onChange={handleLocationInputChange}
                fullWidth
              />
              <TextField
                label="Postal Code"
                name="postalCode"
                value={newLocation.postalCode}
                onChange={handleLocationInputChange}
                fullWidth
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={handleLocationSubmit}
                fullWidth
              >
                {t("Add location")}
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Modal
          open={openPhoto}
          onClose={handleClosePhoto}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              {t("Upload photo")}
            </Typography>
            <Stack spacing={2}>
              <LoadPhoto handlePhotoSubmit={handlePhotoSubmit} />
            </Stack>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default CreateEvent;
