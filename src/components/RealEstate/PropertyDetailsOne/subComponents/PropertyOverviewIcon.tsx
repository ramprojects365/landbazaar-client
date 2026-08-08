import { LucideIcon } from "lucide-react";

const OVERVIEW_ICON_PROPS = {
  size: 24,
  color: "#003B5C",
  strokeWidth: 1.5,
  "aria-hidden": true as const,
};

export default function PropertyOverviewIcon({
  icon: Icon,
}: {
  icon: LucideIcon;
}) {
  return <Icon {...OVERVIEW_ICON_PROPS} />;
}
