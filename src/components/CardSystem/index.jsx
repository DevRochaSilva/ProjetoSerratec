import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CardSystem({
  width,
  height,
  photo,
  title,
  subtitle,
  routeTo,
}) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        backgroundColor: "var(--branco-primario)",
        maxWidth: width,
        maxHeight: height,
        paddingRight: 0,
        paddingLeft: 0,
      }}
    >
      <CardActionArea onClick={() => navigate(routeTo)}>
        <CardMedia
          component="img"
          height={300}
          image={photo}
          alt={title}
          sx={{ objectFit: "unset" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ color: "var(--verde-primario3)" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "var(--preto-primario)" }}
          >
            {subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
