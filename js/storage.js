// 로컬 스토리지에서 안전하게 배열 데이터를 읽어오는 함수
function readLocal (key) {
    const stored = localStorage.getItem(key);

    if (stored === null) {
        return [];
    }
    
    try {
        const value = JSON.parse(stored);
        if (Array.isArray(value)) {
            return value;
        } else {
            return [];
        }
    } catch {
        return [];
    }
}

let posts = readLocal("posts");
let comments = readLocal("comments");

posts = readLocal("posts");
comments = readLocal("comments");

// 로컬 스토리지에 게시글/댓글 관련 데이터 저장
function saveLocal() {
    localStorage.setItem("posts", JSON.stringify(posts));
    localStorage.setItem("comments", JSON.stringify(comments));
}

// 새로운 게시글이나 댓글을 작성할 때, 아이디가 중복되지 않도록 
// '다음 순서의 고유 ID 값(현재 가장 큰 ID + 1)'을 자동으로 계산
function getPostNextId() {
    let maxId = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id > maxId) {
            maxId = posts[i].id;
        }
    }

    return maxId + 1;
}

function getCommentNextId() {
    let maxId = 0;
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].id > maxId) {
            maxId = comments[i].id;
        }
    }

    return maxId + 1;
}