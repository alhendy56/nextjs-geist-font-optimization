"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  genre: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Mock data for demonstration
  const recentlyPlayed: Song[] = [
    { id: "1", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", genre: "Pop" },
    { id: "2", title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: "2:54", genre: "Pop" },
    { id: "3", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", genre: "Pop" },
    { id: "4", title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58", genre: "Pop Rock" },
  ];

  const recommendedSongs: Song[] = [
    { id: "5", title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "F*CK LOVE 3", duration: "2:21", genre: "Pop" },
    { id: "6", title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:58", genre: "Indie Pop" },
    { id: "7", title: "Industry Baby", artist: "Lil Nas X & Jack Harlow", album: "MONTERO", duration: "3:32", genre: "Hip Hop" },
    { id: "8", title: "Peaches", artist: "Justin Bieber ft. Daniel Caesar", album: "Justice", duration: "3:18", genre: "R&B" },
  ];

  const myPlaylists = [
    { id: "1", name: "My Favorites", songCount: 25, description: "Songs I love the most" },
    { id: "2", name: "Workout Mix", songCount: 18, description: "High energy tracks" },
    { id: "3", name: "Chill Vibes", songCount: 32, description: "Relaxing music" },
  ];

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/auth/login");
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const playTrack = (song: Song) => {
    router.push(`/player?track=${song.id}&title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard">
                <h1 className="text-2xl font-bold text-white font-display">OKmusi</h1>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/dashboard" className="text-white hover:text-music-primary">Home</Link>
                <Link href="/search" className="text-gray-300 hover:text-white">Search</Link>
                <Link href="/library" className="text-gray-300 hover:text-white">Your Library</Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="hidden md:flex">
                <Input
                  type="text"
                  placeholder="Search music..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </form>
              
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-music-primary text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-white text-sm font-medium">{user.name}</p>
                  <p className="text-gray-400 text-xs">{user.email}</p>
                </div>
                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 font-display">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-300">Ready to discover your next favorite song?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button 
            onClick={() => router.push("/search")}
            className="h-16 bg-music-primary/20 hover:bg-music-primary/30 text-white border border-music-primary/30"
          >
            Search Music
          </Button>
          <Button 
            onClick={() => router.push("/library")}
            className="h-16 bg-white/5 hover:bg-white/10 text-white border border-white/20"
          >
            Your Library
          </Button>
          <Button 
            onClick={() => router.push("/discover")}
            className="h-16 bg-white/5 hover:bg-white/10 text-white border border-white/20"
          >
            Discover
          </Button>
          <Button 
            onClick={() => router.push("/player")}
            className="h-16 bg-white/5 hover:bg-white/10 text-white border border-white/20"
          >
            Music Player
          </Button>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="recent" className="data-[state=active]:bg-music-primary">
              Recently Played
            </TabsTrigger>
            <TabsTrigger value="recommended" className="data-[state=active]:bg-music-primary">
              Recommended
            </TabsTrigger>
            <TabsTrigger value="playlists" className="data-[state=active]:bg-music-primary">
              My Playlists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recently Played</CardTitle>
                <CardDescription className="text-gray-400">
                  Pick up where you left off
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentlyPlayed.map((song) => (
                    <div 
                      key={song.id}
                      onClick={() => playTrack(song)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-music-primary/20 rounded-md flex items-center justify-center">
                          <div className="w-6 h-6 bg-music-primary rounded-full group-hover:scale-110 transition-transform"></div>
                        </div>
                        <div>
                          <p className="text-white font-medium">{song.title}</p>
                          <p className="text-gray-400 text-sm">{song.artist} • {song.album}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="bg-white/10 text-gray-300">
                          {song.genre}
                        </Badge>
                        <span className="text-gray-400 text-sm">{song.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommended">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recommended for You</CardTitle>
                <CardDescription className="text-gray-400">
                  Based on your listening history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendedSongs.map((song) => (
                    <div 
                      key={song.id}
                      onClick={() => playTrack(song)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-music-primary/20 rounded-md flex items-center justify-center">
                          <div className="w-6 h-6 bg-music-primary rounded-full group-hover:scale-110 transition-transform"></div>
                        </div>
                        <div>
                          <p className="text-white font-medium">{song.title}</p>
                          <p className="text-gray-400 text-sm">{song.artist} • {song.album}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="bg-white/10 text-gray-300">
                          {song.genre}
                        </Badge>
                        <span className="text-gray-400 text-sm">{song.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playlists">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myPlaylists.map((playlist) => (
                <Card key={playlist.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="w-full h-32 bg-gradient-to-br from-music-primary/20 to-purple-600/20 rounded-md mb-4 flex items-center justify-center">
                      <div className="w-12 h-12 bg-music-primary/30 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <CardTitle className="text-white">{playlist.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {playlist.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{playlist.songCount} songs</p>
                  </CardContent>
                </Card>
              ))}
              
              {/* Create New Playlist Card */}
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-12">
                  <div className="w-16 h-16 bg-music-primary/20 rounded-full flex items-center justify-center mb-4">
                    <div className="w-8 h-8 text-music-primary text-2xl font-bold">+</div>
                  </div>
                  <p className="text-white font-medium">Create New Playlist</p>
                  <p className="text-gray-400 text-sm text-center">Start building your perfect mix</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
