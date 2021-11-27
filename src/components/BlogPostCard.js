import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    minWidth: 450,
    height: 520,
    background: "rgba(255,255,255,1)",
    margin: "20px",
  },
  media: {
    height: 300,
  },
  title: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "2rem",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden",
  },
  desc: {
    fontFamily: "Nunito",
    fontSize: "1rem",
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 3,
    wordBreak: "break-all",
    overflow: "hidden",
  },
}));

function BlogPostCard({ post }) {
  const classes = useStyles();

  return (
    <CardActionArea>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          component="img"
          image={
            post.imageUrl && post.imageUrl
              ? post.imageUrl
              : process.env.PUBLIC_URL + "/assets/folksdevlogo.png"
          }
          //{process.env.PUBLIC_URL + "/assets/bg2.jpg"}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            component="div"
            //noWrap={true}
            className={classes.title}
          >
            {post.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.desc}
          >
            {post.details.replace(/<\/?[^>]+(>|$)/g, "")}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

export default BlogPostCard;
