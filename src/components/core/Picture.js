import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import placeholderImage from '../../assets/images/placeholder.jpg';

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
            let src = child.props.srcSet.indexOf(null) == -1 ? child.props.srcSet : placeholderImage; // check if there is an image from API
            return (
              <source key={index}
                onLoad={handleLoaded}
                srcSet={src}
                media={child.props.media}
              />
            );
          } else {
            let src = child.props.src.indexOf(null) == -1 ? child.props.src : placeholderImage;
            return (
              <img key={index}
                onLoad={handleLoaded}
                src={src}
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