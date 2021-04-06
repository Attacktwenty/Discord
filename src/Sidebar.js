import { React, useState, useEffect } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SignalCellularAltTwoToneIcon from "@material-ui/icons/SignalCellularAltTwoTone";
import CallIcon from "@material-ui/icons/Call";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import SidebarChannel from "./SidebarChannel";

import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Discord Clone</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <div className="sidebar__addicon">
            <AddIcon
              onClick={handleAddChannel}
              className="sidebar__addChannel"
            />
          </div>
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltTwoToneIcon
          className="sidebar__voiceicon"
          fontSize="large"
        />
        <div className="sidebar__voiceinfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <CallIcon />
          <InfoOutlinedIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar
          style={{ cursor: "pointer" }}
          onClick={() => auth.signOut()}
          src={user.photo}
        />
        <div className="sidebar__profileinfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 6)}</p>
        </div>
        <div className="sidebar__profileicons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
