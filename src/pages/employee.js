import { Box } from '@mui/system'
import React from 'react'
import Card from '@mui/material/Card';
import Cards from '../components/Card/employeeCard';

const Employee = () => {
  return (
    <div>
        <Box sx={{ minWidth: 275 }}>
        <div className='card'>
      <Card variant="outlined"><Cards/></Card>
      </div>
    </Box>
    </div>
  )
}

export default Employee