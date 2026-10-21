// 게시글 작성 화면 JS


// 로그인 안 되어 있을 시 로그인 페이지로 리다이렉트
requireLogin();

const form = document.querySelector("#post-form")
form.addEventListener("submit", savePost)

async function savePost(event) {
    event.preventDefault();
    const title = form.elements.title.value.trim();
    const content = form.elements.content.value.trim();
    const button = form.querySelector(`button[type=submit]`);

    // #form-message 요소를 필요할 때마다 생성에 사용하지 않고, 
    // 미리 변수에 지정해 재사용하는 방식으로 구현
    const formMessage = document.querySelector("#form-message");
    if (title.length < 10 || title.length > 50 || content.length < 10) { // 글자 수 제한
        formMessage.textContent =
        "제목은 10~50자, 본문은 10자 이상 입력하세요.";
        return;
    }

    //* 중복 제출 방지
    if (button.disabled) {
        return;
    }

    //* 요청이 처리되는 동안 버튼 비활성화 및 안내 문구 출력
    button.disabled = true;
    formMessage.textContent = "저장 중...";

    try {

        await apiRequest("/board", "POST", { title, content });

        // index.html 경로로 이동
        location.href = "index.html";

    } catch (error) {
        formMessage.textContent = error.message;
    } finally {
        button.disabled = false;
    }
}
