// 게시글 작성 화면 JS

const form = document.querySelector("#post-form")

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = form.elements.title.value.trim();
    const content = form.elements.content.value.trim();

    // 글자 수 제한 검사
    if (title.length < 10 || title.length > 50 || content.length < 10) { // 글자 수 제한
        document.querySelector("#form-message").textContent =
        "제목은 10~50자, 본문은 10자 이상 입력하세요.";
        return;
    }

    // 신규 게시글 추가
    posts.push(
        {
            id: getPostNextId(), // 실제로는 아이디가 겹치면 안 됨. 실습 단계라서 아이디 고정.
            title: title,
            content: content,
            author: "실습 사용자",
            createdDatetime: new Date().toString().slice(0,10)
        }
    );
    saveLocal();

    // index.html 경로로 이동
    location.href = "index.html";
});
