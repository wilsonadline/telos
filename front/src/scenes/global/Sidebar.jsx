import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Admin
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px" width={"100%"} height={"100%"}>
              <Box display="flex" justifyContent="center" alignItems="center" width={"100%"} height={"100%"} >
                <img
                  alt="profile-user"
                  width="50%"
                  height="auto"
                  src={`../../assets/user.png`}
                  style={{ borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0", fontSize: "1.5rem", lineHeight: 1}}
                >
                  Julien Levavasseur
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  
                </Typography>
              </Box>
            </Box>
          )}

          <Box>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon sx={{ fontSize: "30px"}} />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              color={colors.grey[300]}
              sx={isCollapsed ? { fontSize: "1rem", display: "flex" ,justifyContent: "center", m: "0 5px 5px 0" } : { fontSize: "1.2rem", display: "flex", m: "0 0 5px 9%" }}
            >
              Data
            </Typography>
            <Item
              title="Contacts"
              to="/contacts"
              icon={<ContactsOutlinedIcon sx={{ fontSize: "30px"}} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Collaborateurs"
              to="/invoices"
              icon={<ReceiptOutlinedIcon sx={{ fontSize: "30px"}} />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              color={colors.grey[300]}
              sx={isCollapsed ? { fontSize: "1rem", display: "flex" ,justifyContent: "center", m: "0 5px 0 0" } : { fontSize: "1.2rem", display: "flex", m: "0 0 0 9%" }}
            >
              Pages
            </Typography>
            <Item
              title="Calendrier"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon sx={{ fontSize: "30px"}} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Post"
              to="/post"
              icon={<ChatBubbleOutlineIcon sx={{ fontSize: "30px"}} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Mail"
              to="/mail"
              icon={<MailOutlineIcon sx={{ fontSize: "30px"}} />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
