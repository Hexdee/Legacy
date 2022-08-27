import './App.css';
import { Box } from '@chakra-ui/react';
import Home from './screens/home';
import { views } from './utils/constants';
import { useState } from 'react';
import Form from './screens/form';
import SelectTokens from './screens/selectTokens';

function App() {
  const [ view, setView ] = useState(views.HOME);
  return (
    <Box>
      {view === views.HOME &&
        <Home handleGetStarted={(e) => {setView(views.FILL_FORM); e.preventDefault(); } } />
      }
      {view === views.FILL_FORM && <Form handleSecureNow={(e) => { setView(views.SELECT_TOKENS); e.preventDefault(); }} />}
      {view === views.SELECT_TOKENS && <SelectTokens />}
    </Box>
  );
}

export default App;
