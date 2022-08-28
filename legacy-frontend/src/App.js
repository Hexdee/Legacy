import './App.css';
import { Box } from '@chakra-ui/react';
import Home from './screens/home';
import { views } from './utils/constants';
import { useState } from 'react';
import Form from './screens/form';
import SelectTokens from './screens/selectTokens';
import CheckInterval from './screens/checkInterval';
import SuccessMessage from './screens/successMsg';

function App() {
  const [ view, setView ] = useState(views.HOME);
  return (
    <Box>
      {view === views.HOME &&
        <Home handleGetStarted={() => {setView(views.FILL_FORM); } } />
      }
      {view === views.FILL_FORM && <Form handleSecureNow={(e) => { setView(views.SELECT_TOKENS); e.preventDefault(); }} />}
      {view === views.SELECT_TOKENS && <SelectTokens handdleProceed={(e) => { setView(views.CHECK_INTERVAL); e.preventDefault(); }} />}
      {view === views.CHECK_INTERVAL && <CheckInterval handleProceedToSuccess={(e) => { setView(views.DISPLAY_SUCCESS); e.preventDefault(); }} />}
      {view === views.DISPLAY_SUCCESS && <SuccessMessage handleGoHome={(e) => { setView(views.HOME); e.preventDefault(); } } />}
    </Box>
  );
}

export default App;
