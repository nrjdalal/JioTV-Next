import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const Home = () => {
  const [logged, setLogged] = useState(true)
  const [number, setNumber] = useState('+91')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  const router = useRouter()

  useEffect(() => {
    const checkUser = localStorage.getItem('session')

    if (checkUser === null) {
      setLogged(false)
    }

    setUser(JSON.parse(checkUser))
  }, [logged])

  const login = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        number,
        password,
      }),
    })
    if (response.status === 200) {
      localStorage.setItem('session', JSON.stringify(await response.json()))
      setLogged(true)
    }
  }

  return (
    <>
      <div className="relative flex min-h-screen w-screen items-center justify-center bg-black">
        <div
          className={`top-0 left-0 z-10 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-75 ${
            !logged ? 'fixed' : 'hidden'
          }`}
        >
          <div className="flex flex-col items-center gap-y-4 rounded-xl bg-slate-300 p-8 text-slate-900">
            <label>Jio Number</label>
            <input
              className="rounded-lg text-center"
              onChange={(e) => setNumber(e.target.value)}
              type="text"
              value={number}
            />
            <label>Password</label>
            <input className="rounded-lg text-center" onChange={(e) => setPassword(e.target.value)} type="password" />
            <button className="my-1 w-full rounded-lg bg-slate-900 py-2 text-white" onClick={login}>
              Login
            </button>
            <p>
              No Password?{' '}
              <a
                className="underline"
                href="https://www.jio.com/Enterprise/jio-business/ohs/Support/ForgotPassword/"
                target="_blank"
                rel="noreferrer"
              >
                Set Password
              </a>
            </p>
          </div>
        </div>

        <div className="h-screen">
          <ReactPlayer
            url={'/api/play' + `?c=${router.asPath.substring(1)}&s=${user?.ssoToken}&u=${user?.unique}`}
            controls={true}
            playing={true}
            muted={false}
            width="100%"
            height="100%"
            config={{
              file: {
                forceHLS: true,
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Home
