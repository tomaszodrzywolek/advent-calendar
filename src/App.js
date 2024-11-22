import './App.css';
import { NewCalendar } from './components/newCalendar/NewCalendar';
// import { OldCalendar } from './components/OldCalendar';

function App() {

  return (
    <div className="App">
      <h1 className='title'>Kalendarz adwentowy 2024 Darii</h1>
      {/* <OldCalendar /> */}
      <NewCalendar />
    </div>
  );
}

export default App;
