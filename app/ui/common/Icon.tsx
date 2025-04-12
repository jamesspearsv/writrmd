import * as icons from 'react-feather';

export default function Icon(props: { name: keyof typeof icons }) {
  const IconComponent = icons[props.name];
  return <IconComponent />;
}
