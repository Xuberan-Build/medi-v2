// app/recommendations/loading.tsx
export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-6 w-96">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2.5" />
              <div className="h-4 bg-gray-200 rounded-full mb-2.5" />
              <div className="h-4 bg-gray-200 rounded-full w-5/6" />
            </div>
          ))}
        </div>
      </div>
    )
  }
