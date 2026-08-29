import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Send, 
  Sparkles, 
  Search, 
  PlusCircle, 
  Share2, 
  ShieldCheck, 
  Check, 
  MessageCircle,
  ThumbsUp,
  Tag,
  User,
  LogIn
} from 'lucide-react';
import { CommunityPost, CommunityComment, UserProfile } from '../types';
import { INITIAL_COMMUNITY_POSTS } from '../data/communityData';

interface CommunityForumViewProps {
  currentUser?: UserProfile;
  onOpenAuthModal?: () => void;
}

export const CommunityForumView: React.FC<CommunityForumViewProps> = ({
  currentUser,
  onOpenAuthModal,
}) => {
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('nurmuslim_forum_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_COMMUNITY_POSTS;
  });

  const [selectedTag, setSelectedTag] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Post Form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState(currentUser?.name || '');
  const [newCategory, setNewCategory] = useState<'Fiqih' | 'Doa & Curhat' | 'Muamalah' | 'Kajian Sunnah' | 'Keluarga Sakinah' | 'Tanya Ustadz' | 'Bebas / Obrolan Umum'>('Fiqih');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({ 'post-1': true, 'post-2': true });

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});

  const categories = ['Semua', 'Fiqih', 'Tanya Ustadz', 'Doa & Curhat', 'Muamalah', 'Kajian Sunnah', 'Keluarga Sakinah'];

  const savePosts = (updated: CommunityPost[]) => {
    setPosts(updated);
    localStorage.setItem('nurmuslim_forum_posts', JSON.stringify(updated));
  };

  const filteredPosts = posts.filter(p => {
    const matchCat = selectedTag === 'Semua' || p.category === selectedTag;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleLikePost = (postId: string) => {
    const alreadyLiked = userLikes[postId];
    setUserLikes({ ...userLikes, [postId]: !alreadyLiked });

    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: alreadyLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
        };
      }
      return p;
    });
    savePosts(updated);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const authorName = currentUser?.isLoggedIn ? currentUser.name : 'Hamba Allah';
    const authorAvatar = currentUser?.isLoggedIn ? currentUser.avatar : '🌿';
    const isUstadzRole = currentUser?.isLoggedIn && currentUser.role === 'Ustadz';

    const newComm: CommunityComment = {
      id: `c-${Date.now()}`,
      author: authorName,
      avatar: authorAvatar,
      content: text,
      timestamp: 'Baru saja',
      likes: 0,
      isUstadz: isUstadzRole,
    };

    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComm],
        };
      }
      return p;
    });

    savePosts(updated);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const authorName = (currentUser?.isLoggedIn ? currentUser.name : newAuthor.trim()) || 'Akhi / Ukhti';
    const authorAvatar = currentUser?.isLoggedIn ? currentUser.avatar : '🌿';
    const isUstadzRole = currentUser?.isLoggedIn && currentUser.role === 'Ustadz';

    const newPostItem: CommunityPost = {
      id: `post-${Date.now()}`,
      author: authorName,
      avatar: authorAvatar,
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      likes: 0,
      timestamp: 'Baru saja',
      comments: [],
      isUstadz: isUstadzRole,
    };

    savePosts([newPostItem, ...posts]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
  };

  const toggleComments = (postId: string) => {
    setExpandedComments({
      ...expandedComments,
      [postId]: !expandedComments[postId],
    });
  };

  return (
    <div id="community-forum-main-view" className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold border border-emerald-600/40">
              Ukhuwah Islamiyah • Saling Menasehati dalam Kebaikan & Kebenaran
            </span>
            {currentUser?.isLoggedIn && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-medium flex items-center gap-1">
                <span>{currentUser.avatar}</span>
                <span>Masuk: {currentUser.name}</span>
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Forum Komunitas & Tanya Jawab
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
                Wadah silaturahmi, diskusi seputar fiqih ibadah, tanya ustadz, dan berbagi jadwal kajian sunnah di seluruh Indonesia.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!currentUser?.isLoggedIn && onOpenAuthModal && (
                <button
                  onClick={onOpenAuthModal}
                  className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 transition-colors"
                >
                  <LogIn className="w-4 h-4 text-amber-300" />
                  <span>Masuk Akun</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (currentUser?.isLoggedIn) {
                    setNewAuthor(currentUser.name);
                  }
                  setShowCreateModal(true);
                }}
                className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs shadow-md flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4 text-stone-950" />
                <span>Mulai Diskusi Baru</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik fiqih, tanya ustadz, atau kajian..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-xs sm:text-sm text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTag(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-stone-600 dark:text-zinc-300 border border-stone-200 dark:border-zinc-800 hover:border-emerald-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isLiked = userLikes[post.id];
          const isCommentsOpen = expandedComments[post.id];

          return (
            <div
              key={post.id}
              id={`community-post-${post.id}`}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-xs space-y-4"
            >
              {/* Author & Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-lg font-bold border border-emerald-500/20">
                    {post.avatar || '🌿'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-zinc-100">
                        {post.author}
                      </h4>
                      {post.isUstadz && (
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-extrabold flex items-center gap-0.5">
                          <ShieldCheck className="w-2.5 h-2.5" /> Ustadz
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-400">
                      {post.timestamp}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 text-[10px] font-bold">
                  {post.category}
                </span>
              </div>

              {/* Title & Body */}
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100 mb-1.5">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Action Reactions */}
              <div className="flex items-center gap-4 pt-3 border-t border-stone-100 dark:border-zinc-800 text-xs text-stone-600 dark:text-zinc-400">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors ${
                    isLiked
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
                  <span>Bermanfaat ({post.likes})</span>
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Tanggapan & Jawaban ({post.comments.length})</span>
                </button>
              </div>

              {/* Comments Section */}
              {isCommentsOpen && (
                <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 space-y-3">
                  {/* Existing Comments */}
                  <div className="space-y-2.5">
                    {post.comments.map((comm) => (
                      <div
                        key={comm.id}
                        className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                          comm.isUstadz
                            ? 'bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-stone-50 dark:bg-zinc-800/70 border border-stone-100 dark:border-zinc-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{comm.avatar || '🌿'}</span>
                            <span className="font-bold text-stone-900 dark:text-zinc-100">
                              {comm.author}
                            </span>
                            {comm.isUstadz && (
                              <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-0.5">
                                <ShieldCheck className="w-3 h-3" /> Asatidz Terverifikasi
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-400">{comm.timestamp}</span>
                        </div>
                        <p className="text-stone-700 dark:text-zinc-300 leading-relaxed pl-6">
                          {comm.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Add New Comment Box */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder={currentUser?.isLoggedIn ? `Tanggapi sebagai ${currentUser.name}...` : 'Tulis tanggapan atau faedah yang santun...'}
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                      className="flex-1 px-4 py-2 rounded-2xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors active:scale-95"
                      title="Kirim Tanggapan"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-stone-200 dark:border-zinc-800 shadow-2xl text-stone-900 dark:text-zinc-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-zinc-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                Mulai Diskusi Baru di Komunitas
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-zinc-200 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold block mb-1 text-stone-700 dark:text-zinc-300">
                  Nama / Identitas Pengirim
                </label>
                <input
                  type="text"
                  placeholder="Misal: Abu Yusuf / Ukhti Aisyah / Hamba Allah"
                  value={currentUser?.isLoggedIn ? currentUser.name : newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  disabled={currentUser?.isLoggedIn}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs disabled:opacity-75"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-stone-700 dark:text-zinc-300">
                  Kategori Topik
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs"
                >
                  <option value="Fiqih">Fiqih Ibadah & Muamalah</option>
                  <option value="Tanya Ustadz">Tanya Jawab Ustadz</option>
                  <option value="Doa & Curhat">Doa & Nasihat Spiritual</option>
                  <option value="Muamalah">Muamalah Syariah & Zakat</option>
                  <option value="Kajian Sunnah">Info Jadwal Kajian Sunnah</option>
                  <option value="Keluarga Sakinah">Parenting & Keluarga Sakinah</option>
                  <option value="Bebas / Obrolan Umum">Obrolan Silaturahmi Umum</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1 text-stone-700 dark:text-zinc-300">
                  Judul Topik / Pertanyaan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Bolehkah Menggabungkan Niat Puasa Syawal dengan Puasa Qadha?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1 text-stone-700 dark:text-zinc-300">
                  Rincian Diskusi / Pertanyaan
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Jelaskan pertanyaan atau informasi kajian Anda secara santun dan jelas..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-stone-100 dark:bg-zinc-800 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-transform active:scale-95"
                >
                  Publikasikan Diskusi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

