import React, { useState } from "react"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/remote/firebase"

//인증 처리
function AuthGuard({ children }: { children: React.ReactNode}){
  const [initialize, setInitialize] = useState(false)

  // firebase 의 인증상태가 변경되면 동작함
  onAuthStateChanged(auth, (user) => {
    console.log(user)

    setInitialize(true);
  })

  if(initialize === false){
    return <div>인증 처리중...로딩중...</div>
  }

  return <>{children}</>
}

export default AuthGuard