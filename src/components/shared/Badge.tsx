import { colors } from "@/styles/colorPalette";
import { SerializedStyles } from "@emotion/react";
import styled, { CSSObject } from "@emotion/styled";
import Text from "./Text";

interface BadgeProps{
  label: string;
  customStyles?: SerializedStyles;
  color?: keyof typeof colors; 
}

function Badge({label, customStyles, color}: BadgeProps){
  return(
    <Container css={customStyles} color={color}>
      <Text bold={true} typography="t7" color="white">{label}</Text>
    </Container>
  )
}

const Container = styled.div<{ color?: keyof typeof colors }>`
  border-radius: 12px;
  background-color: ${(props) => props.color ? colors[props.color] : colors.blue};
  padding: 2px 8px;
`

export default Badge