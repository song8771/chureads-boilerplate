//rfce

import React, { useEffect } from 'react'
import Greeting from '../components/sample/Greeting'
import { use } from 'react';

const Sample = () => {
const handleButtonClick = (data) => {
    console.log("Button clicked!", data);
}

const [userNames, setUserNames] = React.useState([]);

// useEffect를 사용하여 컴포넌트가 마운트될 때 사용자 이름을 설정
// useEffect : 컴포넌트가 렌더링된 후에 실행되는 사이드 이펙트
useEffect(() => {
    // 컴포넌트 생성시 딱 한번만 실행되는 로직
    const names = ['Alice', 'Bob', 'Charlie'];
    setUserNames(names);
}, []);

return (
    <div>Sample
        {userNames.map((userNames, index) => <Greeting name={userNames} no={index} onButtonClick={handleButtonClick}/>)}
    </div>
)
}

export default Sample