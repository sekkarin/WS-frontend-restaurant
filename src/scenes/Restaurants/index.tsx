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
  Skeleton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const BASE_URl = import.meta.env.VITE_BASE_URL;
// console.log(BASE_URl);

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
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    setIsloading(false);
    const get = async () => {
      const res = await axios.get(`${BASE_URl}/restaurants`);
      setData(res.data.restuants);
      console.log(res.data.restuants);
      
      setIsloading(true);
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
    const res = await axios.delete(`${BASE_URl}/restaurants/${restaurant?.id}`);
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
      {isloading ? (
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
      ) : (
        <div className="flex">
          <Container maxWidth="md">
            <Grid container spacing={2} gridRow={4} columns={1} direction={"column"}>
              <Grid item xs={8}>
                <Skeleton variant="rectangular" height={200}  animation="wave" />
              </Grid>
              <Grid item xs={8}>
                <Skeleton variant="rectangular" height={200} animation="wave" />
              </Grid>
              <Grid item xs={8}>
                <Skeleton variant="rectangular" height={200} animation="wave" />
              </Grid>
              <Grid item xs={8}>
                <Skeleton variant="rectangular" height={200} animation="wave" />
              </Grid>
            </Grid>
          </Container>
        </div>
      )}

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
        <DialogContent></DialogContent>
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
