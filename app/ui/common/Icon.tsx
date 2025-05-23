import * as icons from 'react-feather';

export default function Icon({
  size = 18,
  ...props
}: {
  size?: number;
  name: keyof typeof icons;
}) {
  const IconComponent = icons[props.name];
  return <IconComponent size={size} />;
}
