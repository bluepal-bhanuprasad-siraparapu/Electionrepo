// src/utils/dateUtils.js
export const parseISTDate = (dateStr) => {
  if (!dateStr) return null;

  // Backend likely returns ISO string (UTC). Append "Z" to treat as UTC.
  const utcDate = new Date(dateStr + "Z");

  // Add IST offset (+5:30 hours)
  const istOffset = 5.5 * 60 * 60 * 1000;
  return new Date(utcDate.getTime() + istOffset);
};

export const getNowIST = () => {
  const nowUTC = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  return new Date(nowUTC.getTime() + istOffset);
};
