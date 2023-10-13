/* eslint-disable react/no-array-index-key */
type HighlightMatchProps = {
  match?: string;
  children: string;
  className?: string;
};

const HighlightMatch: React.FC<HighlightMatchProps> = ({
  children = "",
  match,
  className,
  ...restProps
}) => {
  if (match && typeof match === "string") {
    const regex = new RegExp(`(${match})`, "gi");
    const parts = children.split(regex);

    const elements = parts.map((part, index) => {
      return regex.test(part) ? (
        <strong key={index + part}>{part}</strong>
      ) : (
        <span key={index + part}>{part}</span>
      );
    });

    return (
      <span className={className} {...restProps}>
        {elements}
      </span>
    );
  }

  return (
    <span className={className} {...restProps}>
      {children}
    </span>
  );
};

export default HighlightMatch;
