const getLoginPath = () => {
  if (window.location.hostname === "admin.limontechno.com") {
    return "/admin/login";
  }

  if (window.location.hostname === "seller.limontechno.com") {
    return "/seller/login";
  }

  return "/login";
};

export default getLoginPath;
