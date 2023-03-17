import Head from 'next/head'
import Header from '@/components/Header'
import Feeds from '@/components/Feeds'
import UploadModal from '@/components/UploadModal'

export default function Home() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Head>
        <title>Instagram Clone</title>
        <meta name="description" content="Instagram Clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Feeds />
      <UploadModal />
    </div>
  )
}
