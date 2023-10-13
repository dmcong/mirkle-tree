/**
 * Xor multiple buffers.
 * @param arr The buffer list.
 * @returns Uint8Array
 */
export const xor = (...arr: Uint8Array[]): Uint8Array => {
  if (!arr || !arr.length) throw new Error('Cannot XOR empty input.')
  const [init, ...rest] = arr
  return rest.reduce((result, next) => {
    if (result.length !== init.length)
      throw new Error('Cannot XOR different length inputs.')
    return result.map((el, i) => el ^ next[i])
  }, init)
}
