import {
  AlertTriangle,
  ArrowDown,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  Database,
  DollarSign,
  FileSpreadsheet,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  Package,
  Radar,
  Route,
  ScanSearch,
  Star,
  Truck,
  User,
  Warehouse,
  Waypoints,
  Zap,
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
  Star,
  Zap,
  User,
  Mail,
  Building2,
  MessageSquare,
  CheckCircle2,
  ArrowDown,
};

export function getLucideIcon(name: LucideIconName): LucideIcon {
  return LUCIDE_ICONS[name];
}
