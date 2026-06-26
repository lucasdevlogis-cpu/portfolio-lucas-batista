import {
  AlertTriangle,
  BarChart3,
  Clock,
  Database,
  FileSpreadsheet,
  MapPin,
  Package,
  Route,
  Truck,
  Warehouse,
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
};

export function getLucideIcon(name: LucideIconName): LucideIcon {
  return LUCIDE_ICONS[name];
}
