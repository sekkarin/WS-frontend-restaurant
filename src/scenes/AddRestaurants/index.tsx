/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { Restaurant } from "../Restaurants";
import { Transition } from "react-transition-group";
import { styled } from "@mui/system";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/base/Snackbar";
import { SnackbarCloseReason } from "@mui/base/useSnackbar";

const BASE_URl = import.meta.env.VITE_BASE_URL;
const AddRestaurants = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [open, setOpen] = useState(false);
  const [exited, setExited] = useState(true);
  const nodeRef = useRef(null);

  const handleOnSumit = async () => {
    console.log(restaurant);

    const res = await axios.post(`${BASE_URl}/restaurants`, {
      ...restaurant,
      imgUrl: restaurant?.imageUrl,
    });
    console.log(res.data);

    if (res.status) {
      setOpen(true);
    }
  };

  const handleClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row mt-[10%] w-4/5 mx-auto   gap-3">
        <img
          src={restaurant?.imageUrl}
          className="rounded-lg"
          width={350}
          height={350}
        />
        <div className="p-2 flex-1">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              อาหาร
            </label>
            <input
              //   value={restaurant?.name}
              type="text"
              id="name"
              className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="อาหาร"
              onChange={(e) => {
                setRestaurant((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              ประเภท
            </label>
            <input
              //   value={restaurant?.type}
              type="text"
              id="type"
              placeholder="ประเภท"
              onChange={(e) => {
                setRestaurant((prev) => ({ ...prev, type: e.target.value }));
              }}
              className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              รูปภาพประกอบ
            </label>
            <input
              placeholder="รูปประกอบ"
              type="text"
              id="type"
              onChange={(e) => {
                setRestaurant((prev) => ({
                  ...prev,
                  imageUrl: e.target.value,
                }));
              }}
              className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          <button
            type="submit"
            onClick={() => {
              handleOnSumit();
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            อัพเดตรายการ
          </button>
        </div>
      </div>
      <StyledSnackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        exited={exited}
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={open}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => {
            return (
              <SnackbarContent
                style={{
                  transform: positioningStyles[status],
                  transition: "transform 300ms ease",
                }}
                ref={nodeRef}
              >
                <CheckRoundedIcon
                  sx={{
                    color: "success.main",
                    flexShrink: 0,
                    width: "1.25rem",
                    height: "1.5rem",
                  }}
                />
                <div className="snackbar-message">
                  <p className="snackbar-title">อัพเดตข้อมูลสำเร็จ</p>
                  <p className="snackbar-description">
                    ชื่อ {restaurant?.name}
                  </p>
                  <p className="snackbar-description">
                    ประเภท {restaurant?.type}
                  </p>
                  {/* <p className="snackbar-description overflow-hidden w-11/12">
                    รูป {restaurant?.imageUrl}
                    
                  </p> */}
                </div>
                <CloseIcon
                  onClick={handleClose}
                  className="snackbar-close-icon"
                />
              </SnackbarContent>
            );
          }}
        </Transition>
      </StyledSnackbar>
    </div>
  );
};

export default AddRestaurants;

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
`;

const SnackbarContent = styled("div")(
  ({ theme }) => `
    display: flex;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: ${
      theme.palette.mode === "dark"
        ? `0 2px 16px rgba(0,0,0, 0.5)`
        : `0 2px 16px ${grey[200]}`
    };
    padding: 0.75rem;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
  
    & .snackbar-message {
      flex: 1 1 0%;
      max-width: 100%;
    }
  
    & .snackbar-title {
      margin: 0;
      line-height: 1.5rem;
      margin-right: 0.5rem;
    }
  
    & .snackbar-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
    }
  
    & .snackbar-close-icon {
      cursor: pointer;
      flex-shrink: 0;
      padding: 2px;
      border-radius: 4px;
  
      &:hover {
        background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      }
    }
    `
);

const positioningStyles = {
  entering: "translateX(0)",
  entered: "translateX(0)",
  exiting: "translateX(500px)",
  exited: "translateX(500px)",
  unmounted: "translateX(500px)",
};
