'use client';
import Image from "next/image";
import { useState } from "react";
import { Box, Stack } from "@mui/material";



export default function Home() {
  const [messages, setMessages] = useState([{
      role: 'assistant',
      Content: 'Hi! I am the the HeadStarter support agent, how can I assist you today?'
  }]);
  const [message, setMessage] = useState('');
  return (
    <box width='100vw' height='100vh' display='flex' flexDirection = 'column' justifyContent='ceter' alignItems='center'>
      <Stack direction="column" width="600px"height="700px"border="1px solid black"p={2}spacing={3}>
            <Stack direction="column"spacing={2}fLexGrow={1}overflow="auto"maxHeight="100%">

              {
                messages.map((message, index) => {
                  <Box key={index} display="flex" justifyContent={message.role ==='assistant' ? 'flex-start' : 'flex-end'}>
                    <Box bgcolor={message.role === 'assistant' ? 'primary.main': 'seccondary.main'}color="white"borderRadius={16}p={3}>
                      {message.content}
                      </Box>
                    </Box>  

                })
              }

            
            </Stack>
          </Stack>
    </box>



  );

}
