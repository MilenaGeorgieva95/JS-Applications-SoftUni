export function hideAll() {
  const sections = Array.from(
    document.querySelectorAll("div#container>section")
  );
  sections.forEach((section) => (section.style.display = "none"));
}
