import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import CheckCircle from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "66%",
    height: "100%",
  },
  icon: {
    // color: "rgba(255, 255, 255, 0.54)",
    color: "#c6ff00",
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList({
  results,
  title,
  type = "results",
  handleClick,
}) {
  const classes = useStyles();

  const actionIcon = (tile, type, handleClick) => {
    const content = {};
    if (type === "results") {
      if (tile.selected) {
        content.label = `Added ${tile.Title} (${tile.Year}) to nomination`;
        content.disabled = true;
        content.icon = <CheckCircle />;
      } else {
        content.label = `Adds ${tile.Title} (${tile.Year}) to nomination`;
        content.disabled = false;
        content.icon = <AddCircle />;
      }
    } else if (type === "nominations") {
      if (!tile.selected) {
        content.label = `Removed ${tile.Title} (${tile.Year}) from nomination`;
        content.disabled = false;
        content.icon = <RemoveCircle />;
      }
    }
    return (
      <IconButton
        aria-label={content.label}
        className={classes.icon}
        onClick={() => handleClick(tile.imdbID)}
        disabled={content.disabled}
      >
        {content.icon}
      </IconButton>
    );
  };
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">{title}</ListSubheader>
        </GridListTile>
        {results.length > 0 &&
          results.map((tile) => (
            <GridListTile key={`${tile.Poster}-${tile.Year}`}>
              <img src={tile.Poster} alt={tile.Title} />
              <GridListTileBar
                title={`${tile.Title}`}
                subtitle={<span>{tile.Year}</span>}
                actionIcon={
                  //   <IconButton
                  //     aria-label={`Adds ${tile.Title} (${tile.Year}) to nomination`}
                  //     className={classes.icon}
                  //     onClick={() => handleClick(tile.imdbID)}
                  //     disabled={tile.selected ? true : false}
                  //   >
                  //     {tile.selected ? <CheckCircle /> : <AddCircle />}
                  //   </IconButton>
                  actionIcon(tile, type, handleClick)
                }
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}
