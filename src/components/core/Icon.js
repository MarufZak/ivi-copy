

const Icon = ({children,className}) => {
  return (
    <svg className={`${className??''}`}>
      <use href={`../images/sprite.svg#${children}`}></use>
    </svg>
  );
};

export default Icon;