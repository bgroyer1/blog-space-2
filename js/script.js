const BLOG_API = "https://apis.scrimba.com/jsonplaceholder/posts";
const blogDiv = document.querySelector("#blog-div");
const form = document.querySelector("#form");
const formTitle = document.querySelector("#form-title");
const formBody = document.querySelector("#form-body");

function renderPostHTML(data) {
  const { title, body } = data;
  console.log(title)
    return `<article class='post-div'>
        <h3 class='post-title'>${title}</h3>
        <p class='post-body'>${body}</p>
      </article>`
}

function showError(msg) {
  alert(msg);
}

async function fetchBlogPosts() {
  try {
    const res = await fetch(BLOG_API);
    if (!res.ok) {
      resFailedMsg = `Response failed: ${res.status}`;
      showError(resFailedMsg);
      throw Error(resFailedMsg);
    }
    const data = await res.json();
    const postsArr = data.slice(0, 5);
    const postsHTML = postsArr.reduce((acc, post) => {
      const html = renderPostHTML(post)
      return acc + html
    }, '');

    if (!postsHTML ) {
      showError(resFailedMsg)
    }
    
    blogDiv.innerHTML = postsHTML;
  } catch (err) {
    showError('Failed to load posts')
    console.error(err);
  }
}

document.querySelector("#form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const postObj = {
    title: formTitle.value,
    body: formBody.value,
  };

  if (!formTitle.value || !formBody.value) {
    showError("Both fields must be filled");
    return;
  }
  const options = {
    method: "POST",
    body: JSON.stringify(postObj),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(BLOG_API, options);
    if (!res.ok) {
      const resFailedMsg = `Response failed: ${res.status}`
      showError(resFailedMsg)
      throw Error(resFailedMsg);
    }
    const data = await res.json();
    const postHTML = renderPostHTML(data);
    blogDiv.insertAdjacentHTML('afterbegin', postHTML)
  } catch (err) {
    showError('Failed to load posts')
    console.error(err);
  }

  form.reset();
});

fetchBlogPosts();
