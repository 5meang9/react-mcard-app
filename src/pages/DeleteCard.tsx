import { COLLECTIONS } from "@/constants";
import useUser from "@/hooks/auth/useUser";
import { getAppliedCard } from "@/remote/apply";
import { store } from "@/remote/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"

function DeleteCardPage(){
  const { id = ''} = useParams()
  const user = useUser()

  const { data } = useQuery(
    ['applied', user?.uid, id],
    () => getAppliedCard({ userId: user?.uid as string, cardId: id }),
  )

  const appliedId = data ? data.id : null; // data가 존재할 때에만 id를 가져옵니다.
  
  if (appliedId) {
    deleteDoc(doc(store, COLLECTIONS.CARD_APPLY, appliedId))
  }

  return(
    // <CardPage isDelete={true} />
    <></>
  )
}

export default DeleteCardPage