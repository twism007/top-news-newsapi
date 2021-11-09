import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import PropTypes from "prop-types";
import qs from "qs";
import React, { useEffect } from "react";
import { useRecoilState, atom } from "recoil";
import Article from "./Article.js";
import styles from "./articleStyles.module.scss";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fafafa",
  },
  media: {
    height: 300,
  },
});

export const defaultCategory = atom({
  key: "defaultCategory",
  default: "technology",
});

export default function Articles({ loading, articles }) {
  const [articleCategory, setArticleCategory] = useRecoilState(defaultCategory);
  const classes = useStyles();
  const history = createBrowserHistory();

  useEffect(() => {
    const filterParams = history.location.search.substr(1);
    const filterFromParams = qs.stringify(filterParams);
    if (filterFromParams) {
      setArticleCategory(filterFromParams);
    }
  }, []);

  useEffect(() => {
    history.push(`?articlecategory=${articleCategory}`);
  }, [articleCategory]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className={classes.root}>
          <h1 className={styles.newsTitle}>
            Top Stories Today in{" "}
            <Select
              className={styles.dropdownCategory}
              labelId='select-category'
              id='select-category'
              label='Select Category'
              onChange={(e) => setArticleCategory(e.target.value)}
              value={articleCategory}
            >
              <MenuItem value='technology'>Technology</MenuItem>
              <MenuItem value='science'>Science</MenuItem>
              <MenuItem value='business'>Business</MenuItem>
              <MenuItem value='entertainment'>Entertainment</MenuItem>
              <MenuItem value='general'>General</MenuItem>
              <MenuItem value='health'>Health</MenuItem>
            </Select>
          </h1>

          <Grid container spacing={3}>
            {articles.map((article) => (
              <Grid item xs={12} sm={4} key={article._id}>
                <Article article={article} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}

Articles.propTypes = {
  loading: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired,
};
