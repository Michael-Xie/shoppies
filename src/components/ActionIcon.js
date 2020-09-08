import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import CheckCircle from "@material-ui/icons/CheckCircle";

const ActionIcon = (tile, type, handleClick) => {
  const content = {};
  content.color = "#c6ff00";

  if (type === "results") {
    if (tile.selected) {
      content.label = `Added ${tile.Title} (${tile.Year}) to nomination`;
      content.disabled = true;
      content.color = "#bdbdbd";
      content.icon = <CheckCircle />;
    } else {
      content.label = `Adds ${tile.Title} (${tile.Year}) to nomination`;
      content.disabled = false;
      content.icon = <AddCircle />;
    }
  } else if (type === "nominations") {
    if (tile.selected) {
      content.label = `Removed ${tile.Title} (${tile.Year}) from nomination`;
      content.disabled = false;
      content.color = "#f50057";
      content.icon = <RemoveCircle />;
    }
  }

  return (
    <IconButton
      aria-label={content.label}
      style={{ color: content.color }}
      onClick={() => handleClick(tile.imdbID)}
      disabled={content.disabled}
    >
      {content.icon}
    </IconButton>
  );
};

export default ActionIcon;
