import { colors } from "@/styles/colorPalette";
import { SerializedStyles } from "@emotion/react";
import styled, { CSSObject } from "@emotion/styled";
import Text from "./Text";

interface BadgeProps{
  label: string;
  customStyles?: SerializedStyles;
}

function Badge({label, customStyles}: BadgeProps){
  return(
    <Container css={customStyles}>
      <Text bold={true} typography="t7" color="white">{label}</Text>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue};
  padding: 2px 8px;
`

export default Badge