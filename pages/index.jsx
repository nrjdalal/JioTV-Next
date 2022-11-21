import { useEffect, useState } from 'react'

import channels from '/data/channels'
import Image from 'next/image'
import Link from 'next/link'

const Index = () => {
  const [logged, setLogged] = useState(true)
  const [number, setNumber] = useState('+91')
  const [password, setPassword] = useState('')
  const [isOTP, setIsOtp] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('session')

    if (user === null) {
      setLogged(false)
    }
  }, [logged])

  const sendOTP = async () => {
    await fetch(`/api/otp?number=${number}`)
    setIsOtp(true)
  }

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
      setIsOtp(false)
    }
  }

  const logOut = () => {
    localStorage.removeItem('session')
    setLogged(false)
  }

  return (
    <div className="relative select-none bg-slate-500 py-8 px-4">
      <div
        className={`top-0 left-0 z-10 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-75 ${
          !logged ? 'fixed' : 'hidden'
        }`}
      >
        <div className="flex flex-col items-center gap-y-4 rounded-xl bg-slate-300 p-8 text-slate-900">
          {!isOTP ? (
            <>
              <label>Jio Number</label>
              <input
                className="rounded-lg text-center"
                onChange={(e) => setNumber(e.target.value)}
                type="text"
                value={number}
              />
              <button className="my-1 w-full rounded-lg bg-slate-900 py-2 text-white" onClick={sendOTP}>
                Request OTP
              </button>
            </>
          ) : (
            <>
              <label>OTP</label>
              <input
                className="rounded-lg text-center"
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                value={password}
              />
              <button className="my-1 w-full rounded-lg bg-slate-900 py-2 text-white" onClick={login}>
                Verify
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto min-h-screen  max-w-6xl">
        <div className="flex justify-end">
          <div className="rounded-lg bg-white py-1 px-4">
            {logged ? <button onClick={logOut}>Log Out</button> : 'Log In'}{' '}
          </div>
        </div>
        {
          // ~ Search Channels
        }
        <main className="mt-4 flex items-center justify-between">
          <input
            type="text"
            className="h-12 w-full rounded-lg border-2 border-slate-500 text-center text-lg placeholder:text-slate-300 md:text-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Channel Here!"
          />
        </main>
        {
          // ~ Show Channels
        }
        <div className="mt-8 grid grid-cols-3 gap-3 text-xs md:gap-6 md:text-base lg:grid-cols-4 lg:gap-8">
          {channels.result
            .filter((x) => x.channel_name.toLowerCase().includes(search.toLowerCase()))
            .map((channel, key) => {
              return (
                <Link href={`/${channel.logoUrl.split('.')[0]}`} key={key}>
                  <div className="flex w-full cursor-pointer flex-col items-center gap-y-2 rounded-xl bg-slate-100 p-4">
                    <Image
                      src={`http://jiotv.catchup.cdn.jio.com/dare_images/images/` + channel.logoUrl}
                      alt=""
                      width={200}
                      height={150}
                    />
                    <p className="text-center">{channel.channel_name}</p>
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Index
