import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import { Restaurant } from ".";
import { NavigateFunction } from "react-router-dom";

export function ListRetuarant(
  restaurant: Restaurant,
  navigate: NavigateFunction,
  handleOnDelete: (_restaurant: Restaurant | undefined) => void
) {
  return (
    <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        className="drop-shadow-2xl hover:scale-[1.005]"
      >
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image={restaurant.imageUrl}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {restaurant.name}
          </Typography>
          <Typography variant="subtitle1" className="text-neutral-600">
            {restaurant.type}
          </Typography>
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque,
            doloribus?
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              navigate(`./updateRestuarant/${restaurant.id}`);
            }}
            size="small"
            sx={{
              bgcolor: "green",
              color: "white",
              ":hover": {
                bgcolor: "#F0DE36",
              },
            }}
          >
            แก้ใข
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => handleOnDelete(restaurant || undefined)}
          >
            ลบ
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
export default ListRetuarant;
