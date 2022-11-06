export const spiltErrors = (sample) => {
  let message = "";
  if (sample) {
    Object.values(sample).map((e) => {
      return e.forEach((element) => {
        message += `${element}\n,`;
      });
    });
  } else {
    message = "check the details again";
  }

  return message;
};
