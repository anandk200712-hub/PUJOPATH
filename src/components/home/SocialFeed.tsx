import React from 'react';
import { Camera, Heart, MessageCircle, Share2, Sparkles, CheckCircle } from 'lucide-react';

export const SocialFeed: React.FC = () => {
  const posts = [
    {
      author: 'Ananya Mukherjee',
      handle: '@ananya_kolkata',
      pandal: 'Sovabazar Rajbari',
      time: '25m ago',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
      caption: 'The classical Ekchala pratima in the Natmandir courtyard at dawn gives goosebumps every year. Pure heritage reverence! 🪔✨ #DurgaPuja2026 #HeritageKolkata',
      likes: 342,
      comments: 28,
    },
    {
      author: 'Debashis Roy',
      handle: '@roy_travels',
      pandal: 'College Square',
      time: '1h ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80',
      caption: 'The Chandannagar lighting reflection over the water is unreal this evening! Queue moves briskly along College Street. #PujoVibes #LightingWonder',
      likes: 519,
      comments: 42,
    },
    {
      author: 'Sreemoyee Sen',
      handle: '@sreemoyee_art',
      pandal: 'Kumartuli Park',
      time: '2h ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      image: 'https://images.unsplash.com/photo-1599818451838-8924b22c7a4d?auto=format&fit=crop&w=600&q=80',
      caption: 'Clay sculptors doing magic! The artisanal craftsmanship honoring Mother Earth is poetic. Must-visit North Kolkata stop. #Kumartuli #ArtisanalIdol',
      likes: 418,
      comments: 31,
    },
    {
      author: 'Ritam Banerjee',
      handle: '@ritam_b',
      pandal: 'Maddox Square',
      time: '3h ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      image: 'https://images.unsplash.com/photo-1576487247299-e2206033280c?auto=format&fit=crop&w=600&q=80',
      caption: 'Maddox Square open ground adda + hot phuchka + acoustic guitars. South Kolkata Sharodiya vibe at its purest! 🥁❤️ #DurgaPuja2026',
      likes: 681,
      comments: 67,
    },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 mb-1 font-mono">
            <Camera className="w-4 h-4 text-rose-500" />
            <span>Community Parikrama Feed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            #DurgaPuja2026 Live Moments
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Curated festival glimpses shared by parikrama pilgrims across the city.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          Demonstration community feed
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              {/* Author Header */}
              <div className="p-3.5 flex items-center gap-2.5">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-8 h-8 rounded-full object-cover border border-amber-300"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <div className="font-bold text-stone-900 truncate">{post.author}</div>
                  <div className="text-[10px] text-stone-500 truncate">{post.pandal} • {post.time}</div>
                </div>
              </div>

              {/* Photo */}
              <div className="h-48 w-full bg-stone-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.pandal}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Caption */}
              <div className="p-3.5 text-xs text-stone-700 leading-relaxed">
                {post.caption}
              </div>
            </div>

            {/* Engagement */}
            <div className="p-3.5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-semibold">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 hover:text-red-600 cursor-pointer">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" /> {post.likes}
                </span>
                <span className="flex items-center gap-1 hover:text-stone-800 cursor-pointer">
                  <MessageCircle className="w-4 h-4 text-stone-400" /> {post.comments}
                </span>
              </div>
              <Share2 className="w-4 h-4 text-stone-400 hover:text-stone-700 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
