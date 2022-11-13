import { Readable } from 'stream'
import { token } from '/utils/token'

export default async function handler(req, res) {
  const stream = await fetch('https://tv.media.jio.com/streams_live/' + req.query.key + token(req.query.s), {
    headers: {
      channelid: 'android',
      deviceId: 'android',
      devicetype: 'android',
      os: 'android',
      srno: 'android',
      ssotoken: req.query.s,
      uniqueId: req.query.u,
      'User-Agent': 'android',
      usergroup: 'android',
      versionCode: 'android',
    },
  })

  const output = Readable.from(await stream.buffer())

  res.setHeader('Access-Control-Allow-Origin', '*')

  res.status(200).send(output)
}
