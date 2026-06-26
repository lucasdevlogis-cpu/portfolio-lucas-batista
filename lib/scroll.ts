export function scrollToSection(href: string): void {
  const id = href.startsWith("#") ? href.slice(1) : href;
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function sectionIdFromHref(href: string): string {
  return href.startsWith("#") ? href.slice(1) : href;
}
