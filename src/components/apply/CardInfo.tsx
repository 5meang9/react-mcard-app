import Button from "../shared/Button"
import Spacing from "../shared/Spacing"

import { useCallback, useState } from "react"
import { ApplyValues } from "@/models/apply"
import { MouseEvent } from "react"
import FixedBottomButton from "../shared/FixedBottomButton"
import { css } from "@emotion/react"

type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

// 카드 정보 상세
function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}){
  const [cardInfoValues, setCardInfoValues] = useState({
    isHipass: false,
    isMaster: false,
    isRf: false,
  })

  const { isHipass, isMaster, isRf } = cardInfoValues

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement

    setCardInfoValues((prevValues) => ({
      ...prevValues,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  return(
    <div css={cardInfoContainer}>
      <Button.Group title="해외결제">
        <Button name="isMaster" weak={isMaster === false} size="medium" data-value={true} onClick={handleButtonClick}>Master</Button>
        <Button name="isMaster" weak={isMaster === true} size="medium" data-value={false} onClick={handleButtonClick}>국내전용</Button>
      </Button.Group>
      <Spacing size={12} />
      <Button.Group title="후불교통기능">
        <Button name="isRf" weak={isRf === true} size="medium" data-value={false} onClick={handleButtonClick}>신청안함</Button>
        <Button name="isRf" weak={isRf === false} size="medium" data-value={true} onClick={handleButtonClick}>신청</Button>
      </Button.Group>
      <Spacing size={12} />

      <Button.Group title="후불하이패스카드">
        <Button name="isHipass" weak={isHipass === true} size="medium" data-value={false} onClick={handleButtonClick}>신청안함</Button>
        <Button name="isHipass" weak={isHipass === false} size="medium" data-value={true} onClick={handleButtonClick}>신청</Button>
      </Button.Group>

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues)
        }}
      />
    </div>
  )
}

const cardInfoContainer = css `
  padding: 24px;
`

export default CardInfo
