import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostInput from "../components/PostInput";
import { auth } from "../firebase";

const Post = () => {
  // logic
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

  const history = useNavigate();
  const currentUser = auth.currentUser; // 현재 로그인된 사용자 정보
  const [churead, setChuread] = useState("");

  const handleChange = (value) => {
    setChuread(value);
  };

  const createPost = async (postData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result; // 새로 생성된 포스트 데이터 반환
    } catch (error) {
      console.error("Error creating post:", error);
      alert("츄레드 작성에 실패했습니다. 다시 시도해주세요.");
      return;
    }
  }

  const handlePost = async (event) => {
    event.preventDefault(); // 폼 제출시 새로고침 방지 메소드

    // 1. 텍스트에서 불필요한 공백 제거하기
    // 2. 제거한 텍스트를 기준으로 빈 스트링인지 체크하기
    // 3. 빈 스트링인 경우 알람창에 "츄레드를 입력해주세요"라고 메시지 뜨기
    // 4. 빈 스트링이 아닌 경우 기존처럼 아이템 추가하기

    const resultChuread = churead.trim();
    if (!resultChuread) {
      // 빈 스트링인 경우
      alert("츄레드를 입력해주세요");
      return;
    }

    // 빈 스트링이 아닌 경우
    // TODO: 백엔드에 Post 요청

    try { 
      const newItem = {
        userName: currentUser.displayName,
        userId: currentUser.uid,
        userProfileImage: currentUser.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        content: resultChuread,
        createdAt: new Date().toISOString(),
      };

      //api 요청
      const result = await createPost(newItem);
      console.log("🚀 ~ handlePost ~ result:", result)
    }
    catch (error) {
      console.error("Error posting data:", error);
      alert("츄레드 작성에 실패했습니다. 다시 시도해주세요.");
      return;
    }
    history("/"); // home화면으로 이동
  };

  // view
  return (
    <div className="h-full">
      <header className="fixed max-w-[572px] mx-auto px-4 py-6 text-center top-0 left-0 right-0">
        <Link
          to="/"
          className="absolute left-4 text-churead-gray-300 text-opacity-60"
        >
          취소
        </Link>
        <h3 className="font-bold">새로운 스레드</h3>
      </header>
      <main className="h-full pt-[72px] pb-[88px] overflow-hidden">
        <div className="h-full overflow-auto">
          <form id="post" onSubmit={handlePost}>
            {/* START: 사용자 입력 영역 */}
            <PostInput userName={currentUser.displayName} userProfileImage={currentUser.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} onChange={handleChange} />
            {/* END: 사용자 입력 영역 */}
            {/* START: 게시 버튼 영역 */}
            <div className="w-full max-w-[572px] flex items-center fixed bottom-0 lef p-6">
              <p className="text-churead-gray-300 text-opacity-60">
                누구에게나 답글 및 인용 허용
              </p>
              <button
                type="submit"
                className="ml-auto px-5 py-2 bg-white text-churead-black rounded-3xl font-bold">
                게시
              </button>
            </div>
            {/* END: 게시 버튼 영역 */}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Post;
