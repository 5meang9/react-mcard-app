import useUser from '@/hooks/auth/useUser'
import { getMyCards } from '@/remote/getMyCard'
import { css } from '@emotion/react'
import flatten  from 'lodash.flatten'
import { useQuery } from 'react-query'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import ListBlock from '../shared/ListBlock'

function MyCards(){
  const user = useUser()

  const {
    data,
    isFetching = false,
  } = useQuery(
    ['myCards'],
    () => {
      return getMyCards({userId: user?.uid as string})
    },
    {enabled: true}
  )
  const cards = flatten(data?.items)
  
  return(
    <>
      {isFetching ? (
        new Array(5).fill('').map((card, index) => (
          <ListBlock.Skeleton key={index} />
        ))
      ) : (
        <>
        {cards.length === 0 ? (
          <Flex css={noCardContainerStyles}>
            <Text typography='t6' color='gray600' bold={true}>카드신청 내역이 없습니다.</Text>
          </Flex>
        ) : (
          
          <ul>
            {cards.map((card, index) => (
              <ListBlock
                title={card.corpName}
                subTitle={card.name}
                badge={card.tags}
                key={index}
                badgeColor="yellow"
              />
            ))}
          </ul>
        )}
        </>
      )}
    </>
  )
}

const noCardContainerStyles = css`
  margin-top: 50px;
`

export default MyCards