import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { taskSlice } from '@/redux/taskSlice'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ApiProvider api={taskSlice}>
      <Component {...pageProps} />
    </ApiProvider>
  )
}
