import { useCallback, useEffect } from 'react'
import { signOut } from 'firebase/auth'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

import useUser from '@hooks/auth/useUser'
import { auth } from '@remote/firebase'
import MyImage from '@components/my/MyImage'

import { getMyCards } from '@/remote/getMyCard'
import { useQuery } from 'react-query'

function MyPage() {
  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const { data } = useQuery(['myCards'], () => getMyCards({userId: user?.uid as string}))
  
  // Todo 내가 신청한 카드 나오도록 변경
  useEffect(()=>{
    console.log('data', data)
  },[data])

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />
      <MyImage size={80} mode="upload" />

      <Spacing size={20} />
      <Text bold={true}>{user?.displayName}</Text>

      <Spacing size={20} />

      <Button onClick={handleLogout}>로그아웃</Button>

      {/* {data?.map()} */}
    </Flex>
  )
}

export default MyPage