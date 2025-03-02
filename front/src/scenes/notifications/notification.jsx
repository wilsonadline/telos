import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from "../../theme";
import React from 'react'
import { Separator } from '../../components/Separator'
import { notifications } from '../../data/notificationsData'

const Notifications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box 
      style={{ 
        width: "25rem", borderRadius: "10px",
        padding: "0 0 0 5px", height: "25rem",
      }}
    >
      
      <Typography style={{fontSize: "2rem", fontWeight: "700"}}>
        Notifications
      </Typography>
      <Separator />
      <Box style={{ marginTop: '5px' }}>
        {notifications.map((notification, index) => (
          <>
            <Box key={index} style={{ marginBottom: '1rem' }}>

              <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: "5px" }}>
                <Typography style={{ fontWeight: '600' }}>{notification.sender}</Typography>
                <Typography style={{ color: 'gray', marginRight: "10px" }}>{notification.date}</Typography>
              </Box>

              <Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', maxWidth: "20rem" }}>
                {notification.description}
              </Typography>
            </Box>
            <Separator />
          </>
        ))}
      </Box>
    </Box>
  )
}

export { Notifications }