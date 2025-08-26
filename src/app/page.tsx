"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const featuredGenres = [
    "Pop", "Rock", "Hip Hop", "Electronic", "Jazz", "Classical", "R&B", "Country"
  ];

  const featuredPlaylists = [
    {
      title: "Today's Top Hits",
      description: "The most played songs right now",
      songCount: 50
    },
    {
      title: "Chill Vibes",
      description: "Relaxing music for any time",
      songCount: 75
    },
    {
      title: "Workout Mix",
      description: "High energy tracks to keep you moving",
      songCount: 40
    },
    {
      title: "Focus Flow",
      description: "Instrumental music for concentration",
      songCount: 60
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white font-display">
                OKmusi
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-music-primary hover:bg-music-accent text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
              Your Music,
              <span className="text-music-primary"> Your Way</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stream millions of songs, create personalized playlists, and discover new artists. 
              Experience music like never before with OKmusi.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search for songs, artists, or albums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-music-primary"
                />
                <Button 
                  type="submit" 
                  className="h-12 px-8 bg-music-primary hover:bg-music-accent text-white font-medium"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Featured Genres */}
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {featuredGenres.map((genre) => (
                <Badge 
                  key={genre}
                  variant="secondary" 
                  className="bg-white/10 text-white hover:bg-music-primary/20 cursor-pointer transition-colors"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Playlists */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 font-display">Featured Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlaylists.map((playlist, index) => (
            <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
              <CardHeader>
                <div className="w-full h-32 bg-gradient-to-br from-music-primary/20 to-purple-600/20 rounded-md mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 bg-music-primary/30 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
                <CardTitle className="text-white group-hover:text-music-primary transition-colors">
                  {playlist.title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {playlist.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{playlist.songCount} songs</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 font-display">Why Choose OKmusi?</h2>
          <p className="text-gray-300 text-lg">Experience the future of music streaming</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-music-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-music-primary rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">High Quality Audio</h3>
            <p className="text-gray-400">Stream music in crystal clear quality with lossless audio support</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-music-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-music-primary rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Personalized Playlists</h3>
            <p className="text-gray-400">Create and customize playlists that match your unique taste</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-music-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-music-primary rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Offline Downloads</h3>
            <p className="text-gray-400">Download your favorite tracks and listen anywhere, anytime</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 OKmusi. All rights reserved. | Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
