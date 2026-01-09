import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react';
import { supabase, BlogPost } from '../../lib/supabase';

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[orange-500] border-r-transparent"></div>
          <p className="mt-4 text-white/60">Lade Blogbeiträge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-[#1a1a1a] to-black text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMS4xLjktMiAyLTJoMnYtMmgtMmMtMi4yIDAtNCAxLjgtNCA0djJoLTJ2Mmgydjh6Ci8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[orange-500]/5 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <img
                src="https://i.imgur.com/2SbjgE7.png"
                alt="Webflix"
                className="h-12 w-auto mx-auto mb-8"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-[pink-400] to-[orange-500] bg-clip-text text-transparent">Webflix</span> Blog
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Entdecke die neuesten Tipps, Trends und Insights rund um professionelle Webentwicklung und digitales Marketing
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {filteredPosts.length > 0 && filteredPosts[0] && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Featured Artikel</h2>
            <Link
              to={`/blog/${filteredPosts[0].slug}`}
              className="group grid md:grid-cols-2 gap-8 bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-[orange-500]/50 transition-all hover:shadow-2xl hover:shadow-[orange-500]/20"
            >
              {filteredPosts[0].featured_image && (
                <div className="relative h-96 md:h-auto overflow-hidden bg-black/40">
                  <img
                    src={filteredPosts[0].featured_image}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
              )}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {filteredPosts[0].tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {filteredPosts[0].tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[orange-500]/20 text-[pink-400] rounded-full text-sm font-medium"
                      >
                        <Tag className="w-4 h-4" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 line-clamp-3 group-hover:text-[pink-400] transition-colors">
                  {filteredPosts[0].title}
                </h2>
                {filteredPosts[0].excerpt && (
                  <p className="text-white/70 text-lg mb-6 line-clamp-4 leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                )}
                <div className="flex items-center gap-6 text-sm text-white/50 mb-6">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(filteredPosts[0].published_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {Math.ceil(filteredPosts[0].content.length / 1000)} Min. Lesezeit
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[orange-500] font-bold text-lg group-hover:gap-4 transition-all">
                  Jetzt lesen
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[orange-500]/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Blogbeiträge durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/10 bg-white/5 focus:border-[orange-500] focus:ring-4 focus:ring-[orange-500]/20 outline-none transition-all text-white placeholder-white/40"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  !selectedTag
                    ? 'bg-gradient-to-r from-[orange-500] to-[pink-400] text-black shadow-lg shadow-[orange-500]/25'
                    : 'bg-white/5 text-white border-2 border-white/10 hover:border-[orange-500]/50'
                }`}
              >
                Alle
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-gradient-to-r from-[orange-500] to-[pink-400] text-black shadow-lg shadow-[orange-500]/25'
                      : 'bg-white/5 text-white border-2 border-white/10 hover:border-[orange-500]/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold text-white mb-8">
          {selectedTag ? `Artikel zu "${selectedTag}"` : 'Alle Artikel'}
        </h2>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
              <Search className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Keine Beiträge gefunden</h3>
            <p className="text-white/60">Versuche es mit anderen Suchbegriffen oder Kategorien</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[orange-500]/10 transition-all duration-300 border border-white/10 hover:border-[orange-500]/50 hover:-translate-y-1"
              >
                {post.featured_image && (
                  <div className="relative h-56 overflow-hidden bg-black/40">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                )}

                <div className="p-6">
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[orange-500]/20 text-[pink-400] rounded-full text-xs font-medium"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[pink-400] transition-colors">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-white/70 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.published_at)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {Math.ceil(post.content.length / 1000)} Min.
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[orange-500] font-medium group-hover:gap-3 transition-all">
                    Weiterlesen
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-[orange-500]/10 via-[pink-400]/5 to-[orange-500]/10 border-t border-white/10 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-[pink-400] to-[orange-500] bg-clip-text text-transparent">
              Bleib auf dem Laufenden
            </span>
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Verpasse keine neuen Artikel und erhalte exklusive Tipps direkt in dein Postfach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Deine E-Mail-Adresse"
              className="flex-1 px-6 py-4 rounded-xl bg-white/5 border-2 border-white/10 text-white placeholder-white/40 outline-none focus:ring-4 focus:ring-[orange-500]/30 focus:border-[orange-500]"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black rounded-xl font-bold hover:from-[orange-600] hover:to-[orange-500] transition-all shadow-lg">
              Abonnieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
