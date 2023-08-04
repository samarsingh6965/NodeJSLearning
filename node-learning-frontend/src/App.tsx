import type { FC } from 'react';
import './App.css';
import Router from './Components/Router/Router';
import Navbar from './Components/Common/Navbar';

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
    </div>
  );
}

export default App;