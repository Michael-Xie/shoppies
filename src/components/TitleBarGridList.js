import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import ActionIcon from "./ActionIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "50%",
    height: "100%",
  },
}));

export default function TitlebarGridList({
  results,
  error,
  title,
  type = "results",
  handleClick,
}) {
  const classes = useStyles();

  return (
    <GridList cellHeight={200} className={classes.gridList} cols={2}>
      <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
        <ListSubheader component="div">{title}</ListSubheader>
      </GridListTile>
      {results.length > 0 ? (
        results.map((tile) => (
          <GridListTile key={`${tile.Poster}-${tile.Year}`}>
            <img src={tile.Poster} alt={tile.Title} />
            <GridListTileBar
              title={`${tile.Title}`}
              subtitle={<span>{tile.Year}</span>}
              actionIcon={ActionIcon(tile, type, handleClick)}
            />
          </GridListTile>
        ))
      ) : (
        <GridListTile key="message" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Nothing to Show</ListSubheader>
        </GridListTile>
      )}
    </GridList>
  );
}
