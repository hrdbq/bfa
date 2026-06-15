/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Calendar, User, Clock, ChevronLeft, CalendarDays, ThumbsUp, MessageCircle, AlertCircle 
} from 'lucide-react';
import { BlogPost } from '../types';

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'News', 'Match Reports', 'Training Tips', 'Spotlight', 'Resources'];

  // Filters post elements based on tag choice
  const filteredPosts = posts.filter(post => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'News') return post.category === 'News';
    if (selectedCategory === 'Match Reports') return post.category === 'Match Reports';
    if (selectedCategory === 'Training Tips') return post.category === 'Training Tips';
    if (selectedCategory === 'Spotlight') return post.category === 'Spotlight';
    if (selectedCategory === 'Resources') return post.category === 'Resources';
    return true;
  });

  return (
    <div id="blog-view-container" className="glow-entrance">
      
      {/* Editorial Header Banner if NOT presently reading an article */}
      {!readingPost && (
        <section className="relative pt-32 sm:pt-40 pb-20 bg-secondary-navy border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=1200')" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block mb-3">
              EDITORIAL PERFORMANCE LOGS & RESOURCES
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              NEWS & ACADEMY BLOG
            </h1>
            <p className="text-white/77 max-w-3xl text-sm leading-relaxed mt-3">
              Explore tactical guides written by licensing directors, parent guides on youthful nutrition, scouting spotlight overviews, and official match reports.
            </p>
          </div>
        </section>
      )}

      {/* ARTICLE READER VIEW */}
      {readingPost ? (
        <section className="pt-32 sm:pt-40 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
          
          {/* Back indicators */}
          <button
            id="blog-back-btn"
            onClick={() => {
              setReadingPost(null);
              window.scrollTo({ top: 0 });
            }}
            className="flex items-center space-x-2 text-accent-blue hover:text-white font-display font-bold text-xs uppercase tracking-wider min-h-[44px] cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>Back to Editorial Catalog</span>
          </button>

          {/* Large image and title */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src={readingPost.imageUrl} 
              alt={readingPost.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <span className="bg-accent-blue text-primary-navy font-mono text-[9px] font-black px-2.5 py-1 rounded inline-block uppercase">
                {readingPost.category}
              </span>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">
                {readingPost.title}
              </h1>
            </div>
          </div>

          {/* Author/Date Row */}
          <div className="flex flex-wrap items-center gap-6 py-4 border-b border-t border-white/10 text-xs text-white/50 font-mono">
            <p className="flex items-center gap-2">
              <User size={14} className="text-accent-blue" />
              <span>Written by: <strong>{readingPost.author}</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={14} className="text-accent-blue" />
              <span>Published: {readingPost.date}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock size={14} className="text-accent-blue" />
              <span>Duration: {readingPost.readTime}</span>
            </p>
          </div>

          {/* Beautiful Editorial markup content */}
          <div className="prose prose-invert max-w-none text-white/90 text-sm sm:text-base leading-relaxed space-y-6 font-sans">
            {readingPost.content.split('\n\n').map((paragraph, index) => {
              const isQuote = paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('* ');
              
              if (isQuote) {
                return (
                  <blockquote 
                    key={index} 
                    className="border-l-4 border-accent-blue pl-4 italic text-accent-blue/90 bg-secondary-navy/40 p-3 rounded-r-xl"
                  >
                    {paragraph.replace(/^[-*]\s+/, '')}
                  </blockquote>
                );
              }

              return (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Editorial appreciation actions */}
          <div className="pt-8 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white/40 text-xs font-mono">
              <AlertCircle size={14} className="text-accent-blue" />
              <span>Content curated inside Bogor City Futsal Academy</span>
            </div>
            
            <button
              onClick={() => {
                setReadingPost(null);
                window.scrollTo({ top: 0 });
              }}
              className="px-5 py-2 rounded-xl bg-secondary-navy border border-white/10 text-xs font-bold text-white uppercase hover:bg-white/5 min-h-[40px] cursor-pointer"
            >
              Back to Catalog list
            </button>
          </div>

        </section>
      ) : (
        /* STANDARD ARTICLE CATALOG LIST VIEW */
        <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Categories directory line */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6 mb-12">
            <div className="flex items-center space-x-2 text-white/50 font-mono text-xs">
              <BookOpen size={14} className="text-accent-blue" />
              <span>Select category filters:</span>
            </div>

            <div className="flex items-center bg-[#000d21]/60 p-1 rounded-lg border border-white/10 overflow-x-auto max-w-full scrollbar-none gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`blog-tab-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded font-display text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[35px] whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-accent-blue text-primary-navy font-black'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat === 'All' ? 'All Guides' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  id={`blog-post-card-${post.id}`}
                  onClick={() => {
                    setReadingPost(post);
                    window.scrollTo({ top: 0 });
                  }}
                  className="bg-secondary-navy/20 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-accent-blue/30 transition-all flex flex-col justify-between cursor-pointer glow-border group"
                >
                  
                  {/* Image header */}
                  <div className="relative aspect-video bg-[#000d21]">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=500";
                      }}
                    />
                    
                    <span className="absolute top-4 left-4 bg-[#011B41]/90 backdrop-filter text-accent-blue font-mono font-black text-[9px] px-2.5 py-1 rounded tracking-wider uppercase">
                      {post.category}
                    </span>
                  </div>

                  {/* Body textual content */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      
                      <div className="flex items-center space-x-3.5 text-[10px] font-mono text-white/40 leading-none">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={11} className="text-accent-blue" />
                          {post.date}
                        </span>
                        <span className="block border-l border-white/10 h-2.5" />
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight group-hover:text-accent-blue transition-colors leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-white/70 text-xs leading-relaxed font-sans line-clamp-3">
                        {post.excerpt}
                      </p>

                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-white/50 text-[10px] uppercase font-mono">By: {post.author}</span>
                      </div>

                      <span className="text-accent-blue font-mono text-xs font-bold block uppercase group-hover:underline">
                        Read Guide ➜
                      </span>

                    </div>

                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-secondary-navy/20 rounded-2xl border border-white/10">
              <BookOpen size={44} className="text-white/25 mx-auto mb-3" />
              <span className="font-display font-bold text-white uppercase text-sm block">No articles matches selected category</span>
              <p className="text-white/40 text-xs font-mono mt-1">Upload records in the Admin CMS to populate this newsfeed.</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
