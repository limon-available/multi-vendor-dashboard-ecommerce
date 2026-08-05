const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

const apiHost = process.env.REACT_APP_API_URL;
//'https://multi-vendor-eccomerce-backend-1.onrender.com'

export const API_URL = trimTrailingSlash(apiHost);
export const API_BASE_URL = `${API_URL}/api`;
export const SOCKET_URL = trimTrailingSlash(process.env.REACT_APP_SOCKET_URL || API_URL);

// Social login client identifiers (safe to expose on the client).
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
export const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID || '';
