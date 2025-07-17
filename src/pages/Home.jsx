import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import FeedItem from "../components/FeedItem";
import { initialFeedList, initialTags } from "../data/response";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Home = () => {
  // logic
  const history = useNavigate();

  const currentUser = auth.currentUser; // 현재 로그인된 사용자 정보
  console.log("🚀 ~ Home ~ currentUser:", currentUser)

  const [feedList, setFeedList] = useState(initialFeedList);

  const handleEdit = (data) => {
    history(`/edit/${data._id}`); // edit페이지로 이동
  };

  const handleDelete = (selectedItem) => {
    const filterList = feedList.filter((item) => item.id !== selectedItem.id);
    setFeedList(filterList);

    // TODO: 백엔드에 Delete 요청
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


  }, []);

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

        <div>
          {/* START: 피드 영역 */}
          <ul>
            {feedList.map((feed) => (
              <FeedItem
                key={feed._id}
                data={feed}
                tags={initialTags}
                isAuthor={true}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onLike={handleLike}
              />
            ))}
          </ul>
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
