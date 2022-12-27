import {
  CalendarIcon,
  ScaleIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData, useSearchParams } from "@remix-run/react";
import { ExternalLink } from "~/components/external-link";
import { StackedLayout } from "~/components/layout";
import { getUserAccount } from "~/lib/github";
import { formatDateString, formatDecimalNumber } from "~/utils/format";
import { Alert } from "../components/alert";

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const login = searchParams.get("q");
  if (!login) {
    const newSearchParams = new URLSearchParams([["q", "kentcdodds"]]);

    return redirect(`/?${newSearchParams}`);
  }

  const account = await getUserAccount(login.trim());
  if (!account) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(account);
}

export function meta({ data }) {
  return { title: data?.name || data?.login || "Not Found" };
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
    <StackedLayout>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="bg-white px-4 py-5 sm:p-6">
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
              <span className="text-gray-900">
                {formatDecimalNumber(stat.value)}
              </span>{" "}
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b bg-white px-4 py-3 sm:px-6">
          <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
        </div>
        <div className="p-4 sm:px-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {account.email?.length ? (
                  account.email
                ) : (
                  <span className="text-gray-500">Not available</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {account.location ?? (
                  <span className="text-gray-500">Not available</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {account.company ?? (
                  <span className="text-gray-500">Not available</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Blog</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {account.blog ?? (
                  <span className="text-gray-500">Not available</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Twitter</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {account.twitterUsername ? (
                  `twitter.com/${account.twitterUsername}`
                ) : (
                  <span className="text-gray-500">Not available</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Joined</dt>
              <dd className="mt-1 text-sm text-gray-900">
                Joined{" "}
                <time dateTime={account.createdAt}>
                  {formatDateString(account.createdAt)}
                </time>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Bio</dt>
              <dd className="mt-1 max-w-prose text-sm text-gray-900">
                {account.bio?.length ? (
                  account.bio
                ) : (
                  <span className="text-gray-500">Not available</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b bg-white px-4 py-3 sm:px-6">
          <h2 className="text-sm font-semibold text-gray-900">
            Top Repositories
          </h2>
        </div>
        {account.repositories.nodes.length ? (
          <ul role="list" className="divide-y">
            {account.repositories.nodes.map((item) => (
              <li key={item.name}>
                <ExternalLink
                  href={item.url}
                  className="block space-y-2 p-4 hover:bg-gray-50 sm:px-6"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="turncate text-sm font-medium text-primary-600">
                      {item.name}
                    </p>
                    {item.primaryLanguage && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-0.5 text-xs font-medium text-gray-500">
                        <svg
                          viewBox="0 0 8 8"
                          fill="currentColor"
                          style={{ color: item.primaryLanguage.color }}
                          className="-ml-0.5 h-2 w-2"
                        >
                          <circle cx={4} cy={4} r={3} />
                        </svg>
                        {item.primaryLanguage.name}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {item.repositoryTopics.nodes.length !== 0 && (
                      <div className="flex flex-wrap gap-0.5">
                        {item.repositoryTopics.nodes.map((topicItem) => (
                          <span
                            key={topicItem.topic.name}
                            className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800"
                          >
                            {topicItem.topic.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.description && (
                      <p className="text-sm text-gray-900">
                        {item.description}
                      </p>
                    )}
                    <div className="space-y-2 sm:flex sm:gap-6 sm:space-y-0">
                      <div className="flex items-center gap-1.5">
                        <StarIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <p className="text-sm leading-6 text-gray-500">
                          {formatDecimalNumber(item.stargazerCount)}{" "}
                          {item.stargazerCount === 1 ? "star" : "stars"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ScaleIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <p className="text-sm leading-6 text-gray-500">
                          {item.licenseInfo?.name ?? "Not available"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShareIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <p className="text-sm leading-6 text-gray-500">
                          {item.forkCount}{" "}
                          {item.forkCount === 1 ? "fork" : "forks"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <p className="text-sm leading-6 text-gray-500">
                          Updated on{" "}
                          <time dateTime={item.updatedAt}>
                            {formatDateString(item.updatedAt)}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                </ExternalLink>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-4">
            <p className="text-center text-sm text-gray-500">No repositories</p>
          </div>
        )}
      </div>
    </StackedLayout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  const [searchParams] = useSearchParams();
  const login = searchParams.get("q");

  if (caught.status === 404) {
    return (
      <StackedLayout>
        <Alert>
          We're sorry, we couldn't find a user by the username of{" "}
          <strong>"{login}"</strong>.
        </Alert>
      </StackedLayout>
    );
  }

  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary() {
  const [searchParams] = useSearchParams();
  const login = searchParams.get("q");

  return (
    <StackedLayout>
      <Alert>
        We're sorry, but an unexpected error occurred while loading a user by
        the username of <strong>"{login}"</strong>.
      </Alert>
    </StackedLayout>
  );
}
