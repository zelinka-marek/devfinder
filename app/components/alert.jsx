import { XCircleIcon } from "@heroicons/react/24/outline";

export function Alert(props) {
  const { children } = props;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
      <div className="px-4 py-5 sm:p-6">
        <div className="text-center">
          <XCircleIcon className="inline-block h-8 w-8 text-red-300" />
          <p className="mt-3 text-sm leading-6 text-gray-600">{children}</p>
        </div>
      </div>
    </div>
  );
}
