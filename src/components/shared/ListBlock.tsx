import { colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";
import Badge from "./Badge";
import Flex from "./Flex";
import Text from "./Text";

interface ListBlockProps{
  title: React.ReactNode;
  subTitle: React.ReactNode;
  badge?: React.ReactNode;
  as?: 'div' | 'li'
}

function ListBlock({as = 'li', title, subTitle, badge}: ListBlockProps){
  // console.log('badge',badge)
  return(
    <Flex as={as} css={listRowContainerStyles} direction='column'>
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
            <Badge label={tag} key={i} customStyles={customStyles} color='yellow' />
          ))
        ) : (
          null
        )}
      </Flex>
    </Flex>
    
  )
}


function ListBlockSkeleton(){
  return(
    <Flex as='li' css={listRowContainerStyles} direction='column'>

    </Flex>
  )
}

export default ListBlock


const listRowContainerStyles = css`
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