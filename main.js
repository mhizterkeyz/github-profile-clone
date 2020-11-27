const toggleModal = (close) => {
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");

  if (close) {
    modal.classList.remove("modal-opened");
    modalContent.classList.remove("fade-in");
    return;
  }

  modal.classList.add("modal-opened");
  setTimeout(() => modalContent.classList.add("fade-in"), 10);
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });
const parseRepoLanguage = (language) =>
  language
    ? `<span class="repo-language-meta">
<span class="repo-language" style="background-color: ${language.color};"></span>
<span>${language.name}</span>
</span>`
    : "";
const parseRepoDescripion = (description) =>
  description
    ? `<div class="repo-description">
<p>
  ${description}
</p>
</div>`
    : "";
const parseRepoForks = (forks) =>
  +forks > 0
    ? `<a class="repo-forks" href="#">
<svg
  aria-label="fork"
  class="octicon"
  viewBox="0 0 16 16"
  version="1.1"
  width="16"
  height="16"
  role="img"
>
  <path
    fill-rule="evenodd"
    d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
  ></path>
</svg>
${forks}
</a>`
    : "";
const parseRepoLicense = (license) =>
  license
    ? `<span class="repo-license" href="#">
<svg
  class="octicon"
  viewBox="0 0 16 16"
  version="1.1"
  width="16"
  height="16"
  aria-hidden="true"
>
  <path
    fill-rule="evenodd"
    d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
  ></path>
</svg>
${license.name}
</span>`
    : "";

const generateRepoListingMarkup = (repoListings = []) =>
  repoListings
    .map(({ node: repo }) => {
      const {
        nodes: [language],
      } = repo.languages || { nodes: [] };
      const { licenseInfo } = repo;

      return `<div class="main-section">
      <div>
        <div>
          <h3>
            <a href="${repo.url}"> ${repo.name}</a>
          </h3>

          <!--<span class="main-subtitle">
            Forked from
            <a href="#">BuildForSDGCohort2/gender-wise-front-end</a>
          </span>-->
        </div>
        ${parseRepoDescripion(repo.description)}
        <div class="repo-meta">
          ${parseRepoLanguage(language)}
          ${parseRepoForks(repo.forkCount)}
          ${parseRepoLicense(licenseInfo)}

          Updated
          <span class="repo-update-data">on ${formatDate(repo.updatedAt)}</span>
        </div>
      </div>

      <div class="repo-star-col">
        <button class="btn">
          <svg
            class="octicon"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
            ></path>
          </svg>
          Star
        </button>
        <div class="repo-activity-graph-occupier">blank stuff</div>
      </div>
    </div>`;
    })
    .join("");

(() => {
  // Stop all forms from submitting
  Array.prototype.forEach.call(document.querySelectorAll("form"), (form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });

  // Drop downs
  Array.prototype.forEach.call(
    document.querySelectorAll(".drop-trigger"),
    (dp) => {
      dp.addEventListener("click", (e) => {
        e.target.classList.toggle("drop-opened");
      });
    }
  );

  // Add header-stuck class to body
  window.onscroll = () => {
    if (window.scrollY >= 383) {
      document.body.classList.add("header-stuck");
    } else {
      document.body.classList.remove("header-stuck");
    }
  };

  // Drop select close
  Array.prototype.forEach.call(
    document.querySelectorAll(".drop-select-close"),
    (dsc) => {
      dsc.addEventListener("click", () => {
        document.querySelector(".drop-opened").classList.remove("drop-opened");
      });
    }
  );

  // Get Data
  fetch("https://api.github.com/graphql", {
    method: "post",
    headers: {
      authorization: "Bearer  cd1d8f6cf5062248fa45364222afbf6fc3f2d661",
    },
    body: JSON.stringify({
      query: `{
  viewer {
    login
    repositories(orderBy: {field: UPDATED_AT, direction: DESC}, last: 20, privacy: PUBLIC, isFork: true) {
      totalCount
      edges {
        node {
          id
          url
          name
          forkCount
          description
          updatedAt
          languages(first: 1) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
    twitterUsername
    name
    bio
    avatarUrl
    company
    following {
      totalCount
    }
    followers {
      totalCount
    }
    starredRepositories {
      totalCount
    }
    location
    websiteUrl
  }
}`,
    }),
  })
    .then((res) => res.json())
    .then(({ data: { viewer: data } }) => {
      document.querySelector(".login").innerHTML = data.login;
      document.querySelector(".about").innerHTML = data.bio;
      document.querySelector(".repositories-count").innerHTML =
        data.repositories.totalCount;
      document.querySelector(".followers-count").innerHTML =
        data.followers.totalCount;
      document.querySelector(".following-count").innerHTML =
        data.following.totalCount;
      document.querySelector(".star-count").innerHTML =
        data.starredRepositories.totalCount;
      document.querySelector(".company").innerHTML = data.company;
      document.querySelector(".location").innerHTML = data.location;
      document.querySelector(".websiteUrl").innerHTML = data.websiteUrl;
      document.querySelector(
        ".repo-listing"
      ).innerHTML = generateRepoListingMarkup(data.repositories.edges);
    });
})();
