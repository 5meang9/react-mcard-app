import { useState } from "react"

import Apply from "@/components/apply"
import useApplyCardMutation from "@/components/apply/hooks/useApplyCardMutation"
import { updateApplyCard } from "@/remote/apply"
import { APPLY_STATUS } from "@/models/apply"
import { useNavigate, useParams } from "react-router-dom"
import useUser from "@/hooks/auth/useUser"
import usePollApplyStatus from "@/components/apply/hooks/usePollapplyStatus"
import useAppliedCard from "@/components/apply/hooks/useAppliedCard"
import { useAlertContext } from "@/contexts/AlertContext"
import FullPageLoader from "@/components/shared/FullPageLoader"

function ApplyPage(){
  const navigate = useNavigate()

  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }

  const { open } = useAlertContext()

  // 이미 발급 된 카드에 대한 얼럿 노출
  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }

        // 발급 됨.
        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다',
            onButtonClick: () => {
              window.history.back()
            },
          })

          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  // 카드 발급 상태, 사용자 id, card id 업데이트
  usePollApplyStatus({
    //성공
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    // 실패
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  // 이미 발급받은 카드이면 얼럿 뒤 화면에 어떤 ui도 노출되지 않음
  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  // TODO: 개선
  if (readyToPoll || 카드를신청중인가) {
    return <FullPageLoader message="카드를 신청중입니다" />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage