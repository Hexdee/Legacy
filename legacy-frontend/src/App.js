import './App.css';
import { Box } from '@chakra-ui/react';
import Home from './screens/home';
import { views } from './utils/constants';
import { useEffect, useState } from 'react';
import Form from './screens/form';
import SelectTokens from './screens/selectTokens';
import CheckInterval from './screens/checkInterval';
import SuccessMessage from './screens/successMsg';

function App() {
  const [ view, setView ] = useState();
  useEffect(()=>{
    setView(localStorage.getItem('has_legacy') ? views.CHECK_INTERVAL : views.HOME);
  }, []);

  const handleSecureNow = () => { setView(views.SELECT_TOKENS);}

  return (
    <Box>
      {view === views.HOME &&
        <Home handleGetStarted={() => {setView(views.FILL_FORM); } } />
      }
      {view === views.FILL_FORM && <Form handleSecureNow={handleSecureNow} />}
      {view === views.SELECT_TOKENS && <SelectTokens handleProceed={() => { setView(views.CHECK_INTERVAL);}} />}
      {view === views.CHECK_INTERVAL && <CheckInterval handleSecureNow={handleSecureNow} handleProceedToSuccess={() => { setView(views.DISPLAY_SUCCESS); }} />}
      {view === views.DISPLAY_SUCCESS && <SuccessMessage handleProceed={() => { setView(views.HOME); } } />}
    </Box>
  );
}

export default App;
