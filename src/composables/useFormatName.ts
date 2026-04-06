import type { User } from "@/api/modules/user.api";
export function useFormatName() {
  const formatName = (item: any): string => {
    return item.full_name ? `${item.full_name} (${item.name})` : item.name;
  };

  return {
    formatName,
  };
}
