export default async function handler(req, res) {
  let response = await fetch('https://api.jio.com/v3/dip/user/otp/verify', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'User-Agent': 'JioTV',
      'Access-Control-Allow-Origin': '*',
      'x-api-key': 'l7xx75e822925f184370b2e25170c5d5820a',
    },
    body: JSON.stringify({
      identifier: req.body.number,
      otp: req.body.password,
      rememberUser: 'T',
      upgradeAuth: 'Y',
      returnSessionDetails: 'T',
      deviceInfo: {
        consumptionDeviceName: 'samsung SM-G930F',
        info: {
          type: 'android',
          platform: {
            name: 'SM-G930F',
            version: '5.1.1',
          },
          androidId: '3022048329094879',
        },
      },
    }),
  })

  response = await response.json()

  console.log(response)

  if (response.ssoLevel === '20') {
    res.status(200).json({
      ssoToken: response.ssoToken,
      unique: response.sessionAttributes.user.unique,
    })
  } else {
    res.status(404).json({
      error: 'User Invalid',
    })
  }
}
