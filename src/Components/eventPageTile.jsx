import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { Chip, Stack } from "@mui/material";
import { setUserEvent, deleteUserEvent } from "../functions";
import "./components.css";
import { useTranslation } from "react-i18next";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const ShareModal = ({ link, name, isOpen, close }) => {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{t("Share")}</DialogTitle>
      <DialogContent>
        <div style={{ width: "70vw" }}>
          <Stack spacing={2}>
            <ShareButton
              ShareComponent={FacebookShareButton}
              icon={FacebookIcon}
              title="Facebook"
              url={link}
              name={name}
            />
            <ShareButton
              ShareComponent={TwitterShareButton}
              icon={XIcon}
              title="X"
              url={link}
              name={name}
            />
            <ShareButton
              ShareComponent={WhatsappShareButton}
              icon={WhatsappIcon}
              title="WhatsApp"
              url={link}
              name={name}
            />
            <ShareButton
              ShareComponent={EmailShareButton}
              icon={EmailIcon}
              name={name}
              title="Email"
              url={link}
            />
          </Stack>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          {t("Close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ShareButton = ({ ShareComponent, icon: Icon, name, title, url }) => (
  <ShareComponent
    url={url}
    title={name}
    style={{ display: "flex", alignItems: "center" }}
  >
    <Icon size={32} round />
    <Typography variant="body1" style={{ marginLeft: "8px" }}>
      {title}
    </Typography>
  </ShareComponent>
);

const RecipeReviewCard = ({
  duration,
  price,
  nickname,
  last_name,
  first_name,
  location,
  name,
  date,
  description,
  photo,
  categories,
  id,
  unsigned,
  refresh,
  isPC,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ padding: "10px" }}>
      <Card sx={{ width: isPC ? "90vw" : 345 }}>
        <CardHeader title={name} subheader={date} />
        <CardMedia
          component="img"
          height={isPC ? "300px" : 194}
          image={photo}
          alt="alt"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          {categories && (
            <div className="categories">
              {categories.map((category) => (
                <Chip key={category} label={t(category)} variant="outlined" />
              ))}
            </div>
          )}
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {`${t("Organizer")}: ${nickname}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {`${t("Price")}: ${price}`}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            {`${t("Duration")}: ${duration} h`}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "auto" }}>
          <IconButton aria-label="share" onClick={() => setIsOpen(true)}>
            <ShareIcon />
          </IconButton>

          {unsigned && (
            <Button
              fullWidth
              variant="contained"
              aria-label="add to favorites"
              onClick={async () => {
                await setUserEvent(id);

                await refresh();
              }}
            >
              {t("Sign in")}
            </Button>
          )}
        </CardActions>
      </Card>
      <ShareModal
        name={name}
        link={`${window.location.href}`}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      />
    </div>
  );
};
export default RecipeReviewCard;
