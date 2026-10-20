// 게시글 상세 + 댓글 조회
const params = new URLSearchParams(location.search); // URL에서 쿼리 스트링 파싱 객체 생성
const postId = Number(params.get("id")); // 강제 형변환, "id" 값을 꺼내와 숫자로 변환 후 별도의 변수(postId)에 저장

// 게시글 한 개 조회 (성공하면 true, 실패하면 false)
async function loadPosts() {
        try {
            const post = await apiRequest(`/board/${postId}`);
            renderPost(post);
            document.querySelector("#post-message").textContent = "";
            return true;

        } catch (error) {
        document.querySelector("#post-title").textContent = "게시글 조회 실패";
        document.querySelector("#post-content").textContent = "";
        document.querySelector("#post-message").textContent = error.message;
        return false;
    }
}

// 댓글 목록 조회
async function localComments() {
    try {
        const comments = await apiRequest(`/board/${postId}/comment`);
        renderComments(comments)
    } catch (error) {
        document.querySelector("#comment-message").textContent = error.message;
    }
} 

// 페이지 시작 흐름
document.querySelector("#comments-section").hidden = true;


if (requireLogin()) {
    if (Number.isSafeInteger(postId) && postId > 0) {
        //* 비동기 작업을 위한 방법
        //* 1. async / await
        //* 2. promise -> then() catch()

        //* 게시글 상세 조회
        loadPosts().then(function(success) {
            if (success) {

            //* 댓글 영역 표시
            document.querySelector("#comments-section").hidden = false;
            localComments();

        }
    });
        
        
        // // 지금 postId에 해당하는 댓글만 출력하도록 필터링
        // let filteredComments = comments.filter(comment => comment.boardId === postId);
        // renderComments(filteredComments);
    } else {
        document.querySelector("#post-title").textContent = "잘못된 게시글 번호입니다.";
        document.querySelector("#post-content").textContent = "";
    }
}


// 댓글 등록 (폼 제출)
document.querySelector("#comment-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // 새 댓글을 등록할 때 화면 전체가 새로고침되는 것을 막음.
    const input = document.querySelector("#comment-content");
    const content = input.value.trim();
    const message = document.querySelector("#comment-message");

    // 현재 페이지에 해당하는 게시글이 없거나
    // 댓글 내용이 비어있거나 255자를 넘는 경우 예외 처리
    if (!content || content.length > 255) {
        message.textContent = "댓글은 1~255자 로 입력하세요."
        return;
    }

    try {
        //* 댓글 생성(저장) API 호출
        await apiRequest(`/board/${postId}/comment`, "POST", { content });
        input.value = ""; // ? 초기화한 것과 똑같은 결과
        await localComments();
    } catch (error) {
        message.textContent = error.message;
    }
})

