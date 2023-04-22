import React from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);
  const title = mediaType === "movie" ? "Similar Movies" : "Similar TV Shows";

  if (data?.results.length <= 0) return;

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
