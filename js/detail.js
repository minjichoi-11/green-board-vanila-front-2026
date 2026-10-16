// 상세 댓글을 호출하기 위한 파일
const params = new URLSearchParams(location.search); // URL에서 뭐리 스트링 파싱 객체 생성
const postId = Number(params.get("id")); // 강제 형변환, "id" 값을 꺼내와 숫자로 변환 후 별도의 변수(postId)에 저장

// posts 배열에서 사용자가 누른 게시글 찾기
let post = posts.find(item => item.id === postId); // 나중에 값이 바뀔 변수이므로 let으로 선언

if (Number.isSafeInteger(postId) && postId > 0) { // 추출한 ID가 안전한 양의 정수인지 확인
    
    renderPost(post);
    
    // 지금 postId에 해당하는 댓글만 출력하도록 필터링
    let filteredComments = comments.filter(comment => comment.boardId === postId);
    renderComments(filteredComments);
} 

if (post === undefined) {
    document.querySelector("#post-title").textContent = "게시글 조회 실패";
    document.querySelector("#post-content").textContent = "";
    document.querySelector("#comments-section").hidden = true;
}