export default async function handler(req, res) {
  const number = '+91' + req.query.number.slice(3)

  try {
    console.log(`Requesting OTP for ${number}`)

    let response = await fetch('https://api.jio.com/v3/dip/user/otp/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': 'l7xx75e822925f184370b2e25170c5d5820a',
      },
      body: JSON.stringify({
        identifier: number,
        otpIdentifier: number,
        action: 'otpbasedauthn',
      }),
    })

    response = await response.json()

    console.log(response)
  } catch {}

  res.end()
}
