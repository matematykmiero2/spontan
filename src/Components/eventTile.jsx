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
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@react-hook/media-query";
const RecipeReviewCard = ({
  location,
  name,
  date,
  description,
  photo,
  categories,
  id,
  ispublic,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div style={{ padding: "10px" }}>
      <Card
        sx={{
          width: 345,
          height: isMobile ? "auto" : "600px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div key={id} onClick={() => navigate(`/event/${id}`)}>
          <CardHeader title={name} subheader={date} />
          <CardMedia component="img" height="194" image={photo} alt="alt" />
          <CardContent>
            <div className="categories">
              {categories?.map((category) => (
                <Chip key={category} label={t(category)} variant="outlined" />
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
      </Card>
    </div>
  );
};
export default RecipeReviewCard;
