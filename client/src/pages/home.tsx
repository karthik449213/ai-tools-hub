import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Bot, Pen, Camera, Rocket, Code, TrendingUp, Twitter, Linkedin, Github } from "lucide-react";

interface AITool {
  id: number;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  url: string;
}

const aiTools: AITool[] = [
  {
    id: 1,
    name: "Copy.ai",
    category: "content-creation",
    description: "AI copywriting tool to generate blog posts, ads, and social media captions.",
    imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Free Plan", "GPT-4", "Templates"],
    url: "#"
  },
  {
    id: 2,
    name: "Jasper",
    category: "content-creation",
    description: "High-end AI assistant for marketing and SEO content.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Paid", "SEO", "Enterprise"],
    url: "#"
  },
  {
    id: 3,
    name: "Writesonic",
    category: "content-creation",
    description: "Content generator with templates for blogs, ads, emails, and more.",
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Free Trial", "Templates", "Multilingual"],
    url: "#"
  },
  {
    id: 4,
    name: "Runway ML",
    category: "image-video",
    description: "AI video editing tool with magic background remover and video-to-video capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["✨ Trending", "AI Video", "Free Plan"],
    url: "#"
  },
  {
    id: 5,
    name: "Remove.bg",
    category: "image-video",
    description: "Instantly removes background from images using AI.",
    imageUrl: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Free", "Instant", "Background Removal"],
    url: "#"
  },
  {
    id: 6,
    name: "Kaiber",
    category: "image-video",
    description: "Create AI-generated videos from images, text, or music.",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Creative", "Music to Video", "Paid"],
    url: "#"
  },
  {
    id: 7,
    name: "Notion AI",
    category: "productivity",
    description: "AI-powered writing and summarizing assistant inside Notion.",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["💎 Featured", "Workspace", "Add-on"],
    url: "#"
  },
  {
    id: 8,
    name: "Mem.ai",
    category: "productivity",
    description: "AI note-taking tool that auto-organizes and connects your thoughts.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Smart Notes", "Auto-organize", "Free Trial"],
    url: "#"
  },
  {
    id: 9,
    name: "ChatGPT",
    category: "productivity",
    description: "OpenAI's conversational agent for research, summarizing, and problem-solving.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["🔥 Popular", "GPT-4", "Free"],
    url: "#"
  },
  {
    id: 10,
    name: "GitHub Copilot",
    category: "coding",
    description: "AI coding assistant for real-time code suggestions.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["GitHub", "IDE Plugin", "Subscription"],
    url: "#"
  },
  {
    id: 11,
    name: "Codeium",
    category: "coding",
    description: "Free AI code autocomplete and documentation generator.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Free", "Autocomplete", "Multi-language"],
    url: "#"
  },
  {
    id: 12,
    name: "Tabnine",
    category: "coding",
    description: "AI code completion plugin supporting multiple languages.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Plugin", "Multi-IDE", "Freemium"],
    url: "#"
  },
  {
    id: 13,
    name: "Surfer SEO",
    category: "marketing",
    description: "AI + SEO optimization platform for content ranking.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["SEO", "Content Optimization", "Paid"],
    url: "#"
  },
  {
    id: 14,
    name: "AdCreative.ai",
    category: "marketing",
    description: "Instantly generate conversion-focused ad creatives using AI.",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Ad Generation", "Conversion Focus", "Free Trial"],
    url: "#"
  },
  {
    id: 15,
    name: "Ocoya",
    category: "marketing",
    description: "AI-based social media scheduler and content generator.",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Social Media", "Scheduler", "Free Plan"],
    url: "#"
  }
];

const categories = [
  { id: "all", name: "All Tools", icon: null },
  { id: "content-creation", name: "Content Creation", icon: Pen },
  { id: "image-video", name: "Image & Video", icon: Camera },
  { id: "productivity", name: "Productivity", icon: Rocket },
  { id: "coding", name: "Coding", icon: Code },
  { id: "marketing", name: "Marketing", icon: TrendingUp }
];

const getCategoryDisplayName = (category: string) => {
  switch (category) {
    case "content-creation":
      return "Content Creation";
    case "image-video":
      return "Image & Video";
    case "productivity":
      return "Productivity";
    case "coding":
      return "Coding";
    case "marketing":
      return "Marketing";
    default:
      return category;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "content-creation":
      return "bg-blue-100 text-blue-800";
    case "image-video":
      return "bg-purple-100 text-purple-800";
    case "productivity":
      return "bg-green-100 text-green-800";
    case "coding":
      return "bg-slate-100 text-slate-800";
    case "marketing":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTagColor = (tag: string) => {
  if (tag.includes("Free") || tag.includes("free")) return "bg-emerald-100 text-emerald-800";
  if (tag.includes("Paid") || tag.includes("paid")) return "bg-yellow-100 text-yellow-800";
  if (tag.includes("Popular") || tag.includes("Trending") || tag.includes("Featured")) return "bg-red-100 text-red-800";
  if (tag.includes("GPT")) return "bg-purple-100 text-purple-800";
  if (tag.includes("SEO")) return "bg-green-100 text-green-800";
  return "bg-gray-100 text-gray-800";
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = aiTools.filter(tool => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-slate-900">AI Tools Hub</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Browse</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Categories</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Submit Tool</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 animate-in fade-in duration-500">
            AI Tools Hub
            <span className="block text-3xl lg:text-5xl text-blue-600 mt-2">
              Discover the Best AI Tools by Category
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
            Hand-picked AI tools to boost your productivity, creativity, and business – all in one place.
          </p>
          
          <div className="max-w-2xl mx-auto mb-8 animate-in slide-in-from-bottom-4 duration-900">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search AI tools..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-lg pr-16"
              />
              <Button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">🔥 Trending: ChatGPT</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">✨ New: Runway ML</span>
            <span className="bg-white px-4 py-2 rounded-full shadow-sm">💎 Featured: Notion AI</span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-8 border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant={activeCategory === category.id ? "default" : "secondary"}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4 mr-2" />}
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <main className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Featured AI Tools</h2>
            <p className="text-lg text-slate-600">Curated collection of the most powerful AI tools available today</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <img 
                  src={tool.imageUrl} 
                  alt={`${tool.name} interface`} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{tool.name}</h3>
                    <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(tool.category)}`}>
                      {getCategoryDisplayName(tool.category)}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-4">{tool.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.map((tag, index) => (
                      <Badge key={index} className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                    onClick={() => window.open(tool.url, '_blank')}
                  >
                    Visit {tool.name} <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600">No tools found matching your search criteria.</p>
            </div>
          )}

          <div className="text-center mt-16">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Load More Tools <Search className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-bold">AI Tools Hub</h3>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Discover, compare, and find the perfect AI tools for your needs. We curate the best AI solutions across all categories.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Content Creation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Image & Video</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Productivity</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Coding</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Submit Tool</a></li>
                <li>
                  <a href="mailto:suggest@aitoolshub.com" className="hover:text-white transition-colors">
                    Suggest a Tool
                  </a>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 AI Tools Hub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
