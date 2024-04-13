import React, { useState } from "react"
import { useSetRecoilState } from "recoil"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/remote/firebase"
import { userAtom } from "@/atoms/user"

//인증 처리
function AuthGuard({ children }: { children: React.ReactNode}){
  const [initialize, setInitialize] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  // firebase 의 인증상태가 변경되면 동작함
  onAuthStateChanged(auth, (user) => {
  
    if (user != null){
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    }else{
      setUser(null)
    }

    setInitialize(true);
  })

  if(initialize === false){
    return null
  }

  return <>{children}</>
}

export default AuthGuard