type SkeletonProps = {};

export function ChatSkeletonLoader({}: SkeletonProps) {
  return (
    <div className="flex-column min-w-[320px] size-full overflow-hidden">
      <div className="relative z-30 w-full px-3 py-2 border-b border-border-100">
        <div className="row-flex-start gap-3">
          <div className="relative size-12 rounded-full overflow-hidden bg-slate-200 animate-pulse" />
          <div className="flex-column flex-1">
            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="mt-1 h-3 w-24 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="relative flex size-full flex-1 flex-col overflow-hidden bg-background shadow-inner">
        <div className="size-full overflow-y-auto px-3 pb-2 pt-4">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[55%] ${
                    i % 2 === 0 ? "bg-slate-200" : "bg-slate-100"
                  } rounded-lg p-3 w-full animate-pulse`}
                >
                  <div className="h-2 w-full bg-slate-300 rounded mb-2" />
                  <div className="h-2 w-3/4 bg-slate-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-column gap-3 w-full py-2.5 pl-3 pr-4 border-t border-border-100 sm:min-h-[3rem]">
        <div className="row-flex relative w-full gap-4">
          <div className="row-flex w-full flex-1 gap-3 bg-slate-100 rounded-md py-2.5 px-3">
            <div className="h-6 flex-1 bg-slate-200 rounded animate-pulse" />
            <div className="w-6 h-6 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="w-6 h-6 bg-slate-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ConversationsSkeleton() {
  return (
    <>
      <div className="row-flex-btwn gap-4 py-3 px-3 border-b border-border-100 min-h-[66px]">
        <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
      </div>

      <ul className="flex-column gap-6 bg-background-100 w-full py-4 px-3 overflow-y-auto relative">
        {[...Array(6)].map((_, idx) => (
          <ChatRowSkeleton key={idx} />
        ))}
      </ul>
    </>
  );
}

const ChatRowSkeleton = () => {
  return (
    <li className="group w-full py-2 px-2 rounded-md grid grid-cols-[max-content,1fr] gap-2 items-center bg-background border border-border-100">
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />

      <div className="flex-column gap-0.5 w-full">
        <div className="row-flex-btwn gap-3">
          <div className="h-3 w-24 bg-gray-200 animate-pulse rounded" />
          <div className="h-3 w-12 bg-gray-200 animate-pulse rounded" />
        </div>

        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mt-1" />

        <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded mt-1" />
      </div>
    </li>
  );
};
