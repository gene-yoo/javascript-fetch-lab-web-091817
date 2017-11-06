function getIssues() {
  const repo = "gene-yoo/javascript-fetch-lab/issues";

  fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
    .then(res => res.json())
    .then(res => showIssues(res));
}

function showIssues(json) {
  console.log(json);
  const issues = document.querySelector("#issues");

  json
    .map(issue => {
      let div = document.createElement("div");
      div.innerHTML = `<a href="${issue.html_url}" target="_blank">${issue.title}</a>`;
      return div;
    })
    .forEach(div => issues.appendChild(div));
}

function createIssue() {
  const issueTitle = document.querySelector("#title").value;
  const issueBody = document.querySelector("#body").value;
  document.querySelector("#title").value = "";
  document.querySelector("#body").value = "";

  const repo = "gene-yoo/javascript-fetch-lab/issues";
  const newIssue = {
    title: issueTitle,
    body: issueBody
  };

  fetch(`https://api.github.com/repos/${repo}`, {
    method: "post",
    body: JSON.stringify(newIssue),
    headers: {
      Authorization: `token ${getToken()}`
    }
  })
    .then(res => res.json())
    .then(res => getIssues());
}

function showResults(json) {
  console.log(json);
  const results = document.querySelector("#results");

  let linkToFork = document.createElement("a");
  linkToFork.innerText = json.full_name;
  linkToFork.href = json.html_url;
  linkToFork.target = "_blank";
  results.appendChild(linkToFork);
}

function forkRepo() {
  const repo = "learn-co-curriculum/javascript-fetch-lab";
  //use fetch to fork it!

  const token = getToken();

  fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: "post",
    headers: {
      Authorization: `token ${token}`
    }
  })
    .then(res => res.json())
    .then(json => showResults(json));
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return "";
}
