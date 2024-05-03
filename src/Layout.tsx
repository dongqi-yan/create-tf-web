import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { changeLanguage } from './i18n'
import { useTranslation } from 'react-i18next'

export default function RootLayout() {
  const { t } = useTranslation()
  return (
    <HelmetProvider>
      <Helmet>
        <meta name='apple-mobile-web-app-capable' content='yes'></meta>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
        <link rel='icon' href='/favicon.ico'></link>
      </Helmet>
      <main className='min-h-screen'>
        <nav className='flex p-4 gap-2'>
          <Link to='/'>Home</Link>
          <Link to='/my'>My</Link>
          <div className='flex gap-1'>
            <button onClick={() => changeLanguage('zh-CN')}>zhCN</button>
            <button onClick={() => changeLanguage('zh-TW')}>zhTW</button>
            <button onClick={() => changeLanguage('en-US')}>enUS</button>
          </div>
        </nav>
        <div className='p-4'>
          {t('Home')}
          <Outlet />
        </div>
      </main>
    </HelmetProvider>
  )
}
