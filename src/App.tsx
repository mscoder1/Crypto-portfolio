import './App.css';
import Navbar from './Components/Navbar/Navbar';
import AppRouter from './Components/Routes/AppRouter';

const App = () => {
  return (
    <div style={{
      width: '100%', height: '100vh', backgroundColor: '#FDFDF6', display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}
    >
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default App;
