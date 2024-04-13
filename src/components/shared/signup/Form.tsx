import Flex from "../Flex";
import TextField from "../TextField";
import FixedBottomButton from "../FixedBottomButton";
import { css } from "@emotion/react";
import Spacing from "../Spacing";

function Form(){
  return(
    <Flex direction="column" css={formContainerStyles}>
      <TextField label="이메일" placeholder="test@gmail.com" />
      <Spacing size={16} />
      <TextField label="패스워드" type="password" />
      <Spacing size={16} />
      <TextField label="패스워드 재확인" type="password" />
      <Spacing size={16} />
      <TextField label="이름" placeholder="바밤바" />

      <FixedBottomButton label="회원가입" disabled={true} onClick={() => {}} />
    </Flex>
  )
}

const formContainerStyles =  css`
  padding: 24px
`

export default Form