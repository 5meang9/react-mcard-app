import { cardAtom } from "@/atoms/card";
import { colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";
import React from "react";
import { useRecoilValue } from "recoil";
import Badge from "./Badge";
import Flex from "./Flex";
import Skeleton from "./Skeleton";
import Spacing from "./Spacing";
import Text from "./Text";

interface ListBlockProps{
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  badge?: React.ReactNode;
  badgeColor?: keyof typeof colors;
  as?: 'div' | 'li',
}

function ListBlock({as = 'li', title, subTitle, badge, badgeColor}: ListBlockProps){

  return(
    <Flex as={as} css={listBlockContainerStyles} direction='column'>
      <Flex direction='column'>
        <Text bold={true} typography="t6">
          {title}
        </Text>
        <Text typography='t7'>
          {subTitle}
        </Text>
      </Flex>
      <Flex css={badgeListContainerStyles}>
        {Array.isArray(badge) ? (
          badge.map((tag, i) => (
            <Badge label={tag} key={i} customStyles={customStyles} color={badgeColor} />
          ))
        ) : (
          null
        )}
      </Flex>
    </Flex>
  )
}


function ListBlockSkeleton() { // cardLength 추가

  return (
    <>
      <Skeleton width={310} height={125.5} radius="10px" />
      <Spacing size={10}/>
    </>
  );
}


ListBlock.Skeleton = ListBlockSkeleton

export default ListBlock


const listBlockContainerStyles = css`
  padding: 24px;
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  margin-bottom: 10px;
`
const badgeListContainerStyles = css`
  padding: 10px 0 0;
`

const customStyles = css`
  margin-right: 10px;
`