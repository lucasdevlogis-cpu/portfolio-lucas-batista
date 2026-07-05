import {
  AlertTriangle,
  BarChart3,
  Clock,
  Database,
  DollarSign,
  FileSpreadsheet,
  MapPin,
  Network,
  Package,
  Radar,
  Route,
  ScanSearch,
  Truck,
  Warehouse,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

import type { LucideIconName } from "@/data/content";

/** Fonte única de resolução nome → componente Lucide. */
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
  DollarSign,
  Radar,
  ScanSearch,
};

export function getLucideIcon(name: LucideIconName): LucideIcon {
  return LUCIDE_ICONS[name];
}
