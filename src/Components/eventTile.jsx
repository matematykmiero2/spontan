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
const RecipeReviewCard = ({
  location,
  name,
  date,
  description,
  photo,
  categories,
}) => {
  return (
    <div style={{ padding: "10px" }}>
      <Card sx={{ maxWidth: 345 }}>
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

        <CardActions>
          <IconButton aria-label="add to favorites">
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
