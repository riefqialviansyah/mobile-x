export const formatTime = (date) => {
  const postDate = new Date(date);
  const currentDate = new Date();

  let Difference_In_Time = currentDate.getTime() - postDate.getTime();

  let Difference_In_Hours = Math.round(Difference_In_Time / (1000 * 3600));
  if (Difference_In_Hours < 24) {
    return `${Difference_In_Hours} Jam`;
  }

  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  return `${Difference_In_Days} Hari`;
};
