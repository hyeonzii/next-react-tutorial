'use client'
import styles from './page.module.css'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useModalDispatch } from '@/context/modalContext'

interface FormValues {
  email: string
  password: string
}

export default function Home() {
  // 라우터 훅
  const router = useRouter()

  /* 모달 상태 전역관리 */
  const dispatch = useModalDispatch()

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm()

  return (
    <>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
        onSubmit={handleSubmit(async (data) => {
          await new Promise((r) => setTimeout(r, 1000))

          if (
            data.email.toString() === 'helloworld@gmail.com' &&
            data.password.toString() === 'Qwer!234'
          ) {
            console.log('로그인 성공!')
            dispatch({ type: 'LOG-IN' })
          } else {
            dispatch({ type: 'LOG-IN-FAIL' })
          }
        })}
      >
        <TextField
          id="outlined-basic"
          label="이메일"
          variant="outlined"
          aria-invalid={
            isSubmitted ? (errors.email ? 'true' : 'false') : undefined
          }
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '이메일 형식에 맞지 않습니다.',
            },
          })}
        />
        {errors.email && <small role="alert">{errors.email.message}</small>}
        <TextField
          id="outlined-basic"
          label="비밀번호"
          variant="outlined"
          type="Password"
          aria-invalid={
            isSubmitted ? (errors.password ? 'true' : 'false') : undefined
          }
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            minLength: {
              value: 8,
              message: '8자리 이상 비밀번호를 사용하세요.',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W_])/,
              message: '비밀번호 형식에 맞지 않습니다.',
            },
          })}
        />
        {errors.password && (
          <small role="alert">{errors.password.message}</small>
        )}
        <Button variant="outlined" type="submit" disabled={isSubmitting}>
          로그인
        </Button>
      </form>
      <Link href="/nextPage/join">
        <Button variant="outlined">회원가입</Button>
      </Link>
    </>
  )
}
