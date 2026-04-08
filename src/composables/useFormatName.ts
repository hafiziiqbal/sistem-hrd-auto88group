export function useFormatName() {
  const formatName = (item: any): string => {
    return item.full_name ? `${item.full_name} (${item.name})` : item.name;
  };

  const formatName2 = (name: string, full_name?: string): string => {
    return full_name ? `${full_name} (${name})` : name;
  };

  return {
    formatName,
    formatName2,
  };
}
