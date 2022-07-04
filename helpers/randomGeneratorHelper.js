const createAndStoreOtp = (length = 0) => {
  const otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};
