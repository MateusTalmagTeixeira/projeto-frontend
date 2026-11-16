export default function CareersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold text-[#C92071] uppercase tracking-wider">Faça parte do time</span>
        <h1 className="text-3xl font-black text-[#1F1F1F]">Trabalhe Conosco</h1>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 space-y-6 text-[#474747] text-sm">
        <p>
          Na <strong>Digital Store</strong>, valorizamos a inovação, a criatividade e a paixão por tecnologia e moda urbana. Se você quer crescer em um ambiente dinâmico e colaborativo, este é o seu lugar!
        </p>

        <div className="space-y-4">
          <h3 className="font-bold text-base text-[#1F1F1F]">Vagas Abertas</h3>
          <div className="border border-gray-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-[#1F1F1F]">Desenvolvedor(a) Front-end React</p>
              <p className="text-xs text-[#8F8F8F]">Remoto • Tempo Integral</p>
            </div>
            <button className="bg-[#C92071] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#991956] cursor-pointer">
              Candidatar-se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
