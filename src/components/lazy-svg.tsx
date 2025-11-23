import { ComponentProps } from "react";

interface LazySvgProps extends ComponentProps<"svg"> {
  name: string;
}

export const LazySvg = async ({ name, ...props }: LazySvgProps) => {
  const Svg = (await import(`@/assets/${name}.svg`)).default;


  return <Svg {...props} />;
};
