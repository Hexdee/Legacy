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

  return (
    <Box>
      {view === views.HOME &&
        <Home handleGetStarted={() => {setView(views.FILL_FORM); } } />
      }
      {view === views.FILL_FORM && <Form handleSecureNow={() => { setView(views.SELECT_TOKENS);}} />}
      {view === views.SELECT_TOKENS && <SelectTokens handdleProceed={() => { setView(views.CHECK_INTERVAL);}} />}
      {view === views.CHECK_INTERVAL && <CheckInterval handleProceedToSuccess={() => { setView(views.DISPLAY_SUCCESS); }} />}
      {view === views.DISPLAY_SUCCESS && <SuccessMessage handleGoHome={() => { setView(views.HOME); } } />}
    </Box>
  );
}

export default App;
