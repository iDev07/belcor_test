import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, Paper, Grid } from '@mui/material';
import { RootState } from './store/store';
import LoginForm from './components/LoginForm';
import ManipulatorGrid from './components/ManipulatorGrid';
import CommandInput from './components/CommandInput';
import CommandHistory from './components/CommandHistory';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <ManipulatorGrid />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <CommandInput />
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={3} sx={{ p: 2 }}>
          <CommandHistory />
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
