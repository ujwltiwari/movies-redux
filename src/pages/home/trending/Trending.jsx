import React from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

const Trending = () => {
  const onTabChange = () => {};

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
    </div>
  );
};

export default Trending;
