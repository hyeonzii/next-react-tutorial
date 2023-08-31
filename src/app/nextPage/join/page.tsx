'use client'
import React, { useState, useRef, ChangeEvent, useContext } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
//모달 커스텀 hook
import { useModalDispatch } from '@/context/modalContext'

interface FormValues {
  name: string
  email: string
  password: string
}

export default function Join() {
  /* 모달 상태 전역관리 */
  const dispatch = useModalDispatch()

  const [form, setForm] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = form

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const passwordRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  const onClick = () => {
    if (validation(1) && validation(2)) {
      if (password === '' || email === '' || name === '')
        return dispatch({ type: 'ERROR_TYPE_1' })
      dispatch({ type: 'SUCCESS' })
    } else {
      if (!validation(2)) {
        emailRef.current?.focus()
        console.log('이메일 틀림')
        dispatch({ type: 'ERROR_TYPE_2' })
      } else if (!validation(1)) {
        passwordRef.current?.focus()
        console.log('비밀번호 틀림')
        dispatch({ type: 'ERROR_TYPE_3' })
      }
    }
  }

  //비밀번호, 이메일 유효성
  const validation = (type: number) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W_]).{8,}$/
    const emailRegex = /.+@.+/

    switch (type) {
      case 1:
        if (password === '') return true
        return passwordRegex.test(password)
      case 2:
        if (email === '') return true
        return emailRegex.test(email)
    }
  }

  return (
    <>
      <TextField
        id="outlined-basic"
        label="이름"
        variant="outlined"
        value={name}
        name="name"
        onChange={onChange}
      />
      <TextField
        id="outlined-basic"
        label="이메일"
        variant="outlined"
        value={email}
        name="email"
        onChange={onChange}
        inputRef={emailRef}
        error={!validation(2)}
        helperText={validation(2) ? '' : '잘못된 이메일 형식 입니다.'}
      />
      <TextField
        id="outlined-basic"
        label="패스워드"
        type="Password"
        variant="outlined"
        value={password}
        name="password"
        onChange={onChange}
        inputRef={passwordRef}
        error={!validation(1)}
        helperText={
          validation(1)
            ? ''
            : '비밀번호는 8자 이상, 특수 문자 1개 이상, 영문 소문자 최소 1개, 영문 대문자 최소 1개의 조건을 만족해야 합니다.'
        }
      />
      <Button variant="outlined" onClick={onClick}>
        가입하기
      </Button>
      <Link href="/">
        <Button variant="outlined">HOME</Button>
      </Link>
    </>
  )
}
