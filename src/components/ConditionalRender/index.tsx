type ConditionalRenderProps = {
  children: React.ReactNode;
  condition: boolean;
  fallback?: React.ReactNode;
};

const ConditionalRender = ({
  children,
  condition,
  fallback,
}: ConditionalRenderProps) => {
  if (condition) return <>{children}</>;
  else if (fallback) return <>{fallback}</>;
  else return null;
};

export default ConditionalRender;
