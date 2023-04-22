import React from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);
  console.log("recommend", data);

  if (data?.results.length === 0) return;

  return (
    <Carousel
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
      title="Recommendations"
    />
  );
};

export default Recommendation;
