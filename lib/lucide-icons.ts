import {
  AlertTriangle,
  BarChart3,
  Clock,
  Database,
  FileSpreadsheet,
  MapPin,
  Network,
  Package,
  Route,
  Truck,
  Warehouse,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

import type { LucideIconName } from "@/data/content";

export const LUCIDE_ICONS: Record<LucideIconName, LucideIcon> = {
  Truck,
  BarChart3,
  Clock,
  FileSpreadsheet,
  Database,
  Route,
  MapPin,
  AlertTriangle,
  Package,
  Warehouse,
  Network,
  Waypoints,
};

export function getLucideIcon(name: LucideIconName): LucideIcon {
  return LUCIDE_ICONS[name];
}
