import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { supabase, BlogPost } from '../../lib/supabase';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        navigate('/blog');
        return;
      }

      setPost(data);
      incrementViews(data.id);
      fetchRelatedPosts(data.tags, data.id);
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async (postId: string) => {
    try {
      const { error } = await supabase.rpc('increment_post_views', { post_id: postId });
      if (error) console.error('Error incrementing views:', error);
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const fetchRelatedPosts = async (tags: string[], currentPostId: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .neq('id', currentPostId)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRelatedPosts(data || []);
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';

    const urls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink-400 border-r-transparent"></div>
          <p className="mt-4 text-white/60">Lade Beitrag...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#667eea] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Zurück zur Übersicht
        </Link>

        <article className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="text-center bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white py-16 px-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {post.excerpt}
              </p>
            )}
          </div>

          {post.featured_image && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex items-center justify-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formatDate(post.published_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {Math.ceil(post.content.length / 1000)} Min. Lesezeit
              </span>
              <span className="text-gray-400">•</span>
              <span>Von {post.author}</span>
            </div>

            <div className="space-y-8 text-gray-800">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('[HERO]')) {
                  return null;
                }
                if (paragraph.startsWith('[HIGHLIGHT]')) {
                  const content = paragraph.replace('[HIGHLIGHT]', '').trim();
                  return (
                    <div key={index} className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-8">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith('[SUCCESS]')) {
                  const content = paragraph.replace('[SUCCESS]', '').trim();
                  return (
                    <div key={index} className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg my-8">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith('[STATS]')) {
                  const statsContent = paragraph.replace('[STATS]', '').trim();
                  const stats = statsContent.split('|').map(s => s.trim()).filter(Boolean);
                  return (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                      {stats.map((stat, i) => {
                        const [number, text] = stat.split(':');
                        return (
                          <div key={i} className="bg-gray-50 p-8 text-center rounded-xl border-2 border-blue-500">
                            <div className="text-5xl font-bold text-blue-500 mb-3">{number}</div>
                            <p className="text-gray-700">{text}</p>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                if (paragraph.startsWith('[URGENCY]')) {
                  const content = paragraph.replace('[URGENCY]', '').trim();
                  return (
                    <div key={index} className="bg-red-500 text-white p-8 text-center rounded-xl my-12 animate-pulse">
                      <h3 className="text-2xl font-bold mb-4">⚠️ ACHTUNG: Limitiertes Angebot!</h3>
                      <p className="text-lg">{content}</p>
                    </div>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <div key={index} className="mt-16 first:mt-8">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-l-4 border-blue-500 pl-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    </div>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <div key={index} className="mt-10 mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">
                        {paragraph.replace('### ', '')}
                      </h3>
                    </div>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={index} className="space-y-4 my-6 ml-6">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-lg leading-relaxed">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span dangerouslySetInnerHTML={{ __html: item.replace('- ', '') }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                const hasInlineBold = paragraph.includes('**');
                if (hasInlineBold) {
                  const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                  return (
                    <p key={index} className="text-lg leading-relaxed mb-6 text-justify">
                      {parts.map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="font-bold text-gray-900">{part}</strong> : part
                      )}
                    </p>
                  );
                }
                return (
                  <p key={index} className="text-lg leading-relaxed mb-6 text-justify">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="mt-16 p-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl text-white text-center">
              <h3 className="text-3xl font-bold mb-4">Bereit für deine eigene Website?</h3>
              <p className="text-xl opacity-90 mb-6">Werde einer der erfolgreichen 13% und starte noch heute mit deiner professionellen Website.</p>
              <button
                onClick={() => window.location.href = '/shop'}
                className="inline-block px-10 py-5 bg-white text-[#667eea] rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
              >
                🚀 Jetzt Webflix-Website sichern – Nur noch wenige Plätze verfügbar!
              </button>
              <p className="text-white/70 text-sm mt-4">⏰ Limitierte Plätze – Handeln Sie jetzt!</p>
            </div>

            <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Häufig gestellte Fragen</h2>
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Warum kostet Webflix nur 29,99€ statt 5.000€?</h3>
                  <p className="text-gray-700 leading-relaxed">Webflix nutzt innovative Technologien und Automatisierung, um Premium-Websites zu einem Bruchteil der üblichen Kosten anzubieten. Sie zahlen nur für Hosting und Wartung – die Website-Erstellung ist kostenlos.</p>
                </div>
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Ist das Angebot wirklich limitiert?</h3>
                  <p className="text-gray-700 leading-relaxed">Ja. Webflix nimmt bewusst nur eine begrenzte Anzahl neuer Kunden auf, um jedem die bestmögliche Betreuung und Qualität zu garantieren.</p>
                </div>
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Was passiert, wenn ich nicht zufrieden bin?</h3>
                  <p className="text-gray-700 leading-relaxed">Webflix bietet eine 30-Tage-Geld-zurück-Garantie. Wenn Sie nicht 100% zufrieden sind, erhalten Sie Ihr Geld zurück – ohne Wenn und Aber.</p>
                </div>
                <div className="pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Wie schnell ist meine Website online?</h3>
                  <p className="text-gray-700 leading-relaxed">Innerhalb von 48 Stunden haben Sie eine professionelle, einsatzbereite Website, die Kunden überzeugt und Umsatz generiert.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Teile diesen Beitrag</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => sharePost('facebook')}
                    className="p-3 bg-gray-100 hover:bg-[#1877F2] hover:text-white rounded-xl transition-all group border border-gray-200"
                    aria-label="Auf Facebook teilen"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => sharePost('twitter')}
                    className="p-3 bg-gray-100 hover:bg-[#1DA1F2] hover:text-white rounded-xl transition-all group border border-gray-200"
                    aria-label="Auf Twitter teilen"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => sharePost('linkedin')}
                    className="p-3 bg-gray-100 hover:bg-[#0A66C2] hover:text-white rounded-xl transition-all group border border-gray-200"
                    aria-label="Auf LinkedIn teilen"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="p-3 bg-gray-100 hover:bg-gray-800 hover:text-white rounded-xl transition-all group border border-gray-200"
                    aria-label="Link kopieren"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong>Über den Autor:</strong> Dieser Artikel basiert auf realen Erfolgsgeschichten von Webflix-Kunden. Namen wurden zum Schutz der Privatsphäre geändert, aber die Zahlen und Ergebnisse sind authentisch.
              </p>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Verwandte Artikel
            </h2>
            <ul className="space-y-4">
              {relatedPosts.map((relatedPost) => (
                <li key={relatedPost.id}>
                  <Link
                    to={`/blog/${relatedPost.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                  >
                    {relatedPost.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 border-t border-gray-200 py-16 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Werden Sie der nächste Erfolgs-Fall?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Lassen Sie nicht zu, dass fehlende Professionalität Ihre Träume zerstört.
          </p>
          <button
            onClick={() => window.location.href = '/shop'}
            className="inline-block px-10 py-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            💰 Jetzt Website sichern und durchstarten!
          </button>
          <p className="text-gray-500 text-sm mt-4">⏰ Limitierte Plätze – Handeln Sie jetzt, bevor es zu spät ist!</p>
        </div>
      </div>
    </div>
  );
}
