import { ApplyValues } from '@models/apply'
import { COLLECTIONS } from '@constants'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { store } from './firebase'

export async function applyCard(applyValues: ApplyValues) {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues)
}

// 찾은 카드를 업데이트
export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues> // ApplyValues 의 속성 일부만
}) {
  // 카드 찾기
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  const [applied] = snapshot.docs

  updateDoc(applied.ref, applyValues)
}

// 이미 user 가 신청한 카드가 있는지 확인
export async function getAppliedCard({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )

  // 카드발급을 신청하지 않았음을 앎
  if (snapshot.docs.length === 0) {
    return null
  }

  // 발급 받은 카드의 정보
  const [applied] = snapshot.docs

  const id = applied.id;

  return { id, ...applied.data() as ApplyValues }
}