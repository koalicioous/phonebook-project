import { ReactNode } from "react";

type ConditionalRenderProps = {
  children: ReactNode;
  condition: boolean;
  fallback?: ReactNode;
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
