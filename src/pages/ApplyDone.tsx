import { parse } from 'qs'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import FixedBottomButton from '@shared/FixedBottomButton'
import Spacing from '@/components/shared/Spacing'
 
function ApplyDone() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <>
      <Spacing size={50} />
      <Flex justify="center" direction='column'>
        <Flex justify="center">
          <img
            width={500}
            src="/fox-826_512.gif"
            alt=""
          />
        </Flex>
        <Text textAlign='center'>
          {success === 'true'
            ? '카드가 발급되었습니다.'
            : '카드 발급에 실패했습니다.'}
        </Text>

        <FixedBottomButton
          label="확인"
          onClick={() => {
            window.history.back()
          }}
        />
      </Flex>
    </>
  )
}

export default ApplyDone