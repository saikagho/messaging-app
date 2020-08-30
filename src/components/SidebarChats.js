import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import db from "../firebase";
import "./SidebarChat.css";

const SidebarChat = ({ addNewChat, id, name }) => {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  return !addNewChat ? (
    <NavLink to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
          <h3 className="sidebarChat__roomname">{name}</h3>
          <p className="sidebarChat__lastmessage">{messages[0]?.message}</p>
        </div>
      </div>
    </NavLink>
  ) : null;
};

export default SidebarChat;
