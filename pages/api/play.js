export default function handler(req, res) {
  const host = req.headers.host
  const protocol = req.headers.referer.split('/')[0]

  const stream = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:PROGRAM-ID=1,CLOSED-CAPTIONS=NONE,BANDWIDTH=1200000,RESOLUTION=1920x1080
${protocol}//${host}/api/live?c=${req.query.c}&s=${req.query.s}&u=${req.query.u}
#EXT-X-STREAM-INF:PROGRAM-ID=1,CLOSED-CAPTIONS=NONE,BANDWIDTH=800000,RESOLUTION=1280x720
${protocol}//${host}/api/live?c=${req.query.c}&s=${req.query.s}&u=${req.query.u}
#EXT-X-STREAM-INF:PROGRAM-ID=1,CLOSED-CAPTIONS=NONE,BANDWIDTH=600000,RESOLUTION=842x480
${protocol}//${host}/api/live?c=${req.query.c}&s=${req.query.s}&u=${req.query.u}
#EXT-X-STREAM-INF:PROGRAM-ID=1,CLOSED-CAPTIONS=NONE,BANDWIDTH=400000,RESOLUTION=640x360
${protocol}//${host}/api/live?c=${req.query.c}&s=${req.query.s}&u=${req.query.u}
#EXT-X-STREAM-INF:PROGRAM-ID=1,CLOSED-CAPTIONS=NONE,BANDWIDTH=250000,RESOLUTION=426x240
${protocol}//${host}/api/live?c=${req.query.c}&s=${req.query.s}&u=${req.query.u}
`

  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl')

  res.setHeader('Access-Control-Allow-Origin', '*')

  res.status(200).send(stream)
}
