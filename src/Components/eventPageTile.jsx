import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Chip } from "@mui/material";
import { setUserEvent, deleteUserEvent } from "../functions";
import "./components.css";
import { useTranslation } from "react-i18next";
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
}) => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: "10px" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={name} subheader={date} />
        <CardMedia component="img" height="194" image={photo} alt="alt" />
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
          <IconButton
            aria-label="add to favorites"
            onClick={() => setUserEvent(id)}
          >
            <EventAvailableIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};
export default RecipeReviewCard;
