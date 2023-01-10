import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const Picture = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
  };

  const style = isLoading ? { display: 'none' } : {};

  return (
    <>
      {isLoading && <Skeleton height="100%" />}
      <picture style={style}>
        {children.map((child,index) => {
          if (child.type === "source") {
            return (
              <source key={index}
                onLoad={handleLoaded}
                srcSet={child.props.srcSet}
                media={child.props.media}
              />
            );
          } else {
            return (
              <img key={index}
                onLoad={handleLoaded}
                src={child.props.src}
                className={child.props.className}
                alt={child.props.alt}
              />
            );
          }
        })}
      </picture>
    </>
  );
};

export default Picture;
