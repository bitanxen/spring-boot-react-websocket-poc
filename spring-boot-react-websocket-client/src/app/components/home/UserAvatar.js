import React from "react";
import { Badge, Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function UserAvatar(props) {
  const classes = useStyles();
  const { name, image, self, group, targetUserId } = props;
  const chat = useSelector(({ chat }) => chat);

  const isOnline = () => {
    if (self) {
      return chat.chat.connected;
    }

    if (!group) {
      const targetUserArr = chat.chat.onlineUsers.filter(
        (u) => u.userId === targetUserId
      );
      return targetUserArr.length > 0 ? targetUserArr[0].online : false;
    } else {
      return false;
    }
  };

  return (
    <div className={classes.root}>
      {isOnline() ? (
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          {image ? (
            <Avatar alt={name} src={image} />
          ) : (
            <Avatar alt={name}>{name[0]}</Avatar>
          )}
        </StyledBadge>
      ) : (
        <React.Fragment>
          {image ? (
            <Avatar alt={name} src={image} />
          ) : (
            <Avatar alt={name}>{name[0]}</Avatar>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
