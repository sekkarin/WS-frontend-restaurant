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

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const BASE_URl = import.meta.env.VITE_BASE_URL;
// console.log(BASE_URl);

export interface Restaurant {
  id?: number;
  name?: string;
  type?: string;
  imageUrl?: string;
  createdAt?: string;
  // match?: () => any;
}
const Restaurants = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Restaurant[]>([]); //! All data
  const [searchData, setSearchData] = useState<Restaurant[]>([]); //! filter data
  const [openDialog, setOpenDialog] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [reload, setReload] = useState(false);
  const [islanding, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    const get = async () => {
      const res = await axios.get(`${BASE_URl}/restaurants`);
      setData(res.data.restuants);
      setSearchData(res.data.restuants);
      setLoading(true);
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

    if (res.status === 200) {
      setOpenDialog(false);
      setRestaurant({});
      setReload((prev) => !prev);
    }
  };
  /* The `onSearch` function is responsible for filtering the restaurant data based on a search query. */
  const onSearch = (search: string) => {
    if (search === "") {
      setSearchData(data);
    } else {
      setSearchData(data);

      const searchResult = data.map((value) => {
        if (value.name?.includes(search)) {
          return value;
        }
      });

      const searchFilter = searchResult.filter((value) => value !== undefined);
      if (searchFilter) {
        setSearchData(searchFilter as Restaurant[]);
      }
    }
  };

  return (
    <>
      <Header
        onSearch={
          <>
            {" "}
            <SearchIcon scale={2} />
            <InputBase
              placeholder="search"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                onSearch(e.target.value);
              }}
            />
          </>
        }
      />
      {islanding ? (
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
              {searchData.length > 0 ? (
                searchData!.map((restaurant) =>
                  ListRetuarant(restaurant, navigate, handleClickOpenDialog)
                )
              ) : (
                <p className="text-center text-4xl mt-5 w-full">ไม่มีข้อมูล</p>
              )}
            </Grid>
          </Container>
        </Box>
      ) : (
        <div className="flex">
          <Container maxWidth="md">
            <Grid
              container
              spacing={2}
              gridRow={4}
              columns={1}
              direction={"column"}
            >
              <Grid item xs={8}>
                <Skeleton variant="rectangular" height={200} animation="wave" />
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
