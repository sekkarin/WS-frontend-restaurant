import { useNavigate } from "react-router-dom";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { FoodBankOutlined } from "@mui/icons-material";

import React, { ReactElement } from "react";
interface HeaderProps {
  onSearch?: ReactElement | ReactElement[] | React.ReactNode;
}
const Header = ({ onSearch }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
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
            mx: 5,
          }}
          onClick={() => {
            navigate("../AddRestaurants");
          }}
        >
          เพิ่มข้อมูล
        </Button>
        {onSearch}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
