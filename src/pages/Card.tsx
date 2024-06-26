import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useQuery } from "react-query";
import { getCard } from "@/remote/card";

import Top from "@/components/shared/Top";
import ListRow from "@/components/shared/ListRow";
import FixedBottomButton from "@/components/shared/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import Text from "@/components/shared/Text"; 
import { css } from "@emotion/react";
import { motion } from 'framer-motion';
import { useCallback } from "react";
import useUser from "@/hooks/auth/useUser";
import { useAlertContext } from "@/contexts/AlertContext";

import Review from "@/components/card/Review";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";


function CardPage(){
  const { id = '' } = useParams()
  const user = useUser()
  const { open } = useAlertContext()

  const location = useLocation()
  const isDelete = location.state && location.state.isDelete;

  const navigate = useNavigate();

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })

  // [신청하기] 클릭
  const moveToApply = useCallback(()=> {
    // user 정보 없음 > 로그인 페이지 이동 얼럿
    // ToDo: 로그인 완료 시, 기존 신청하려던 카드 페이지로 이동하는 것도 구현?
    if(user == null){
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          navigate(`/signin`)
        }
      })
      
      return
    }
    // 카드 신청 페이지 이동
    navigate(`/apply/${id}`)
  },[user, id, open, navigate])

  // [신청하기] 클릭
  const moveToDeleteCard = useCallback(()=> {
    // user 정보 없음 > 로그인 페이지 이동 얼럿
    // ToDo: 로그인 완료 시, 기존 신청하려던 카드 페이지로 이동하는 것도 구현?
    if(user == null){
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          navigate(`/signin`)
        }
      })
      
      return
    }
    // 카드 신청 페이지 이동
    navigate(`/delete/${id}`)
  },[user, id, open, navigate])

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
   (promotion != null && promotion.title != null) ? removeHtmlTags(promotion.title) : tags.join(', ')

  return(
    <div>
      {isDelete ? (
        <Flex justify="left" css={deleteCardStyles}>
          <Text typography="t5" bold={true}>고객님, 이 카드의 혜택 필요하지 않으세요?</Text>
        </Flex>
      ): ('')}
      <Top title={`${corpName} ${name}`} subTitle={subTitle}/>
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              initial={{
                opacity: 0,
                translateX:-90,
              }}
              whileInView={{
                opacity: 1,
                translateX: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 0.1],
                delay: index * 0.1,
              }}
              // animate={{
              //   opacity: 1,
              //   translateX: 0,
              // }}
            >
              <ListRow 
                as="div"
                key={text} 
                left={<IconCheck/>} 
                contents={
                  <ListRow.Texts 
                    title={`혜택 ${index + 1}`}
                    subTitle={text} 
                  />
                }
              />
            </motion.li>
          )
          })
        }
      </ul>
      {promotion != null && promotion.terms != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}
      <Spacing size={50} />

      {isDelete ? (
        <Flex direction="row" justify="center">
          <FixedBottomButton label="계속진행" onClick={moveToDeleteCard} color="error" />
          {/* <FixedBottomButton label="취소" btnCount={2} onClick={() => navigate(`/my`)} color="error" /> */}
        </Flex>
      ): (
        <>
          {/* <Review />
          <Spacing size={100} /> */}
          <FixedBottomButton label="1분만에 신청하고 혜택받기" onClick={moveToApply} />
        </>
      )}
    </div>
  )
}

function IconCheck() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fill-opacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        stroke-linejoin="round"
        stroke-width="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      />
    </svg>
  )
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$$)/g, '')
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

const deleteCardStyles = css`
  padding: 24px 24px 0;
`

export default CardPage