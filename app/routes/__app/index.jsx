import {
  CalendarIcon,
  ScaleIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { Alert } from "~/components/alert";
import { getUserAccount } from "~/lib/github";
import { formatDate, formatNumber } from "~/utils/format";

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;

  const login = searchParams.get("q");
  if (!login) {
    searchParams.set("q", "kentcdodds");

    return redirect(`/?${searchParams}`);
  }

  const account = await getUserAccount(login.trim());
  if (!account) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(account);
}

export function meta({ data: account }) {
  return { title: account?.name || account?.login || "Not Found" };
}

function ExternalLink(props) {
  const { href, className, children } = props;

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

export default function IndexRoute() {
  const account = useLoaderData();

  const stats = [
    {
      label: "Repositories",
      value: account.allRepositories.totalCount,
    },
    {
      label: "Followers",
      value: account.followers.totalCount,
    },
    {
      label: "Following",
      value: account.following.totalCount,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:items-center sm:gap-4">
              <img
                className="mx-auto h-20 w-20 shrink-0 rounded-full"
                src={account.avatarUrl}
                alt=""
              />
              <div className="mt-4 text-center sm:mt-0 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  @{account.login}
                </p>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {account.name ?? `${account.login}'s Profile`}
                </h1>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <ExternalLink
                href={account.url}
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                View profile
              </ExternalLink>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y border-t bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 text-center text-sm font-medium"
            >
              <span className="text-gray-900">{formatNumber(stat.value)}</span>{" "}
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b px-4 py-3 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Profile</h2>
        </div>
        <div className="p-4 sm:px-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {account.email?.length ? (
                  account.email
                ) : (
                  <span className="text-gray-400">Not available</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {account.location ?? (
                  <span className="text-gray-400">Not available</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {account.company ?? (
                  <span className="text-gray-400">Not available</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Blog</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {account.blog ?? (
                  <span className="text-gray-400">Not available</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Twitter</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {account.twitterUsername ? (
                  `twitter.com/${account.twitterUsername}`
                ) : (
                  <span className="text-gray-400">Not available</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Joined</dt>
              <dd className="mt-1 text-sm text-gray-900">
                Joined{" "}
                <time dateTime={account.createdAt}>
                  {formatDate(account.createdAt)}
                </time>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Bio</dt>
              <dd className="mt-1 max-w-prose text-sm text-gray-900">
                {account.bio?.length ? (
                  account.bio
                ) : (
                  <span className="text-gray-400">Not available</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b px-4 py-3 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">
            Top Repositories
          </h2>
        </div>
        {account.repositories.nodes.length ? (
          <ul role="list" className="divide-y">
            {account.repositories.nodes.map((repo) => (
              <li key={repo.name}>
                <ExternalLink
                  href={repo.url}
                  className="block space-y-2 p-4 hover:bg-gray-50 sm:px-6"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="turncate text-sm font-medium text-primary-600">
                      {repo.name}
                    </p>
                    {repo.primaryLanguage && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-0.5 text-xs font-medium text-gray-500">
                        <svg
                          viewBox="0 0 8 8"
                          fill="currentColor"
                          style={{ color: repo.primaryLanguage.color }}
                          className="-ml-0.5 h-2 w-2"
                        >
                          <circle cx={4} cy={4} r={3} />
                        </svg>
                        {repo.primaryLanguage.name}
                      </span>
                    )}
                  </div>
                  {repo.repositoryTopics.nodes.length !== 0 && (
                    <div className="flex flex-wrap gap-x-0.5 gap-y-1">
                      {repo.repositoryTopics.nodes.map(({ topic }) => (
                        <span
                          key={topic.name}
                          className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                        >
                          {topic.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {repo.description && (
                    <p className="text-sm text-gray-900">{repo.description}</p>
                  )}
                  <div className="space-y-2 sm:flex sm:flex-row sm:flex-wrap sm:gap-6 sm:space-y-0">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <StarIcon className="h-5 w-5 shrink-0 text-gray-400" />
                      {formatNumber(repo.stargazerCount)}{" "}
                      {repo.stargazerCount === 1 ? "star" : "stars"}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <ScaleIcon className="h-5 w-5 shrink-0 text-gray-400" />
                      {repo.licenseInfo?.name ?? (
                        <span className="text-gray-400">No license</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <ShareIcon className="h-5 w-5 shrink-0 text-gray-400" />
                      {repo.forkCount} {repo.forkCount === 1 ? "fork" : "forks"}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <CalendarIcon className="h-5 w-5 shrink-0 text-gray-400" />
                      Updated on{" "}
                      <time dateTime={repo.updatedAt}>
                        {formatDate(repo.updatedAt)}
                      </time>
                    </div>
                  </div>
                </ExternalLink>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-500">No repositories found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  switch (caught.status) {
    case 404: {
      return (
        <Alert
          title="No user found"
          description="We can't find the user you're looking for. Please check your URL. Does the user have a GitHub account?"
        />
      );
    }
    default: {
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
    }
  }
}

export function ErrorBoundary({ error }) {
  console.error(error);

  return (
    <Alert
      title="An unexpected error occurred"
      description={`We are having trouble processing this request. Reason: ${error.message}. Try again later.`}
    />
  );
}
