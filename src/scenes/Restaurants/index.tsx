import { useEffect, useState } from "react";
// import { Header } from "../../components/Header"; "../../components/Header";
import axios from "axios";
import Header from "../../components/Header";
import ListRetuarant from "./ListRetuarant";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface Restaurant {
  id?: number;
  name?: string;
  type?: string;
  imageUrl?: string;
  createdAt?: string;
}
const Restaurants = () => {
  const [data, setData] = useState<Restaurant[]>([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const get = async () => {
      const res = await axios.get("http://localhost:3030/restaurants");
      setData(res.data);
      console.log("get work");
      // const resTest = await axios.get("http://localhost:3500");
      // console.log(resTest.data);
    };
    get();
  }, [reload]);

  const handleClickOpenDialog = (
    _restaurant?: Restaurant | undefined | NonNullable<unknown>
  ) => {
    setOpenDialog(true);
    if (_restaurant !== undefined) {
      setRestaurant(_restaurant);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleDelete = async () => {
    setOpenDialog(false);
    const res = await axios.delete(
      `http://localhost:3030/restaurants/${restaurant?.id}`
    );
    // console.log(res.status);
    if (res.status === 200) {
      setOpenDialog(false);
      setRestaurant({});
      setReload((prev) => !prev);
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          bgcolor: "Background.paper",
          pt: 16,
          pb: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            "มาสัมผัสชีวิตครบรสกับความหลากหลายทางความอร่อยที่นี่"
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            className="px-9"
            paragraph
          >
            "เปิดประสบการณ์ใหม่ๆ กับความท้าทายของรสชาติ
            สัมผัสความเปลี่ยนแปลงแห่งความอร่อยในทุกๆ จานที่นี่
            เปิดโอกาสให้คุณตื่นตาตื่นใจทุกครั้งที่มาเยือน"
          </Typography>
        </Container>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {data.map((restaurant) =>
              ListRetuarant(restaurant, navigate, handleClickOpenDialog)
            )}
          </Grid>
        </Container>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleClickOpenDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          คุณต้องการลบ{" "}
          <span className="text-red-400 "> {restaurant?.name}</span> หรือไม่
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
          <p className="text-red-400"> {restaurant?.name}</p>
      
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>ลบ</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            ยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Restaurants;
