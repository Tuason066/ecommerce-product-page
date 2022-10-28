import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AsideMenu from './components/AsideMenu';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { useGlobalContext } from './context';
import Lightbox from './components/Lightbox';

function App() {
  const { isAsideMenu, isLightbox } = useGlobalContext();

  return (
    <BrowserRouter>
      {isAsideMenu && <AsideMenu />}
      {isLightbox && <Lightbox /> }
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
