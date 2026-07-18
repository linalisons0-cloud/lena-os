import {useState} from 'react';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import Glow from './pages/Glow.jsx';
import Fitness from './pages/Fitness.jsx';
import Health from './pages/Health.jsx';
import Life from './pages/Life.jsx';

export default function App(){
  const [page,setPage]=useState('home');
  const [refresh,setRefresh]=useState(0);
  const pages={
    home:<Home refresh={refresh} setRefresh={setRefresh} setPage={setPage}/>,
    glow:<Glow/>,
    fitness:<Fitness/>,
    health:<Health/>,
    life:<Life/>
  };
  return <div className="app">{pages[page]}<Nav page={page} setPage={setPage}/></div>
}
