// variables

let postsArray = [];
const form = document.querySelector("form");
const blogList = document.querySelector("#blog-list");
const BLOG_API = "https://apis.scrimba.com/jsonplaceholder/posts";

// functions

function renderHTML(arr) {
  const postHTML = arr.reduce((acc, post) => {
    const { title, body } = post;
    return (
      acc +
      `<article>
            <h3>${title}</h3>
            <p>${body}</p>
        </article>
        <hr />`
    );
  }, "");
  blogList.insertAdjacentHTML("afterbegin", postHTML);
}

function createPostObj() {
  const postTitle = document.querySelector("#post-title").value.trim();
  const postBody = document.querySelector("#post-body").value.trim();

  if (!postTitle || !postBody) {
    alert("Both fields must be filled");
    return;
  }

  return {
    title: postTitle,
    body: postBody,
  };
}

function createOptions(obj) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };
}

//async functions

async function fetchPosts() {
  const res = await fetch(BLOG_API);
  if (!res.ok) {
    throw Error(`Response failed: ${res.status}`);
  }

  const data = await res.json();
  postsArray = data.slice(0, 5);
  renderHTML(postsArray);
}

async function insertNewPost() {
  const postObj = createPostObj();
  if (!postObj) return;

  const options = createOptions(postObj);

  try {
    const res = await fetch(BLOG_API, options);
    if (!res.ok) {
      throw Error(`Response failed: ${res.status}`);
    }
    const data = await res.json();
    renderHTML([data]);
    form.reset();
  } catch (err) {
    console.error(err);
  }
}

// event listeners

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  insertNewPost();
});

// function calls

