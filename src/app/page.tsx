import Image from 'next/image'
import styles from './page.module.css'
import Spinner from './pages/images/spinner.svg'

export default function Home() {
  return (
    <div className="w-10 h-10 bg-red-500">
      <Spinner color={'black'} width={30} height={30} />
    </div>
  )
}
