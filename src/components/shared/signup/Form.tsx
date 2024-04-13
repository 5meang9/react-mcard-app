import Flex from "../Flex";
import TextField from "../TextField";
import FixedBottomButton from "../FixedBottomButton";
import { css } from "@emotion/react";
import Spacing from "../Spacing";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { FormValues } from "@/models/signup";
import validator from "validator";


function Form({onSubmit}: {onSubmit: (formValues: FormValues) => void}){
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  });

  const [ dirty, setDirty] = useState<Partial<FormValues>>({})

  const errors = useMemo(() => validate(formValues), [formValues])

  const 재출가능한상태인가 = Object.keys(errors).length === 0

  // 변경되지 않은 기존 값은 그대로 유지 및 변경된 값 반영
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value, // 변경된 값 반영
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  },[])

  return(
    <Flex direction="column" css={formContainerStyles}>
      <TextField label="이메일" placeholder="test@gmail.com" value={formValues.email} name="email" onChange={handleFormValues} hasError={Boolean(dirty.email) && Boolean(errors.email)} helpMessage={Boolean(dirty.email) ? errors.email : ''} onBlur={handleBlur} />
      <Spacing size={16} />
      <TextField label="패스워드" type="password" value={formValues.password} name="password" onChange={handleFormValues} hasError={Boolean(dirty.password) && Boolean(errors.password)} helpMessage={Boolean(dirty.password) ? errors.password : ''} onBlur={handleBlur} />
      <Spacing size={16} />
      <TextField label="패스워드 재확인" type="password" value={formValues.rePassword} name="rePassword" onChange={handleFormValues} hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)} helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''} onBlur={handleBlur} />
      <Spacing size={16} />
      <TextField label="이름" placeholder="바밤바" value={formValues.name} name="name" onChange={handleFormValues} hasError={Boolean(dirty.name) && Boolean(errors.name)} helpMessage={Boolean(dirty.name) ? errors.name : ''} onBlur={handleBlur} />

      <FixedBottomButton label="회원가입" disabled={재출가능한상태인가 === false} onClick={() => {onSubmit(formValues)}} />
    </Flex>
  )
}

const formContainerStyles =  css`
  padding: 24px
`

function validate(formValues: FormValues){
  let errors: Partial<FormValues> = {}

  if(validator.isEmail(formValues.email) === false){
    errors.email = '이메일 형식을 확인해주세요'
  }

  if(formValues.password.length < 8){
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }
  
  if(formValues.rePassword.length < 8){
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요'
  }else if(validator.equals(formValues.rePassword, formValues.password) === false){
    errors.rePassword = '비밀번호를 확인해주세요'
  }

  if(formValues.name.length < 2){
    errors.name = '이름은 2글자 이상 입력해주세요'
  }

  return errors
}

export default Form