import React from 'react';
import { Card, CardContent, Typography, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TransporterCard = ({ transporter }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/view-transporter', { state: { transporter } });
  };

  return (
    <ButtonBase onClick={handleClick} style={{ width: '100%' }}>
      <Card sx={{ mb: 2, width: '100%' }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {transporter.name}
          </Typography>
          <Typography color="text.secondary">
            ₹{transporter.amount.toLocaleString('en-IN')}/-
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default TransporterCard;