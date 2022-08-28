const CryptoJS = require('crypto-js')

export const token = (ssoToken) => {
  const magic = (str) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.MD5(str))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/\r/g, '')
      .replace(/\n/g, '')
  }

  const st = magic(ssoToken)
  const pxe = Math.round(new Date().getTime() / 1000) + 6000000
  const jct = magic('cutibeau2ic' + st + pxe).trim()
  return `?jct=${jct}&pxe=${pxe}&st=${st}`
}
