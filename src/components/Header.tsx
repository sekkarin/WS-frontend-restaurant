import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { FoodBankOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar >
        <FoodBankOutlined
          sx={{ mr: 2 }}
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <Typography variant="h6" color="inherit" noWrap className="flex-grow">
          Ken Food
        </Typography>
        <Button
          sx={{
            bgcolor: "green",
            color: "white",
            ":hover": {
              bgcolor: "#F0DE36",
            },
          }}
          onClick={() => {
            navigate("./AddRestaurants");
          }}
        >
          เพิ่มข้อมูล
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
