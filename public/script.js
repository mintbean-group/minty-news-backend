let content = [];
let article = {};
let comments = [];
let comment = {};

function getRow(rowInfo) {
  let row = document.createElement("tr");
  let idCell = getCell(rowInfo._id, false);
  let titleCell = getCell(rowInfo.title, false);
  let descriptionCell = getCell(rowInfo.description, false);
  let likesCell = getCell(rowInfo.likes, true, rowInfo._id);
  let addCommentCell = getCommentCell(rowInfo._id);
  row.appendChild(idCell);
  row.appendChild(titleCell);
  row.appendChild(descriptionCell);
  row.appendChild(likesCell);
  row.appendChild(addCommentCell);
  return row;
}

function getCommentCell(id) {
  let cell = document.createElement("td");
  let cellInput = document.createElement("input");
  cellInput.type = "text";
  cell.appendChild(cellInput);
  let button = document.createElement("button");
  button.innerText = "+add comment";
  button.onclick = function () {
    completeComment(cellInput.value, id);
  };
  cell.appendChild(button);
  return cell;
}

function getCell(info, isButton, id) {
  let cell = document.createElement("td");
  let cellContainer;
  if (isButton) {
    cellContainer = document.createElement("button");
    cellContainer.onclick = function () {
      increaseLikes(id);
    };
    cellContainer.innerText = info + "";
  } else {
    cellContainer = document.createElement("div");
    let paragraph = document.createElement("p");
    paragraph.innerText = info + "";
    cellContainer.appendChild(paragraph);
  }
  cell.appendChild(cellContainer);
  return cell;
}

function increaseLikes(id) {
  article = grabArticle(id);
  article.likes++;
  updateArticle(article);
}

async function completeComment(newComment, id) {
  // populate the comment with new info
  comment = {
    comment: newComment,
  };
  await postComment(comment)
    .then((response) => response.json())
    .then((data) => {
      comment.id = data.id;
    });
  console.log("comment added");
  article = grabArticle(id);
  article.comments.push(comment.id);
  updateArticle(article);
}

function grabArticle(id) {
  return content.filter((article) => article._id === id)[0];
}

function postComment(comment) {
  return fetch(`/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
}

function updateArticle(article) {
  fetch(`/article/${article._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  }).then((res) => {
    console.log("article updated");
    fetchAndPrintData();
  });
}

function login() {
  console.log("login clicked!");
  fetch("/login", {
    method: 'GET',
    mode: 'no-cors'
  })
    .then((response) => response.json())
    .then((data) => {console.log("something")});
}

// Gets the data and outputs it to the `out` div
function fetchAndPrintData() {
  fetch("/articles")
    .then((data) => data.json())
    .then((json) => {
      content = [...json];
      if (content.length > 0) {
        let container = document.getElementById("out");
        container.innerHTML = "";
        let table = document.createElement("table");
        content.forEach((info) => {
          let row = getRow(info);
          table.appendChild(row);
          if (info.comments && info.comments.length > 0) {
            let commentRow = getCommentRow(info.comments);
            table.appendChild(commentRow);
          }
        });
        container.appendChild(table);
      } else {
        console.log("content is empty");
      }
    })
    .catch(() => {
      console.log("server error");
    });
}

function getCommentRow(comments) {
  let row = document.createElement("tr");
  let cell = document.createElement("td");
  let displayList = document.createElement("ul");
  comments.forEach((comment) => {
    let listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(comment.comment));
    displayList.appendChild(listItem);
  });
  cell.appendChild(displayList);
  row.appendChild(cell);
  return row;
}

// Submits the form and refreshes the data
function submitForm() {
  event.preventDefault();

  const title = event.target.title.value;
  const description = event.target.description.value;
  const url = event.target.url.value;
  const likes = 0;
  const comments = [];

  fetch("/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, url, likes, comments }),
  }).then((res) => {
    fetchAndPrintData();
  });
}



// run this on load
fetchAndPrintData();
