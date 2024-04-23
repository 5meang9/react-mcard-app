import useUser from '@/hooks/auth/useUser'
import { getMyCards } from '@/remote/getMyCard'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import flatten  from 'lodash.flatten'
import { useCallback, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery, useQuery } from 'react-query'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Badge from '../shared/Badge'

function MyCards(){
  const user = useUser()
  // const { data } = useQuery(['myCards'], () => getMyCards({userId: user?.uid as string}))

  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['myCards'],
    () => {
      return getMyCards({userId: user?.uid as string})
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense: true,
    },
  )

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) {
    return null
  }

  const cards = flatten(data?.pages.map(({ items }) => items))

  return(
    
    <InfiniteScroll
      dataLength={cards.length}
      hasMore={false}
      loader={<></>}
      next={loadMore}
    >
      <ul css={ulContainerstyles}>
        {cards.map((card, index) => {
          return(
            <Flex as='li' css={listRowContainerStyles} direction='column' key={index}>
              <Flex direction='column'>
                <Text bold={true} typography="t6">
                  {card.corpName}
                </Text>
                <Text typography='t7'>
                  {card.name}
                </Text>
              </Flex>
              <Flex css={badgeListContainerStyles}>
                {(card.tags).map((tag, i) => {
                  return(<Badge label={tag} key={i} />)
                })}
              </Flex>
            </Flex>
          )
        })}
      </ul>
    </InfiniteScroll>
  )
}

const ulContainerstyles = css`
  padding: 16px;
`

const listRowContainerStyles = css`
  padding: 24px;
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  margin-bottom: 10px;
`
const badgeListContainerStyles = css`
  padding: 10px 0;
`

export default MyCards