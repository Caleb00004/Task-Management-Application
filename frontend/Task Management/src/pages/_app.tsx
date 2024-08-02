import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import { ContextProvider } from '../../globalContext/ContextProvider'
// import { DataContextProvider } from '../../globalContext/DataContext'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { taskSlice } from '@/redux/taskSlice'
// import { apiSlice } from '../../api_feature/apiSLice'
// import {Toaster} from "react-hot-toast"
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ApiProvider api={taskSlice}>
      <Component {...pageProps} />
    </ApiProvider>
  )
  // return (
  //   <ApiProvider api={apiSlice}>
  //     <ContextProvider>
  //       <DataContextProvider>
  //         <div className='z-[10]'>
  //           <Toaster />
  //         </div>
  //         <Component {...pageProps} />
  //       </DataContextProvider>
  //     </ContextProvider>
  //   </ApiProvider>
  // )
}
