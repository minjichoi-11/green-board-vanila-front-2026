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
