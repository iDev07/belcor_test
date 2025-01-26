import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { RootState } from '../store/store';

const CommandHistory: React.FC = () => {
  const history = useSelector((state: RootState) => state.manipulator.history);

  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        История Команд
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Исходная Команда</TableCell>
              <TableCell>Оптимизированная Команда</TableCell>
              <TableCell>Дата и Время</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.originalCommand}</TableCell>
                <TableCell>{entry.optimizedCommand}</TableCell>
                <TableCell>
                  {new Date(entry.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommandHistory;
