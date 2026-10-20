// 상세 댓글을 호출하기 위한 파일
const params = new URLSearchParams(location.search); // URL에서 쿼리 스트링 파싱 객체 생성
const postId = Number(params.get("id")); // 강제 형변환, "id" 값을 꺼내와 숫자로 변환 후 별도의 변수(postId)에 저장

// posts 배열에서 사용자가 누른 게시글 찾기
async function loadPosts() {
        try {
            const post = await apiRequest(`/board/${postId}`);

            renderPost(post);
            document.querySelector("#post-message").textContent = "";
        
        } catch (error) {
        document.querySelector("#post-title").textContent = "게시글 조회 실패";
        document.querySelector("#post-content").textContent = "";
        document.querySelector("#post-message").textContent = error.message;
    }
}

document.querySelector("#comments-section").hidden = true;

if (Number.isSafeInteger(postId) && postId > 0) { // 추출한 ID가 안전한 양의 정수인지 확인
    
    loadPosts();
    
    // 지금 postId에 해당하는 댓글만 출력하도록 필터링
    let filteredComments = comments.filter(comment => comment.boardId === postId);
    renderComments(filteredComments);
} else {
    document.querySelector("#post-list").textContent = "잘못된 게시글 번호입니다.";
    document.querySelector("#post-content").textContent = "";
}

// document.querySelector("#comment-form").addEventListener("submit", function (event) {
//     event.preventDefault(); // 새 댓글을 등록할 때 화면 전체가 새로고침되는 것을 막음.
//     const content = document.querySelector("#comment-content").value.trim();

//     // 현재 페이지에 해당하는 게시글이 없거나
//     // 댓글 내용이 비어있거나 255자를 넘는 경우 예외 처리
//     if (!post || !content || content.length > 255) {
//         document.querySelector("#comment-message").textContent = "댓글은 1~255자 로 입력하세요."
//         return;
//     }

//     comments.push( {
//         id: getCommentNextId(), // 임시 설정
//         boardId: postId,
//         content: content,
//         author: "실습 사용자"
//     });
//     saveLocal();
//     // 댓글을 쓰면 그 입력란이 비워지게 하기 위함.
//     document.querySelector("#comment-content").value = "";
//     renderComments(comments.filter(comment => comment.boardId === postId));
// })

// if (post === undefined) {
// }