import {
  BarChart3,
  Bird,
  CalendarDays,
  CalendarRange,
  Cloud,
  Crown,
  Cross,
  Egg,
  Flower2,
  Gift,
  Landmark,
  MapPin,
  Rocket,
  Sparkles,
  TreePine,
  Upload,
  Users,
  type LucideIcon,
} from 'lucide-react';

export const LANDING_ICONS = {
  calendarRange: CalendarRange,
  users: Users,
  landmark: Landmark,
  upload: Upload,
  barChart: BarChart3,
  rocket: Rocket,
  gift: Gift,
  mapPin: MapPin,
  calendarDays: CalendarDays,
  sparkles: Sparkles,
  crown: Crown,
  egg: Egg,
  flower: Flower2,
  cloud: Cloud,
  bird: Bird,
  cross: Cross,
  treePine: TreePine,
} as const satisfies Record<string, LucideIcon>;

export type LandingIconName = keyof typeof LANDING_ICONS;

interface LandingIconProps {
  name: LandingIconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function LandingIcon({
  name,
  size = 24,
  className,
  strokeWidth = 1.75,
}: LandingIconProps) {
  const Icon = LANDING_ICONS[name];
  return <Icon size={size} className={className} strokeWidth={strokeWidth} aria-hidden />;
}
