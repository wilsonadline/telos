import React from 'react'
import { useTheme } from '@mui/material'
import { tokens } from '../theme';

const Separator = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <hr style={{border: "1px solid", width: "100%", margin: 0}} />
  )
}

export { Separator }