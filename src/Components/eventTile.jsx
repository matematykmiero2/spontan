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
import Chip from "@mui/material/Chip";
import "./components.css";
import { useNavigate } from "react-router-dom";
import { setUserEvent, deleteUserEvent } from "../functions";
const RecipeReviewCard = ({
  location,
  name,
  date,
  description,
  photo,
  categories,
  id,
  type,
}) => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "10px" }}>
      <Card
        sx={{
          width: 345,
          height: 650,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div key={id} onClick={() => navigate(`/event/${id}`)}>
          <CardHeader title={name} subheader={date} />
          <CardMedia component="img" height="194" image={photo} alt="alt" />
          <CardContent>
            <div className="categories">
              {categories.map((category) => (
                <Chip key={category} label={category} variant="outlined" />
              ))}
            </div>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h7" component="div">
              {location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </div>
        <CardActions sx={{ marginTop: "auto" }}>
          <IconButton
            aria-label="add to favorites"
            onClick={() => (type ? deleteUserEvent(id) : setUserEvent(id))}
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
