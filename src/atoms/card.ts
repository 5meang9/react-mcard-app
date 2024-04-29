import { Card } from "@/models/card";
import { atom } from "recoil";

export const cardAtom = atom<Card[] | null>({
  key: 'cardsState',
  default: null,
})