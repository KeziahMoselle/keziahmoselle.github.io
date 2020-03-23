import { GraphQLClient } from 'graphql-request'

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'
const graphql = new GraphQLClient(GITHUB_GRAPHQL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_BEARER_TOKEN}`
  }
})

export async function getMostPopularPullRequest () {
  const query = /* GraphQL */ `query MostPopularPullRequest($github_username: String!) {
    user(login: $github_username) {
      contributionsCollection {
        popularPullRequestContribution {
          pullRequest {
            commits {
              totalCount
            }
            participants {
              totalCount
            }
            publishedAt
            repository {
              homepageUrl
              nameWithOwner
              stargazers {
                totalCount
              }
            }
            state
            title
            updatedAt
            deletions
            additions
            permalink
            timeline {
              totalCount
            }
          }
          user {
            avatarUrl
          }
          url
        }
      }
    }
  }`

  const variables = {
    github_username: process.env.GITHUB_USERNAME
  }

  const response = await graphql.request(query, variables)

  return response
}

export async function getRepoInfo (nameWithOwner) {
  const [, name] = nameWithOwner.split('/')

  const query = /* GraphQL */ `query listRepos ($github_username: String! $repository_name: String!) {
    user(login: $github_username) {
      repository(name: $repository_name) {
        name
        nameWithOwner
        stargazers {
          totalCount
        }
        description
        createdAt
        updatedAt
        forkCount
      }
    }
  }`

  const variables = {
    github_username: process.env.GITHUB_USERNAME,
    repository_name: name
  }

  const response = await graphql.request(query, variables)

  return response
}
