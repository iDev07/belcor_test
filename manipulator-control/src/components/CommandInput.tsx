import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Typography,
  Slider,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  ArrowBack,
  ArrowForward,
  PanTool,
  OpenWith,
} from '@mui/icons-material';
import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  grabSample,
  releaseSample,
  addToHistory,
} from '../store/manipulatorSlice';
import { optimizeCommand } from '../utils/commandOptimizer';
import { CommandHistory } from '../types/types';

const CommandInput: React.FC = () => {
  const dispatch = useDispatch();
  const [currentCommand, setCurrentCommand] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(500);

  const executeAction = (action: string) => {
    switch (action) {
      case 'Л':
        dispatch(moveLeft());
        break;
      case 'П':
        dispatch(moveRight());
        break;
      case 'В':
        dispatch(moveUp());
        break;
      case 'Н':
        dispatch(moveDown());
        break;
      case 'О':
        dispatch(grabSample());
        break;
      case 'Б':
        dispatch(releaseSample());
        break;
    }
    setCurrentCommand(prev => prev + action);
  };

  const handleExecute = () => {
    if (currentCommand) {
      const historyEntry: CommandHistory = {
        originalCommand: currentCommand,
        optimizedCommand: optimizeCommand(currentCommand),
        timestamp: new Date().toISOString()
      };
      
      dispatch(addToHistory(historyEntry));
      setShowSuccess(true);
      setCurrentCommand('');
    }
  };

  const handleClear = () => {
    setCurrentCommand('');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Управление Манипулятором
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Текущая команда: {currentCommand || 'Команд пока нет'}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Оптимизировано: {currentCommand ? optimizeCommand(currentCommand) : '-'}
        </Typography>
      </Box>

      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => executeAction('В')}
            startIcon={<ArrowUpward />}
          >
            Вверх (В)
          </Button>
        </Grid>
        
        <Grid item>
          <ButtonGroup variant="contained" color="primary">
            <Button onClick={() => executeAction('Л')} startIcon={<ArrowBack />}>
              Влево (Л)
            </Button>
            <Button onClick={() => executeAction('П')} startIcon={<ArrowForward />}>
              Вправо (П)
            </Button>
          </ButtonGroup>
        </Grid>
        
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => executeAction('Н')}
            startIcon={<ArrowDownward />}
          >
            Вниз (Н)
          </Button>
        </Grid>

        <Grid item>
          <ButtonGroup variant="contained" color="secondary">
            <Button onClick={() => executeAction('О')} startIcon={<PanTool />}>
              Взять (О)
            </Button>
            <Button onClick={() => executeAction('Б')} startIcon={<OpenWith />}>
              Отпустить (Б)
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item>
          <ButtonGroup variant="outlined">
            <Button onClick={handleExecute} color="success">
              Выполнить
            </Button>
            <Button onClick={handleClear} color="error">
              Очистить
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Скорость анимации (мс)</Typography>
        <Slider
          value={animationSpeed}
          onChange={(_, value) => setAnimationSpeed(value as number)}
          min={100}
          max={1000}
          step={100}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Команда успешно выполнена!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommandInput;
