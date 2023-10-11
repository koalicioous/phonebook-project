type ConditionalRenderProps = {
  children: React.ReactNode;
  condition: boolean;
};

const ConditionalRender = ({ children, condition }: ConditionalRenderProps) => {
  if (condition) return <>{children}</>;
  else return null;
};

export default ConditionalRender;
