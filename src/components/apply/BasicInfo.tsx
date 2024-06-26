import { ChangeEvent, useCallback, useState } from "react"

import { 결제일옵션, 신용점수옵션, 연소득옵션 } from "@/constants/apply"
import Select from "../shared/Select"
import { ApplyValues } from "@/models/apply"
import Spacing from "../shared/Spacing"
import FixedBottomButton from "../shared/FixedBottomButton"
import { css } from "@emotion/react"

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

// 카드 공통 정보
function BasicInfo({onNext}: { onNext: (infoValues: InfoValues) => void }){
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }))
  }, [])

  const 모든정보가선택되었는가 = Object.values(infoValues).every(
    (value) => value,
  )

  return(
    <div css={BasicInfoContainer}>
      <Select 
        name='salary'
        label="연소득" 
        options={연소득옵션}
        placeholder={연소득옵션[0].label} 
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Spacing size={16} />
      <Select 
        name='creditScore'
        label="신용점수" 
        options={신용점수옵션} 
        placeholder={신용점수옵션[0].label} 
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Spacing size={16} />
      <Select 
        name='payDate'
        label="결제일" 
        options={결제일옵션} 
        placeholder={결제일옵션[0].label} 
        value={infoValues.payDate} 
        onChange={handleInfoChange}
      />

      <FixedBottomButton label="다음" onClick={() => onNext(infoValues)} disabled={모든정보가선택되었는가 === false} />
    </div>
  )
}

const BasicInfoContainer = css`
  padding: 24px;
`

export default BasicInfo