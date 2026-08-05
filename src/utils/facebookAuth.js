import { FACEBOOK_APP_ID } from "../config/app";

// Lightweight Facebook JS SDK loader + login helper. We load the SDK lazily
// (only the first time the user clicks "Login with Facebook") so it doesn't
// slow down initial page load, then resolve with the short-lived access token
// that the backend verifies via the Graph API.

let sdkPromise = null;

const loadFacebookSdk = () => {
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    if (!FACEBOOK_APP_ID) {
      reject(new Error("Facebook App ID is not configured"));
      return;
    }

    if (window.FB) {
      resolve(window.FB);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: false,
        version: "v19.0",
      });
      resolve(window.FB);
    };

    const id = "facebook-jssdk";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Failed to load Facebook SDK"));
    document.body.appendChild(script);
  });

  return sdkPromise;
};

// Opens the Facebook login dialog and resolves with { accessToken, userID }.
export const facebookLogin = () =>
  loadFacebookSdk().then(
    (FB) =>
      new Promise((resolve, reject) => {
        FB.login(
          (response) => {
            if (response.authResponse) {
              resolve({
                accessToken: response.authResponse.accessToken,
                userID: response.authResponse.userID,
              });
            } else {
              reject(new Error("Facebook login was cancelled"));
            }
          },
          { scope: "public_profile,email" },
        );
      }),
  );
