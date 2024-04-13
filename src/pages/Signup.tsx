import Form from "@/components/shared/signup/Form"
import { FormValues } from "@/models/signup"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, store } from "@/remote/firebase"
import { collection, doc, setDoc } from "firebase/firestore"
import { COLLECTIONS } from "@/constants"
import { useNavigate } from "react-router-dom"

function SignupPage(){
  const navigate = useNavigate()

  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)


    // displayName을 업데이트
    await updateProfile(user, {
      displayName: name,
    })


    //store에 있는 user 정보를 가져옴.
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    // fireStore 의 USER 컬렉션에 저장할 때 user.uid 를 id 로 지정해서 저장
    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

    navigate('/')
  }

  return(
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage