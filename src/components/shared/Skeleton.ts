import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colors, Colors } from "@/styles/colorPalette";

const opacity = keyframes`
  0%{
    opacity: 1;
  }

  50%{
    opacity: 0.4;
  }

  100%{
    opacity: 1;
  }
`

const Skeleton = styled.div<{ width: number; height: number, radius?: string }>(
  ({ width, height, radius }) => ({
    width,
    height,
    backgroundColor: colors.gray200,
    animation: `${opacity} 2s ease-in-out 0.5s infinite`,
    borderRadius: radius ? radius : '0',
  }),
)

export default Skeleton