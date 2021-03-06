/**
 * Converts a HEX color string to an RGB color object.
 *
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
export default function convertHexToRgb (hex) {
  const hexWithoutHash = hex.replace(/^#/, '')

  const hexChannels =
    [3, 4].includes(hexWithoutHash.length)
      ? hexWithoutHash.match(/.{1}/g).map(channel => channel + channel)
      : hexWithoutHash.match(/.{2}/g)

  const rgbChannels = hexChannels.map(channel => parseInt(channel, 16) / 255)

  return {
    r: rgbChannels[0],
    g: rgbChannels[1],
    b: rgbChannels[2],
    a: rgbChannels.length === 4 ? rgbChannels[3] : 1,
  }
}
