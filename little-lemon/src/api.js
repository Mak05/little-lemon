/**
 * Pseudo-random generator seed based on date
 */
const seededRandom = function (seed) {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

/**
 * Fetches available booking time slots for a given JavaScript Date object.
 * @param {Date} date 
 * @returns {Array<string>} Array of available time strings (e.g., ["17:00", "18:30"])
 */
export const fetchAPI = function (date) {
  const result = [];
  if (!(date instanceof Date) || isNaN(date)) {
    return result;
  }

  const random = seededRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ':00');
    }
    if (random() < 0.5) {
      result.push(i + ':30');
    }
  }
  return result;
};

/**
 * Submits table reservation data.
 * @param {Object} formData 
 * @returns {boolean} Returns true upon successful submission.
 */
export const submitAPI = function (formData) {
  if (!formData || !formData.date || !formData.time || !formData.guests) {
    return false;
  }
  return true;
};