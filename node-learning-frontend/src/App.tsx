import type { FC } from 'react';
import './App.css';
import Router from './Components/Router/Router';
import Navbar from './Components/Common/Navbar';
import { ToastContainer } from 'react-toastify';

interface AppProps { }

const App: FC<AppProps> = () => {
  return (
    <div className='w-screen h-screen'>
      <div className="h-[8vh] sticky top-0">
        <Navbar />
      </div>
      <div className='h-[92vh] px-6'>
        <Router />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default App;