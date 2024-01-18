/**
 * Checks if token duration time has passed
 * @param {number} currentTime
 * @param {number} tokenTimestamp time of token creation
 * @param {number} tokenDurationSeconds token duration in seconds
 * @returns {boolean} if token duration has passed
 */
export const hasDurationTimePassed = (currentTime: number, tokenTimestamp: number, tokenDurationSeconds: number) => {
  const tokenDurationMS = tokenDurationSeconds * 1000;
  console.log('time passed', (currentTime - tokenTimestamp) / 1000, 'duration', tokenDurationSeconds);
  return currentTime - tokenTimestamp > tokenDurationMS;
};

/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
