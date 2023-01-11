import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import placeholderImage from '../../assets/images/placeholder.jpg';

const Image = ({ src, className, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
  };

  if (src.indexOf(null) != -1) {
    src = placeholderImage;
  }

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
