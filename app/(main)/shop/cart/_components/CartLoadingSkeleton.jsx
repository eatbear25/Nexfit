export default function CartLoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 旋轉光環 */}
      <div className="absolute">
        <div
          className="w-32 h-32 border border-gray-300/40 rounded-full animate-spin"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute inset-2 border border-gray-400/30 rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "6s" }}
        ></div>
      </div>

      {/* 主要 LOGO */}
      <div className="relative z-10">
        <div
          className="w-20 h-20 flex items-center justify-center text-3xl transform-gpu"
          style={{
            animation:
              "logoScale 3s ease-in-out infinite, logoGlow 2s ease-in-out infinite alternate",
            filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))",
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* 脈衝圓點 */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes logoScale {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.05) rotate(1deg);
          }
          50% {
            transform: scale(1.1) rotate(0deg);
          }
          75% {
            transform: scale(1.05) rotate(-1deg);
          }
        }

        @keyframes logoGlow {
          0% {
            filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))
              drop-shadow(0 0 20px rgba(59, 130, 246, 0.1));
          }
          100% {
            filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.2))
              drop-shadow(0 0 30px rgba(99, 102, 241, 0.2));
          }
        }
      `}</style>
    </div>
  );
}
