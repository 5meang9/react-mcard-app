import useUser from '@/hooks/auth/useUser'
import { getMyCards } from '@/remote/getMyCard'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import flatten  from 'lodash.flatten'
import { Suspense, useCallback, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery, useQuery } from 'react-query'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Badge from '../shared/Badge'
import ListBlock from '../shared/ListBlock'

function MyCards(){
  const user = useUser()

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
    <>
      {cards.length === 0 ? (
        <Flex css={noCardContainerStyles}>
          <Text typography='t6' color='gray600' bold={true}>카드신청 내역이 없습니다.</Text>
        </Flex>
      ) : (
        <InfiniteScroll
          dataLength={cards.length}
          hasMore={false}
          loader={<></>}
          next={loadMore}
        >
        <ul>
          <ListBlock.Skeleton />
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
        </InfiniteScroll>
      )}
    </>
    
  )
}


const noCardContainerStyles = css`
  margin-top: 50px;
`

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
  padding: 10px 0 0;
`

const customStyles = css`
  margin-right: 10px;
`

export default MyCards