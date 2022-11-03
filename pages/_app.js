import '../styles/globals.css'
import Header from '../components/header/header';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/index';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
            <Header />
            <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </UserProvider>
  )
}

export default MyApp
