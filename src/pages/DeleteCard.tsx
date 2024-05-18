import FixedBottomButton from "@/components/shared/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import { COLLECTIONS } from "@/constants";
import useUser from "@/hooks/auth/useUser";
import { getAppliedCard } from "@/remote/apply";
import { store } from "@/remote/firebase";
import { colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom"

function DeleteCardPage(){
  const { id = ''} = useParams()
  const user = useUser()
  const navigate = useNavigate();

  const { data } = useQuery(
    ['applied', user?.uid, id],
    () => getAppliedCard({ userId: user?.uid as string, cardId: id }),
  )

  console.log('data',data);
  const appliedId = data ? data.id : null; // data가 존재할 때에만 id를 가져옵니다.
  
  if (appliedId) {
    deleteDoc(doc(store, COLLECTIONS.CARD_APPLY, appliedId))
  }

  return(
    // <CardPage isDelete={true} />
    <Flex justify="center" direction="column" align="center">
      <Spacing size={50}/>
      <Text typography='t3' bold={true}>카드해지가 완료되었습니다.</Text>
      <Spacing size={50}/>
      <Flex direction="column" justify="left">
        <Text typography="t6" color="gray900">요청하신 카드 신청 해지 완료되었습니다.</Text>
        <Text typography="t6" color="gray900">더 좋은 서비스로 찾아뵙도록 하겠습니다.</Text>
        <Text typography="t6" color="gray900">홈화면으로 돌아가시길 원한다면 완료 버튼을 눌러주세요.</Text>
      </Flex>
      <FixedBottomButton label="완료" onClick={() => navigate(`/`)} />
    </Flex>
  )
}

const DeleteContentsStyles = css`

`

export default DeleteCardPage