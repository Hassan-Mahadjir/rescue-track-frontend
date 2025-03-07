export const shouldHideNavBar = (pathName: string): boolean => {
  const hiddenPaths = ["/login", "/signup"];
  return hiddenPaths.includes(pathName);
};
