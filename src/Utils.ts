export const spaceToDash = (str: string) => {
  return str.replace(/\s+/g, '-');
}

export const secToHMS = (sec: number) => {
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds

  return hours + "h " + minutes + "m " + seconds + "s"; // Return is HH : MM : SS
};
