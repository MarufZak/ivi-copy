import { createElement, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const Image = ({ src, className, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
  };

  const style = isLoading ? { display: "none" } : {};

  return (
    <>
      { isLoading && <Skeleton height="100%" />}
      <img
        style={style}
        onLoad={handleLoaded}
        src={src}
        alt={alt}
        className={className}
      />
    </>
  );
};

export default Image;
