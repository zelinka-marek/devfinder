import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function Alert(props) {
  const { title, description } = props;

  return (
    <div className="text-center">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}
