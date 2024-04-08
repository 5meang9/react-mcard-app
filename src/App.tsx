import React from 'react';
import logo from './logo.svg';
import './App.css';
import Text from '@shared/Text';
import Button from './components/shared/Button';
import Alert from './components/shared/Alert';
import { useAlertContext } from './contexts/AlertContext';

function App() {
   const { open } = useAlertContext();

  return (
    <div>
      <Text typography='t1' display="block">t1</Text>
      <Text typography='t2'>t2</Text>
      <Text typography='t3'>t3</Text>
      <Text typography='t4'>t4</Text>

      <div style={{height: 10, width: '100%', background: '#efefef'}}></div>
      <Button>클릭해주세요</Button>
      <Button color='success'>클릭해주세요</Button>
      <Button color='error'>클릭해주세요</Button>
      <Button color='success' weak={true}>클릭해주세요</Button>
      <Button color='error' weak={true}>클릭해주세요</Button>
      <Button full={true}>클릭해주세요</Button>
      <Button full={true} disabled={true}>클릭해주세요</Button>

      <div style={{height: 10, width: '100%', background: '#efefef'}}></div>
      {/* <Alert title='알럿이 떴습니다.' onButtonClick={() =>{}} open={true} description='안녕하세요.' /> */}

      <Button onClick={() => {
        open({
          title: '카드신청완료',
          description: '내역페이지에서 확인',
          onButtonClick: () =>{}
        })
      }}>
        Alert 오픈
      </Button>
    </div>

  );
}

export default App;
