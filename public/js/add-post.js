const newFormHandler = async event => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="content"]').value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response)
  if (response.ok) {
    document.location.replace("/dashboard");

  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);
