"use client";

export function AuthorStatus() {
  const isOnlineIST = (): boolean => {
    const hours = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    });

    const currentHour = parseInt(hours);
    return currentHour >= 9 && currentHour < 21;
  };

  return (
    <>
      {isOnlineIST() ? (
        <span
          className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
          title="Online"
        ></span>
      ) : (
        <span
          className="w-2 h-2 rounded-full bg-gray-600"
          title="Offline"
        ></span>
      )}
    </>
  );
}
