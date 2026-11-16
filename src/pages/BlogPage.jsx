export default function BlogPage() {
  const posts = [
    { title: 'Tendências de Sneakers para 2026', date: '15 Nov 2026', desc: 'Descubra quais são os modelos que estão dominando as ruas nesta temporada.' },
    { title: 'Como combinar Streetwear no dia a dia', date: '10 Nov 2026', desc: 'Dicas práticas de estilo para montar looks confortáveis e cheios de personalidade.' },
    { title: 'Cuidados essenciais para durabilidade dos tênis', date: '02 Nov 2026', desc: 'Aprenda a limpar e armazenar seus calçados favoritos da maneira correta.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold text-[#C92071] uppercase tracking-wider">Novidades e Dicas</span>
        <h1 className="text-3xl font-black text-[#1F1F1F]">Blog Digital Store</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#8F8F8F]">{post.date}</span>
              <h3 className="font-bold text-base text-[#1F1F1F] leading-snug">{post.title}</h3>
              <p className="text-xs text-[#8F8F8F] leading-relaxed">{post.desc}</p>
            </div>
            <span className="text-xs font-bold text-[#C92071] pt-2 inline-block">Ler artigo completo →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
