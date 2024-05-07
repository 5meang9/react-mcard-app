import { useParams } from "react-router-dom"

function DeleteCardPage(){
  const { id = ''} = useParams()

  console.log('id~~~~', id);

  return(
    // <CardPage isDelete={true} />
    <></>
  )
}

export default DeleteCardPage