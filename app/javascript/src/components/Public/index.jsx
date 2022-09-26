import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import publicApi from "apis/public";

import NotFound from "./NotFound";

import Container from "../Container";

const Public = ({ history }) => {
  const { slug } = useParams();
  const [isValid, setIsValid] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await publicApi.showQuiz(slug);
      history.push({
        pathname: `/public/${slug}/attempt/new`,
        state: { data },
      });
    } catch (error) {
      logger.error(error);
      setIsValid(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <div className="h-below-nav">
        {isValid ? <PageLoader text="Validating" /> : <NotFound />}
      </div>
    </Container>
  );
};

export default Public;
