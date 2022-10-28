import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

export default function MyPage() {
  sessionStorage.setItem('url', '/mypage');
  useEffect(() => {
    deliveryListFunc(1);
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [pages, setPages] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [myList, setMyList] = useState([]);
  const [myPoint, setMyPoint] = useState(0);
  const [myPointList, setMyPointList] = useState([]);
  async function deliveryListFunc(sortNumber) {
    try {
      const params = { sort: sortNumber, paginationId: pages };
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/mypage/delivery',
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
          params,
        },
      );
      console.log(res.data.response);
      setMyList(res.data.response);
    } catch (err: any) {
      console.log(err);
    }
  }
  async function myPointListFunc() {
    try {
      const params = { paginationId: pages };
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/mypage/mypoint',
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
          params,
        },
      );
      console.log(res.data.response);
      setMyPoint(res.data.response.myPoint);
      setMyPointList(res.data.response.myPointList);
    } catch (err: any) {
      console.log(err);
    }
  }
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
  };
  return (
    <>
      <div>MyPage</div>
      <button type="button" onClick={() => deliveryListFunc(1)}>
        최신순
      </button>
      <button type="button" onClick={() => deliveryListFunc(2)}>
        오래된순
      </button>
      <button type="button" onClick={() => myPointListFunc()}>
        내 포인트
      </button>
      {myList.map((deliver, index) => {
        return (
          <DevlieryBox key={index}>
            <ImagBox>
              <img
                src={deliver.imgUrl}
                alt="배송꽃다발이미지"
                height="100%"
              ></img>
            </ImagBox>
            <InfoBox>
              결제 날짜 : {deliver.date}
              <br />
              <b> {deliver.title}</b>
              <br />
              {deliver.flowerCount} 개의 꽃송이 가격: {deliver.price}원 <br />
              FROM {deliver.sender}
              <br />
              TO {deliver.receiver} <br />
              상태 {deliver.status}
            </InfoBox>
          </DevlieryBox>
        );
      })}
      <div>내포인트 : {myPoint}P</div>
      {myPointList.map((point, index) => {
        return (
          <ul key={index}>
            <li>{point.name}</li>
            <li>{point.point}P</li>
            <li>{point.createdDate}</li>
          </ul>
        );
      })}
    </>
  );
}

const DevlieryBox = styled.div`
  background-color: white;
`;

const ImagBox = styled.div`
  border-radius: 30px;
  border: 4px solid #ffecec;
  width: 100px;
  height: 100px;
  padding: 20px;
  float: left;
`;

const InfoBox = styled.div`
  margin: 20px;
`;
