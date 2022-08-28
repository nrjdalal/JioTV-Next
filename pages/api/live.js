import { token } from '/utils/token'

export default async function handler(req, res) {
  const host = req.headers.host
  const protocol = req.headers.referer.split('/')[0]

  let stream = await fetch(
    `https://jiotv.live.cdn.jio.com/${req.query.c}/${req.query.c}_1200.m3u8` + token(req.query.s),
    {
      headers: {
        'User-Agent': 'plaYtv/6.0.9 (Linux; Android 5.1.1) ExoPlayerLib/2.13.2',
      },
    }
  )

  stream = await stream.text()

  stream = stream.split('\n')
  stream = stream.map((line) => {
    if (line.endsWith('.ts')) {
      return `https://jiotv.live.cdn.jio.com/${req.query.c}/${req.query.c}_1200` + line.substring(line.lastIndexOf('-'))
    }

    if (line.includes('URI=') && line.includes('IV=')) {
      let a = line.substring(0, line.indexOf('URI='))
      let b = line.substring(line.indexOf('URI='))
      let key = b.substring(b.indexOf('-'), b.lastIndexOf('"'))
      let c = b.substring(b.lastIndexOf('"'))

      return (
        a +
        `URI="${protocol}//${host}/api/stream?key=${req.query.c}/${req.query.c}_1200${key}&s=${req.query.s}&u=${req.query.u}` +
        c
      )
    }

    return line
  })

  stream = stream.join('\n')

  res.setHeader('Accept-Range', 'bytes')
  res.setHeader('Access-Control-Allow-Headers', 'Range')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl')
  res.status(200).send(stream)
}
