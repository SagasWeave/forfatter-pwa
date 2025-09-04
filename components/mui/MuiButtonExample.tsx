import React from 'react';
import { Button } from '@mui/material';

interface MuiButtonExampleProps {
  label: string;
  onClick: () => void;
}

const MuiButtonExample: React.FC<MuiButtonExampleProps> = ({ label, onClick }) => {
  return (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default MuiButtonExample;