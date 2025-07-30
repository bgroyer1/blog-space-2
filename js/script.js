async function fetchBlogPosts() {
  const res = await fetch("https://apis.scrimba.com/jsonplaceholder/posts");
  if (!res.ok) {
    throw Error(`Response error: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  const postsArr = data.slice(0, 5);
  const postsHTML = postsArr.reduce((acc, post) => {
    const { title, body } = post;
    return (
      acc +
      `<article class='post-div'>
        <h3 class='post-title'>${title}</h3>
        <p class='post-body'>${body}</p>
      </article>`
    );
  }, "");
  document.querySelector("#blog-div").innerHTML = postsHTML;
}

fetchBlogPosts();
