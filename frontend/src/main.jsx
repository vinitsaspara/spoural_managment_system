
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import store from './redux/store'


import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persister = persistStore(store); 


createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
    <Toaster />
  </>
)
