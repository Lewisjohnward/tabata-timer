export const updateThemeColor = (color: string) => {
  const themeColor: HTMLMetaElement | null = document.querySelector(
    'meta[name="theme-color"]'
  );
  if (themeColor != null) themeColor.content = color;
};
