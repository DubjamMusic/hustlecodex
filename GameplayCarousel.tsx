
export default function GameplayCarousel() {
  return (
    <section className="p-8 bg-gradient-to-r from-black to-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Gameplay Showcase</h2>
      <div className="flex overflow-x-scroll space-x-6">
        {['give-miracles.jpg', 'choose-rituals.jpg', 'make-decisions.jpg'].map((img, idx) => (
          <img key={idx} src={`/img/${img}`} alt={img} className="rounded-lg w-80 h-48 object-cover" />
        ))}
      </div>
    </section>
  );
}
