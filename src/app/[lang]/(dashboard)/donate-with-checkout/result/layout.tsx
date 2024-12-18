import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Session Result",
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 overflow-hidden">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 break-words">
          Checkout Session Result
        </h1>
        <div className="mt-4 overflow-auto max-w-full">{children}</div>
      </div>
    </div>
  );
}
