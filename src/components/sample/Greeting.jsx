//rfce

import React, { useState } from 'react'

/*
    사용자의 이름을 입력 받아서 인사 문구와 함께 메시지를 보여주는 컴포넌트
*/
function Greeting({ name = '???', no, onButtonClick }) {
    // logic
    // useState 반환값 : [상태, 상태를 변경하는 함수]
    const [ userName, setUserName ] = useState(name + ':' + no);

    const handleClick = () => {
        // 대문자로 수정하는 로직
        // userName = userName.toUpperCase();
        // console.log("🚀 ~ handleClick ~ userName:", userName)
        setUserName(userName.toUpperCase());

        onButtonClick(name)
    }

    // view
    return (
        <div>
            <p> {userName}! 반갑습니다! </p>
            <p>넘겨받은 숫자: {no}</p>
            <p> 💛 오늘도 좋은하루 되세요! </p>
            <button type='button' className='border border-white' onClick={handleClick}> 대문자로 수정 </button>
        </div>
    );
}

export default Greeting