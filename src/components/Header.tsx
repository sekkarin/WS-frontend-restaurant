import { useNavigate } from "react-router-dom";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { FoodBankOutlined } from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
interface HeaderProps {
  onSearch: (search: string) => void;
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
            mx:5
          }}
          onClick={() => {
            navigate("../AddRestaurants");
          }}
        >
          เพิ่มข้อมูล
        </Button>
        <SearchIcon scale={2} />
        <InputBase
          placeholder="search"
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            onSearch(e.target.value);
          }}
        />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
