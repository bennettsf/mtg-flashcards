import React from 'react';

const svgs = import.meta.glob('../assets/set_symbols/*.svg', { eager: true, import: 'default' });

interface LazySvgProps extends React.ComponentProps<'svg'> {
  name: string;
}

export function LazySvg({ name, ...props }: LazySvgProps) {
  const SvgComponent = svgs[`../assets/set_symbols/${name}.svg`] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  console.log('SVG Component:', SvgComponent);

  if (!SvgComponent) {
    console.warn(`SVG for set code "${name}" not found.`);
    return null;
  }
  return <SvgComponent {...props} />;
}
