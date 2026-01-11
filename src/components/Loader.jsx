export default function Loader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-gray-300">{text}</p>
    </div>
  );
}
