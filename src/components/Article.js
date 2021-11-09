import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./articleStyles.module.scss";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fafafa",
    height: 500,
  },
  media: {
    height: 200,
  },
});

const Article = ({ article }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {article && (
        <Card className={classes.card} id={article.publishedAt}>
          <CardMedia
            className={classes.media}
            component='img'
            src={
              article.urlToImage
                ? article.urlToImage
                : "https://qsuper.qld.gov.au/-/media/images/qsuperpw/news/news-placeholder-imagesss.jpg"
            }
            alt='news-img'
          />
          <CardContent>
            <Typography component='h6' className={styles.articleTitle}>
              <a
                href={article.url}
                target='_blank'
                rel='noreferrer'
                style={{ textDecoration: "none" }}
              >
                {article.title}
              </a>
            </Typography>

            <Typography
              variant='body2'
              component='p'
              className={styles.articleDescription}
            >
              {article.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Article;
