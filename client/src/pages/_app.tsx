import Axios from 'axios';
import '../style/global.style.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/auth';
import { Fragment } from 'react';
import axios from 'axios';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {

  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  Axios.defaults.withCredentials = true;
  
  const fetcher = async(url: string) => {
    try {
      const res = await axios.get(url);
      const data = await res.data;
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
  return (
    <Fragment>
      <SWRConfig
        value={{
          fetcher
        }}
      >
        <AuthProvider>
          <Component {...pageProps}/>
        </AuthProvider>
      </SWRConfig>
    </Fragment>)
}
