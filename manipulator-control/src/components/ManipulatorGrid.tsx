import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Paper, Grid } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import PanToolIcon from '@mui/icons-material/PanTool';

const GRID_SIZE = 8;

const ManipulatorGrid: React.FC = () => {
  const { position, samples, hasGrabbedSample, grabbedSampleId } = useSelector(
    (state: RootState) => state.manipulator
  );

  const renderCell = (x: number, y: number) => {
    const isManipulator = position.x === x && position.y === y;
    const sample = samples.find((s) => s.position.x === x && s.position.y === y);
    const isSampleGrabbed = sample?.id === grabbedSampleId;

    return (
      <Paper
        key={`${x}-${y}`}
        elevation={1}
        sx={{
          aspectRatio: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ccc',
        }}
      >
        {isManipulator && (
          <PanToolIcon
            color="primary"
            sx={{
              transform: hasGrabbedSample ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          />
        )}
        {sample && !isSampleGrabbed && <CircleIcon color="secondary" />}
      </Paper>
    );
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', p: 2 }}>
      <Grid container spacing={1}>
        {Array.from({ length: GRID_SIZE }, (_, y) => (
          <Grid item xs={12} key={y}>
            <Grid container spacing={1}>
              {Array.from({ length: GRID_SIZE }, (_, x) => (
                <Grid item xs={1.5} key={x}>
                  {renderCell(x, y)}
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManipulatorGrid;
