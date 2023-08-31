'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

import { useModalState, useModalDispatch } from '@/context/modalContext'

export default function Modal() {
  const dispatch = useModalDispatch()
  const state = useModalState()

  const router = useRouter()

  const onClick = () => {
    dispatch({ type: 'NON_ERROR' })
    if (state.title === '회원가입 성공') router.push('/')
    else if (state.title === '로그인 성공') router.push('/nextPage/login')
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(40, 40, 40, .1) ',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
      }}
    >
      <Box
        sx={{
          width: '300px',
          height: '300px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          jjustifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ color: 'black', fontSize: '30px', margin: '10px' }}>
          {state.title}
        </Box>
        <Box sx={{ color: 'black', fontSize: '20px', margin: '10px' }}>
          {state.description}
        </Box>
        <Button onClick={onClick}>확인</Button>
      </Box>
    </Box>
  )
}
