import './App.css';
import { BrowserRouter, useLocation,  } from 'react-router-dom';
import AppRoutes from './routes';
import HeaderApp from './components/Pestanias/HeaderApp';
import FooterApp from './components/Pestanias/FooterApp';

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';
  return (
    <>
      {!hideHeaderFooter && <HeaderApp/>}
      <div className="App">
        <AppRoutes/>
      </div>
      {!hideHeaderFooter && <FooterApp/>}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;