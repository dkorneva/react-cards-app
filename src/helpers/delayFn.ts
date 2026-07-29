export const delayFn = (delay = 1000): Promise<unknown> => {
  return new Promise((res) => setTimeout(res, delay));
}