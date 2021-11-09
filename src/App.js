import React, { useEffect, useState } from "react";
import Articles from "./components/Articles.js";
import axios from "axios";
import { useRecoilState } from "recoil";
import { defaultCategory } from "./components/Articles.js";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [articleCategory] = useRecoilState(defaultCategory);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${articleCategory}&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setArticles(res.data.articles);

      setLoading(false);
    };

    getArticles();
  }, [articleCategory]);

  return (
    <div>
      <Articles loading={loading} articles={articles} />
    </div>
  );
};

export default App;
