export default async function handler(req, res) {
  let response = await fetch('https://api.jio.com/v3/dip/user/unpw/verify', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': 'l7xx938b6684ee9e4bbe8831a9a682b8e19f',
      'app-name': 'RJIL_JioTV',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      identifier: req.body.number,
      password: req.body.password,
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

  if (response.ssoLevel === '40') {
    res.status(200).json(response)
  }

  res.status(404).json({
    error: 'User Invalid',
  })
}
