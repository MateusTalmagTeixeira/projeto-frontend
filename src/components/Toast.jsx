import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#1F1F1F] text-white px-6 py-3.5 rounded-lg shadow-xl flex items-center gap-3 animate-bounce">
      <span className="w-2.5 h-2.5 rounded-full bg-[#52CA76]" />
      <p className="text-sm font-semibold">{toastMessage}</p>
    </div>
  );
}
