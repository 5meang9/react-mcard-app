import { COLLECTIONS } from "@/constants";
import { ApplyValues } from "@/models/apply";
import { Card } from "@/models/card";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";
import { store } from "./firebase";

// 내가 신청한 카드 나오게하는 query
export async function getMyCards({userId}: {userId: string;}){
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
    ),
  )

  const getCardsId = snapshot.docs.map((doc) => doc.data().cardId )

  const cardSnapshot =  await getDocs(query(collection(store, COLLECTIONS.CARD), where(documentId(), 'in', getCardsId)));

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]
  // console.log('cardSnapshot', cardSnapshot);

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data() as Card
  }))

  return{ items, lastVisible }

  
}