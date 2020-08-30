import React, { useState, useEffect } from "react";
import {
  Avatar,
  IconButton,
  Drawer,
  Button,
  TextField,
} from "@material-ui/core";
import DonutlargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import SidebarChat from "./SidebarChats";
import "./Sidebar.css";
import db from "../firebase";
import { useStateValue } from "./StateProvider";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  const [state, setState] = useState({
    left: false,
  });

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const buttonClickHandler = () => {
    let inpField_content = document.getElementById("standard-basic").value;
    if (inpField_content) {
      db.collection("rooms").add({
        name: inpField_content,
      });
    }
    setState({ ...state, ["left"]: false });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headeravatar">
          <Avatar src={user?.photoURL} />
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutlargeIcon />
          </IconButton>
          <React.Fragment key={"left"}>
            <IconButton onClick={toggleDrawer("left", true)}>
              <ChatIcon />
            </IconButton>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
              className="sidebar__toggleMenuDrawer"
            >
              <div className="sidebar__toggleMenuText">
                <h2>New Rooms</h2>
              </div>
              <div className="sidebar__toggleMenuInput">
                <TextField
                  id="standard-basic"
                  color="#ededed"
                  label="Enter room name"
                />
                <div className="sidebar__toggleMenuButton">
                  <Button
                    variant="contained"
                    onClick={() => buttonClickHandler()}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </Drawer>
          </React.Fragment>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
