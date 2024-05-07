import { useParams } from "react-router-dom"
import CardPage from "./Card";

function DeleteCardPage(){
  const { id = ''} = useParams()

  // console.log('id~~~~', id);

  return(
    // <CardPage isDelete={true} />
    <></>
  )
}

export default DeleteCardPage