
export default function SupportLevels() {
  return (
    <section className="p-8 bg-black text-center">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Support Levels</h2>
      <div className="flex justify-center gap-4 flex-wrap">
        {['$10', '$25', '$50', '$100', '$250'].map((level, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded border border-yellow-500 shadow-xl">
            <p className="text-lg font-semibold">Level {idx + 1}</p>
            <p className="text-yellow-300">{level}</p>
            <button className="mt-2 px-3 py-1 bg-yellow-500 text-black rounded">Donate</button>
          </div>
        ))}
      </div>
    </section>
  );
}
