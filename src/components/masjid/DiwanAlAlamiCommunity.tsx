import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Sparkles, 
  Send, 
  PlusCircle, 
  ShieldCheck, 
  Filter, 
  ThumbsUp, 
  Share2, 
  Check, 
  Tag
} from 'lucide-react';
import { COMMUNITY_FEED, CommunityPost } from '../../data/masjidData';

export const DiwanAlAlamiCommunity: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_FEED);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  
  // Post form state
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState<'Muslim' | 'Friend of Peace (Non-Muslim)' | 'Student of Knowledge'>('Friend of Peace (Non-Muslim)');
  const [location, setLocation] = useState('');
  const [postCategory, setPostCategory] = useState<'Peace Project' | 'Question & Inquiry' | 'Du’a Request' | 'Halal Business & Ethical Tech'>('Peace Project');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [amenClicked, setAmenClicked] = useState<Record<string, boolean>>({});

  const handleSayAmen = (postId: string) => {
    if (amenClicked[postId]) return;
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, amenCount: p.amenCount + 1 };
      }
      return p;
    }));
    setAmenClicked(prev => ({ ...prev, [postId]: true }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: authorName.trim() || 'Anonymous Seeker of Peace',
      authorRole,
      location: location.trim() || 'Global Citizen',
      category: postCategory,
      title,
      content,
      timeAgo: 'Just now',
      amenCount: 1,
      commentsCount: 0,
      isVerified: false
    };

    setPosts([newPost, ...posts]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setNewPostModalOpen(false);
      setTitle('');
      setContent('');
      setAuthorName('');
      setLocation('');
    }, 1800);
  };

  const categories = ['All', 'Peace Project', 'Question & Inquiry', 'Du’a Request', 'Halal Business & Ethical Tech'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  return (
    <section id="diwan" className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1931] border border-[#D4AF37]/50 text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest shadow-md">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>SECTION 06 • DIWAN AL-ALAMI</span>
            <span className="text-slate-500">|</span>
            <span className="text-white">Global Halal Peace Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Diwan Al-Alami — Universal Fellowship for Peace
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
            A dignified, troll-free sanctuary for Muslims and seekers of peace of every faith. Post humanitarian peace projects, ask spiritual and philosophical inquiries, share du’a requests, and collaborate on ethical halal technology.
          </p>
        </div>

        <button
          onClick={() => setNewPostModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8C6D1F] hover:from-[#FFF3B0] text-[#0A1931] font-mono font-black text-xs flex items-center gap-2 transition-all shadow-lg shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post to Diwan</span>
        </button>
      </div>

      {/* Role Badges Welcome Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#071326] border border-[#D4AF37]/40 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400">Recognized Community Badges:</span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
            ✦ Muslim
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#FFF3B0] border border-[#D4AF37]/40 font-bold">
            🕊️ Friend of Peace (Non-Muslims Welcome)
          </span>
          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
            📚 Student of Knowledge
          </span>
        </div>

        <div className="text-[11px] text-slate-400">
          Mod Policy: Zero toxicity • 100% Respect & Compassion
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#D4AF37] text-[#0A1931] font-bold shadow'
                : 'bg-[#071326] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const hasAmen = amenClicked[post.id] || false;
          return (
            <div
              key={post.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#071326] border-2 border-[#D4AF37]/50 shadow-xl space-y-4 hover:border-[#D4AF37] transition-all"
            >
              {/* Post Header: Author info & Category */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6D1F] p-0.5 flex items-center justify-center font-serif font-black text-[#0A1931] text-base shadow">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{post.authorName}</span>
                      {post.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" title="Verified Founder / Scholar" />
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="text-[#D4AF37]">{post.authorRole}</span>
                      <span>•</span>
                      <span>{post.location}</span>
                      <span>•</span>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#0A1931] border border-[#D4AF37]/40 text-xs font-mono text-[#D4AF37] font-bold">
                  {post.category}
                </span>
              </div>

              {/* Title & Body */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-serif font-black text-white leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {post.content}
                </p>
              </div>

              {/* Action Buttons: "Say Ameen / Support" + Comments + Share */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSayAmen(post.id)}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                      hasAmen 
                        ? 'bg-[#D4AF37] text-[#0A1931] border-[#D4AF37] font-bold' 
                        : 'bg-[#0A1931] text-slate-300 border-slate-700 hover:border-[#D4AF37]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasAmen ? 'fill-current text-[#0A1931]' : 'text-rose-400'}`} />
                    <span>{hasAmen ? 'Ameen / Supported' : 'Say Ameen / Support'}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-900 text-[10px] text-white">
                      {post.amenCount}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.commentsCount} reflections</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Global Halal Fellowship
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Post Modal */}
      {newPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-lg w-full bg-[#0A1931] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
              <h3 className="text-base font-serif font-black text-white">
                Share a Reflection, Project, or Du’a in Diwan
              </h3>
              <button
                onClick={() => setNewPostModalOpen(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            {submittedSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-center space-y-2">
                <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white font-mono">Post Published to Diwan Al-Alami!</h4>
                <p className="text-xs text-emerald-200">
                  May peace and blessing accompany your contribution to universal brotherhood.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Your Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Brother Ahmad or Jane Doe"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">City & Country:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Accra, Ghana or London"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Your Community Role:</label>
                    <select
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                    >
                      <option value="Friend of Peace (Non-Muslim)">Friend of Peace (Non-Muslim)</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Student of Knowledge">Student of Knowledge</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Post Category:</label>
                    <select
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                    >
                      <option value="Peace Project">Peace Project</option>
                      <option value="Question & Inquiry">Question & Inquiry</option>
                      <option value="Du’a Request">Du’a Request</option>
                      <option value="Halal Business & Ethical Tech">Halal Business & Ethical Tech</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Subject / Headline:</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your inquiry or initiative"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Full Message Content:</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, question, or du'a in detail..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#071326] border border-[#D4AF37]/50 text-white outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewPostModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0A1931] font-bold shadow-lg"
                  >
                    Publish to Fellowship
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
