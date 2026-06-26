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
} from "lucide-react";

import type { LucideIconName } from "@/data/content";
import { cn } from "@/lib/utils";

interface LucideIconByNameProps {
  name: LucideIconName;
  className?: string;
}

export function LucideIconByName({ name, className }: LucideIconByNameProps) {
  const props = { className: cn(className), "aria-hidden": true as const };

  switch (name) {
    case "Truck":
      return <Truck {...props} />;
    case "BarChart3":
      return <BarChart3 {...props} />;
    case "Clock":
      return <Clock {...props} />;
    case "FileSpreadsheet":
      return <FileSpreadsheet {...props} />;
    case "Database":
      return <Database {...props} />;
    case "Route":
      return <Route {...props} />;
    case "MapPin":
      return <MapPin {...props} />;
    case "AlertTriangle":
      return <AlertTriangle {...props} />;
    case "Package":
      return <Package {...props} />;
    case "Warehouse":
      return <Warehouse {...props} />;
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}
