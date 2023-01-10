import { useEffect, useState } from "react";



const useImageLoaded = (children) => {
  const [image, setImage] = useState(null);

  useEffect(()=>{
    const img = new Image();
    if (children.type === "img") {
        img.src = children.props.src;
        img.className = children.props.className
        setImage(img);
        console.log(img);
    }
  },[])


  return {image}
};

export default useImageLoaded;
