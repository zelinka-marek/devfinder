import invariant from "tiny-invariant";

invariant(process.env.GITHUB_API_TOKEN, "GITHUB_API_TOKEN must be set");

const headers = new Headers();
headers.set("Authorization", `Bearer ${process.env.GITHUB_API_TOKEN}`);
headers.set("Content-Type", "application/json");

const GET_USER_QUERY = `
  query($login: String!) {
    user(login: $login) {
      login
      avatarUrl(size: 128)
      name
      url
      allRepositories: repositories {
        totalCount
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      email
      location
      company
      websiteUrl
      twitterUsername
      createdAt
      bio
      repositories(
        ownerAffiliations: OWNER
        orderBy: { field: STARGAZERS, direction: DESC }
        first: 10
        privacy: PUBLIC
      ) {
        nodes {
          name
          url
          description
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          licenseInfo {
            name
          }
          updatedAt
          repositoryTopics(first: 6) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export async function getUserAccount(login) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "post",
    headers,
    body: JSON.stringify({ query: GET_USER_QUERY, variables: { login } }),
  });
  const data = await response.json();

  return data.data.user;
}
