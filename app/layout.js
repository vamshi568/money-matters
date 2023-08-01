
import Main from '@/components/main'
import './globals.css'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Money Matters',
  description: 'A money transactio manager',

}

export default function RootLayout({ children }) {
  
    return (
    <html lang="en">
      <head>
      <link rel="icon" href="grouplogo.png" />

      </head>
      <body className={`${inter.className}`}>
        <Main children={children}/>
        </body>
    </html>
  )
}
