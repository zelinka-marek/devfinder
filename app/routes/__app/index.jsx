import {
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  ScaleIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData, useSearchParams } from "@remix-run/react";
import { getUserAccount } from "~/lib/github";
import { formatDateString, formatDecimalNumber } from "~/utils/format";

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;

  const login = searchParams.get("q");
  if (!login) {
    const newSearchParams = new URLSearchParams([["q", "kentcdodds"]]);
    return redirect(`/?${newSearchParams}`);
  }

  const account = await getUserAccount(login.trim());
  if (!account) {
    throw json(null, { status: 404 });
  }

  return json({ account });
}

export function meta({ data }) {
  if (!data?.account) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: data.account.name ?? data.account.login,
  };
}

function StackedLayout(props) {
  const { children } = props;

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-4 lg:px-8">
      {children}
    </main>
  );
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
  const { account } = useLoaderData();

  const name = (
    <h1 className="truncate text-2xl font-bold text-gray-900">
      {account.name ?? account.login}
    </h1>
  );
  const stats = [
    {
      name: "Repositories",
      stat: account.allRepositories.totalCount,
    },
    {
      name: "Followers",
      stat: account.followers.totalCount,
    },
    {
      name: "Following",
      stat: account.following.totalCount,
    },
  ];

  return (
    <StackedLayout>
      <div className="space-y-6">
        <div className="space-y-6 sm:flex sm:items-end sm:gap-5">
          <img
            className="h-24 w-24 rounded-xl sm:h-32 sm:w-32"
            src={account.avatarUrl}
            alt=""
          />
          <div className="sm:flex sm:flex-1 sm:items-center sm:justify-end sm:gap-6 sm:pb-1">
            <div className="mt-6 flex-1 sm:hidden">{name}</div>
            <div className="justify-stretch mt-6 flex flex-col gap-y-3 sm:flex-row sm:gap-x-4">
              <ExternalLink
                href={account.url}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                View Profile
                <ArrowTopRightOnSquareIcon className="-mr-1 h-5 w-5 text-gray-400" />
              </ExternalLink>
            </div>
          </div>
        </div>
        <div className="hidden flex-1 sm:block">{name}</div>
      </div>
      <dl className="grid grid-cols-1 gap-5 divide-y divide-gray-300 rounded-lg border border-gray-300 sm:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="space-y-1 px-4 py-5 sm:p-6">
            <dt className="text-gray-900">{item.name}</dt>
            <dd className="text-2xl font-semibold text-primary-600">
              {formatDecimalNumber(item.stat)}
            </dd>
          </div>
        ))}
      </dl>
      <div>
        <div className="border-b pb-2">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Profile
          </h2>
        </div>
        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      <div>
        <div className="border-b pb-2">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Top Repositories
          </h2>
        </div>
        {account.repositories.nodes.length ? (
          <ul role="list" className="divide-y">
            {account.repositories.nodes.map((item) => (
              <li key={item.name} className="space-y-2 py-4">
                <div className="flex items-center justify-between gap-2">
                  <ExternalLink
                    href={item.url}
                    className="block text-primary-600 hover:text-primary-900"
                  >
                    <p className="turncate text-sm font-medium">{item.name}</p>
                  </ExternalLink>
                  {item.primaryLanguage && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-0.5 text-xs font-medium text-gray-500">
                      <svg
                        className="-ml-0.5 h-2 w-2"
                        style={{ color: item.primaryLanguage.color }}
                        fill="currentColor"
                        viewBox="0 0 8 8"
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
                    <p className="text-sm text-gray-900">{item.description}</p>
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
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-4">
            <p className="text-center text-sm text-gray-500">
              <i>No repositories</i>
            </p>
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
        <div className="text-center">
          <XCircleIcon className="inline-block h-8 w-8 text-gray-300" />
          <p className="mt-3 text-sm leading-6 text-gray-600">
            We're sorry, we couldn't find a user by the username of{" "}
            <strong>"{login}"</strong>.
          </p>
        </div>
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
      <div className="text-center">
        <XCircleIcon className="inline-block h-8 w-8 text-gray-300" />
        <p className="mt-3 text-sm leading-6 text-gray-600">
          We're sorry, but an unexpected error occurred while loading a user by
          the username of <strong>"{login}"</strong>.
        </p>
      </div>
    </StackedLayout>
  );
}
