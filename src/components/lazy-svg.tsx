import { ComponentProps } from "react";

interface LazySvgProps extends ComponentProps<"svg"> {
  name: string;
}

export const LazySvg = async ({ name, ...props }: LazySvgProps) => {
  try {
      const Svg = (await import(`@/assets/set_symbols/${name}.svg`)).default;
      return <Svg {...props} />;
  } catch(err) {
    console.error("Error fetching sets:", err);
  }

};
