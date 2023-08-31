'use client'
import React, { useReducer, useContext, createContext, Dispatch } from 'react'
import Modal from '../components/modal'

/* 타입선언 */

//모달 창 유무
type ModalState = { isModal: boolean; title?: string; description?: string }

const initialState: ModalState = {
  isModal: false,
  title: undefined,
  description: undefined,
}

//모든 액션들을 위한 타입
// 순서대로 1: 공란이 하나라도 있을 경우 2: 이메일 틀렸을 경우 3: 패스워드 틀렸을 경우
type ModalAction =
  | { type: 'ERROR_TYPE_1' }
  | { type: 'ERROR_TYPE_2' }
  | { type: 'ERROR_TYPE_3' }
  | { type: 'SUCCESS' }
  | { type: 'NON_ERROR' }
  | { type: 'LOG-IN' }
  | { type: 'LOG-IN-FAIL' }

//디스패치를 위한 타입 (Dispatch를 리액트에서 불러올 수 있음)
//액션들의 타입을 Dispatch의 Generics로 설정
type ModalDispatch = Dispatch<ModalAction>

/* Context */
//Context 만들기
const ModalStateContext = createContext<ModalState | null>(null)
const ModalDispatchContext = createContext<ModalDispatch | null>(null)

/* Reducer */
//리듀서
function reducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'ERROR_TYPE_1':
      return {
        isModal: true,
        title: '오류',
        description: '모든 항목을 채워주십시오.',
      }
    case 'ERROR_TYPE_2':
      return {
        isModal: true,
        title: '오류',
        description: '이메일이 잘못되었습니다.',
      }
    case 'ERROR_TYPE_3':
      return {
        isModal: true,
        title: '오류',
        description:
          '비밀번호는 8자 이상 + 특수문자 1개 이상 + 영문 소문자 최소 1개 + 영문 대문자 최소 1개 조건을 만족해야합니다.',
      }
    case 'SUCCESS':
      return {
        isModal: true,
        title: '회원가입 성공',
        description: '회원가입이 완료되었습니다.',
      }
    case 'NON_ERROR':
      return { isModal: false, title: undefined, description: undefined }
    case 'LOG-IN':
      return { isModal: true, title: '로그인 성공', description: undefined }
    case 'LOG-IN-FAIL':
      return {
        isModal: true,
        title: '로그인 실패',
        description: '아이디와 비밀번호를 확인해주십시오.',
      }
    default:
      return state
  }
}

/* Provider */
//Provider에서 useReducer를 사용하고
//ModalStateContext.Provider 와 ModalDispatchContext.Provider로 children을 감싸서 반환합니다.
//기존에 state와 dispatch를 넣어서 반환하는 것과 동일한 것 같음

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  //여기 children에는 하위 컴포넌트들이 다 들어갈 것!
  //children -> 리액트에서 자동으로 주입해주는 예약어 개념

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        {state.isModal && <Modal />}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  )
}

/* custom Hook */
// state 와 dispatch를 쉽게 사용하기 위한 커스텀 Hook

export function useModalState() {
  const state = useContext(ModalStateContext)

  if (!state) throw new Error('useModalState: Cannot find ModalProvider')
  return state
}

export function useModalDispatch() {
  const dispatch = useContext(ModalDispatchContext)

  if (!dispatch) throw new Error('useModalDispatch: Cannot find ModalProvider')
  return dispatch
}
