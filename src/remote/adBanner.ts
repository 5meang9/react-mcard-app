import { collection, doc, getDocs } from "firebase/firestore";
import { store } from "./firebase";

import { COLLECTIONS } from "@/constants";
import { AdBanner } from "@/model/card";

export async function getAdBanners() {
  const adBannerSnapshot = await getDocs(collection(store, COLLECTIONS.ADDBANNER));

  adBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}