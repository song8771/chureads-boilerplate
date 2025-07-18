import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { initialTags } from "../data/response";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useSSE from "../hooks/useSSE";
import { use } from "react";


const Home = () => {
  // logic
  const history = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"; // 환경변수에서 API_BASE_URL을 가져오고, 없으면 기본값 설정

  const currentUser = auth.currentUser; // 현재 로그인된 사용자 정보
  console.log("🚀 ~ Home ~ currentUser:", currentUser)

  const [feedList, setFeedList] = useState([]);

  // SSE연결
  const { isConnected } = useSSE()

  const handleEdit = (data) => {
    history(`/edit/${data._id}`); // edit페이지로 이동
  };

  // DELETE /posts/:id - 특정 게시물 삭제
  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
    }
  };

  const handleDelete = async (selectedItem) => {
    console.log("🚀 ~ handleDelete ~ selectedItem:", selectedItem)

    // TODO: 백엔드에 Delete 요청
    const result = await deletePost(selectedItem._id);
    console.log("🚀 ~ handleDelete ~ result:", result);

    // UI 업데이트
    const filterList = feedList.filter((item) => item._id !== selectedItem._id);
    setFeedList(filterList);
  };

  const handleLike = (selectedId) => {
    console.log("🚀 ~ handleLike ~ selectedId:", selectedId)
  }

  const handleLogout = async () => {
    const isLoggedIn = !!currentUser
    console.log("🚀 ~ handleLogout ~ isLoggedIn:", isLoggedIn)

    if(isLoggedIn){
      const ok = window.confirm("로그아웃 하시겠습니까?");
      if (!ok) return; // 사용자가 취소를 누르면 아무것도 하지 않음
      await auth.signOut()
    }

    history("/login"); // 로그인 페이지로 이동
  }

  useEffect(() => {
    // 페이지 진입시 딱 한번 실행
    // TODO: 백엔드에 Get 요청
    const fetchPosts = async () => {
      try {
        console.log("🚀 ~ fetchPosts ~ API_BASE_URL:", API_BASE_URL)
        const response = await fetch(`${API_BASE_URL}/posts`);
        const result = await response.json();
        setFeedList(result);

        console.log("🚀 ~ fetchPosts ~ result:", result)
        
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, [API_BASE_URL]);

    useEffect(() => {
      // 로그인 되지 않은 사용자는 로그인 페이지로 이동
    !currentUser && history("/login"); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // view
  return (
    <div className="h-full pt-20 pb-[74px] overflow-hidden">
      {/* START: 헤더 영역 */}
      <Header isLoggedIn={true} onClick={handleLogout} />
      {/* END: 헤더 영역 */}
      <main className="h-full overflow-auto">
        {/* TODO */}
        <span className="block p-2 text-right text-sm"> {isConnected ? '🟢' : '🔴'} </span>
        <div>
          {/* START: 피드 영역 */}
          {feedList.length ? <ul>
            {feedList.map((feed) => (
              <FeedItem
                key={feed._id}
                data={feed}
                tags={feed.tags}
                isAuthor={feed.userId === currentUser.uid}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onLike={handleLike}
              />
            ))}
          </ul> : <p> No Data </p>}
          {/* END: 피드 영역 */}
        </div>
      </main>
      {/* START: 네비게이션 영역 */}
      <Nav />
      {/* END: 네비게이션 영역 */}
    </div>
  );
};

export default Home;
