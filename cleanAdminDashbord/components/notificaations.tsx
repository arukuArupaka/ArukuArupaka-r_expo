export default function NotificationsPage() {
  const sendPush = () => {
    fetch("/api/sendPushApi");
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">通知送信</h1>
      <form>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            タイトル
          </label>
          <input
            id="title"
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            メッセージ
          </label>
          <textarea
            id="message"
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => sendPush()}
        >
          テストプッシュ通知
        </button>
      </form>
    </div>
  );
}
