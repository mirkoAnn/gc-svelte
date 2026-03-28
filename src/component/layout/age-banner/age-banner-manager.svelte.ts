export const AGE_VERIFICATION_COOKIE_NAME = "goi_age_verification";

let isAgeVerified = $state(false);

export const ageBannerManager = {
  initialize: (verified: boolean) => {
    isAgeVerified = verified;
  },
  isAgeVerified: () => isAgeVerified,
  verifyAge: () => (
    (isAgeVerified = true),
    (document.cookie =
      AGE_VERIFICATION_COOKIE_NAME +
      "=true;path=/;expires=Tue, 19 Jan 2038 03:14:07 UTC")
  ),
  denyAccess: () => history.back(),
};
