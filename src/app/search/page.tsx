"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  genre: string;
  year: number;
}

interface Artist {
  id: string;
  name: string;
  genre: string;
  followers: string;
  topSong: string;
}

interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  trackCount: number;
  genre: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    songs: [] as Song[],
    artists: [] as Artist[],
    albums: [] as Album[],
  });
  const [user, setUser] = useState<any>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  // Mock search data
  const mockSongs: Song[] = [
    { id: "1", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", genre: "Pop", year: 2020 },
    { id: "2", title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: "2:54", genre: "Pop", year: 2020 },
    { id: "3", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", genre: "Pop", year: 2020 },
    { id: "4", title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58", genre: "Pop Rock", year: 2021 },
    { id: "5", title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "F*CK LOVE 3", duration: "2:21", genre: "Pop", year: 2021 },
    { id: "6", title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:58", genre: "Indie Pop", year: 2020 },
    { id: "7", title: "Industry Baby", artist: "Lil Nas X & Jack Harlow", album: "MONTERO", duration: "3:32", genre: "Hip Hop", year: 2021 },
    { id: "8", title: "Peaches", artist: "Justin Bieber ft. Daniel Caesar", album: "Justice", duration: "3:18", genre: "R&B", year: 2021 },
  ];

  const mockArtists: Artist[] = [
    { id: "1", name: "The Weeknd", genre: "Pop/R&B", followers: "85M", topSong: "Blinding Lights" },
    { id: "2", name: "Harry Styles", genre: "Pop/Rock", followers: "42M", topSong: "Watermelon Sugar" },
    { id: "3", name: "Dua Lipa", genre: "Pop", followers: "38M", topSong: "Levitating" },
    { id: "4", name: "Olivia Rodrigo", genre: "Pop Rock", followers: "25M", topSong: "Good 4 U" },
  ];

  const mockAlbums: Album[] = [
    { id: "1", title: "After Hours", artist: "The Weeknd", year: 2020, trackCount: 14, genre: "Pop" },
    { id: "2", title: "Fine Line", artist: "Harry Styles", year: 2019, trackCount: 12, genre: "Pop Rock" },
    { id: "3", title: "Future Nostalgia", artist: "Dua Lipa", year: 2020, trackCount: 11, genre: "Pop" },
    { id: "4", title: "SOUR", artist: "Olivia Rodrigo", year: 2021, trackCount: 11, genre: "Pop Rock" },
  ];

  const popularGenres = [
    "Pop", "Rock", "Hip Hop", "R&B", "Electronic", "Jazz", "Classical", "Country", "Indie", "Alternative"
  ];

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    if (initialQuery) {
      setSearchQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter mock data based on search query
    const filteredSongs = mockSongs.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album.toLowerCase().includes(query.toLowerCase()) ||
      song.genre.toLowerCase().includes(query.toLowerCase())
    );

    const filteredArtists = mockArtists.filter(artist =>
      artist.name.toLowerCase().includes(query.toLowerCase()) ||
      artist.genre.toLowerCase().includes(query.toLowerCase())
    );

    const filteredAlbums = mockAlbums.filter(album =>
      album.title.toLowerCase().includes(query.toLowerCase()) ||
      album.artist.toLowerCase().includes(query.toLowerCase()) ||
      album.genre.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults({
      songs: filteredSongs,
      artists: filteredArtists,
      albums: filteredAlbums,
    });
    
    setIsLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await performSearch(searchQuery);
      // Update URL without page reload
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const playTrack = (song: Song) => {
    router.push(`/player?track=${song.id}&title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const hasResults = searchResults.songs.length > 0 || searchResults.artists.length > 0 || searchResults.albums.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href={user ? "/dashboard" : "/"}>
                <h1 className="text-2xl font-bold text-white font-display">OKmusi</h1>
              </Link>
              {user && (
                <div className="hidden md:flex space-x-6">
                  <Link href="/dashboard" className="text-gray-300 hover:text-white">Home</Link>
                  <Link href="/search" className="text-white hover:text-music-primary">Search</Link>
                  <Link href="/library" className="text-gray-300 hover:text-white">Your Library</Link>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-music-primary text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    className="text-white hover:bg-white/10"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6 font-display">Search Music</h2>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search for songs, artists, albums, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-music-primary"
              />
              <Button 
                type="submit" 
                className="h-12 px-8 bg-music-primary hover:bg-music-accent text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>
        </div>

        {/* Popular Genres */}
        {!searchQuery && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Popular Genres</h3>
            <div className="flex flex-wrap gap-2">
              {popularGenres.map((genre) => (
                <Badge 
                  key={genre}
                  variant="secondary" 
                  className="bg-white/10 text-white hover:bg-music-primary/20 cursor-pointer transition-colors px-4 py-2"
                  onClick={() => {
                    setSearchQuery(genre);
                    performSearch(genre);
                  }}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="text-white text-xl">Searching for "{searchQuery}"...</div>
              </div>
            ) : hasResults ? (
              <Tabs defaultValue="songs" className="space-y-6">
                <div className="flex items-center justify-between">
                  <TabsList className="bg-white/10 border-white/20">
                    <TabsTrigger value="songs" className="data-[state=active]:bg-music-primary">
                      Songs ({searchResults.songs.length})
                    </TabsTrigger>
                    <TabsTrigger value="artists" className="data-[state=active]:bg-music-primary">
                      Artists ({searchResults.artists.length})
                    </TabsTrigger>
                    <TabsTrigger value="albums" className="data-[state=active]:bg-music-primary">
                      Albums ({searchResults.albums.length})
                    </TabsTrigger>
                  </TabsList>
                  <p className="text-gray-400">
                    Found {searchResults.songs.length + searchResults.artists.length + searchResults.albums.length} results for "{searchQuery}"
                  </p>
                </div>

                <TabsContent value="songs">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Songs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {searchResults.songs.map((song) => (
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
                                <p className="text-gray-400 text-sm">{song.artist} • {song.album} • {song.year}</p>
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

                <TabsContent value="artists">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.artists.map((artist) => (
                      <Card key={artist.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <CardHeader className="text-center">
                          <div className="w-24 h-24 bg-music-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <div className="w-12 h-12 bg-music-primary rounded-full"></div>
                          </div>
                          <CardTitle className="text-white">{artist.name}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {artist.genre} • {artist.followers} followers
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-sm text-gray-400">Top song: {artist.topSong}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="albums">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {searchResults.albums.map((album) => (
                      <Card key={album.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <CardHeader>
                          <div className="w-full h-32 bg-gradient-to-br from-music-primary/20 to-purple-600/20 rounded-md mb-4 flex items-center justify-center">
                            <div className="w-12 h-12 bg-music-primary/30 rounded-full flex items-center justify-center">
                              <div className="w-6 h-6 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <CardTitle className="text-white text-lg">{album.title}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {album.artist} • {album.year}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary" className="bg-white/10 text-gray-300">
                              {album.genre}
                            </Badge>
                            <p className="text-sm text-gray-500">{album.trackCount} tracks</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <div className="text-white text-xl mb-2">No results found for "{searchQuery}"</div>
                <p className="text-gray-400">Try searching for something else or check your spelling</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
