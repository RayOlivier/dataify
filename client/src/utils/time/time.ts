export const hasDurationTimePassed = (currentTime: number, tokenTimestamp: number, tokenDurationSeconds: number) => {
  const tokenDurationMS = tokenDurationSeconds * 1000;
  console.log('time passed', (currentTime - tokenTimestamp) / 1000, 'duration', tokenDurationSeconds);
  return currentTime - tokenTimestamp > tokenDurationMS;
};
