import type { IconKey } from "../../types/catalog";

interface IconProps {
  name: IconKey;
  className?: string;
}

const iconPaths: Record<IconKey, string> = {
  camera: "/icons/livestream.svg",
  shield: "/icons/logo_hms_new 1.svg",
  plan: "/icons/cam_unlimited.svg",
  sensor: "/icons/choose_your_sensor.svg",
  grid: "/icons/add_extra_protecxtion.svg",
  truck: "/icons/fast_shipping.svg",
};

export function Icon({ name, className }: IconProps) {
  const src = iconPaths[name];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={`${name} icon`}
      className={className}
      aria-hidden="true"
    />
  );
}
