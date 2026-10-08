const getLoginPath = () => {
  if (window.location.hostname === "admin.limontechno.com") {
    return "/admin/login";
  }

  return "/login";
};

export default getLoginPath;
