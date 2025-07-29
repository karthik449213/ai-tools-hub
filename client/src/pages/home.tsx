import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Bot, Pen, Camera, Rocket, Code, TrendingUp, Twitter as TwitterIcon, LinkedinIcon, GithubIcon } from "lucide-react";
import { FeedbackForm } from "@/components/feedback-form";


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
    url: "https://www.copy.ai/"
  },
  {
    id: 2,
    name: "Jasper",
    category: "content-creation",
    description: "High-end AI assistant for marketing and SEO content.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Paid", "SEO", "Enterprise"],
    url: "https://www.jasper.ai/"
  },
  {
    id: 3,
    name: "Writesonic",
    category: "content-creation",
    description: "Content generator with templates for blogs, ads, emails, and more.",
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Free Trial", "Templates", "Multilingual"],
    url: "https://writesonic.com/"
  },
  {
    id: 4,
    name: "Runway ML",
    category: "image-video",
    description: "AI video editing tool with magic background remover and video-to-video capabilities.",
    imageUrl: "https://runwayml.com/favicon.ico",
    tags: ["✨ Trending", "AI Video", "Free Plan"],
    url: "https://runwayml.com/"
  },
  {
    id: 5,
    name: "Remove.bg",
    category: "image-video",
    description: "Instantly removes background from images using AI.",
    imageUrl: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Free", "Instant", "Background Removal"],
    url: "https://www.remove.bg/"
  },
  {
    id: 6,
    name: "Kaiber",
    category: "image-video",
    description: "Create AI-generated videos from images, text, or music.",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Creative", "Music to Video", "Paid"],
    url: "https://www.kaiber.ai/superstudio/"
  },
  {
    id: 7,
    name: "Notion AI",
    category: "productivity",
    description: "AI-powered writing and summarizing assistant inside Notion.",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["💎 Featured", "Workspace", "Add-on"],
 
    url: "https://www.notion.so/product/ai"
  },
  {
    id: 8,
    name: "Mem.ai",
    category: "productivity",
    description: "AI note-taking tool that auto-organizes and connects your thoughts.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Smart Notes", "Auto-organize", "Free Trial"],
    url: "https://mem.ai/"
  },
  {
    id: 9,
    name: "ChatGPT",
    category: "productivity",
    description: "OpenAI's conversational agent for research, summarizing, and problem-solving.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["🔥 Popular", "GPT-4", "Free"],
    url: "https://chat.openai.com/chat"
  },
  {
    id: 10,
    name: "GitHub Copilot",
    category: "coding",
    description: "AI coding assistant for real-time code suggestions.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["GitHub", "IDE Plugin", "Subscription"],
    url: "https://githung.com/features/copilot"
  },
  {
    id: 11,
    name: "Codeium",
    category: "coding",
    description: "Free AI code autocomplete and documentation generator.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Free", "Autocomplete", "Multi-language"],
    url: "https://www.codeium.com/"
  },
  {
    id: 12,
    name: "Tabnine",
    category: "coding",
    description: "AI code completion plugin supporting multiple languages.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Plugin", "Multi-IDE", "Freemium"],
    url: "https://www.tabnine.com/"
  },
  {
    id: 13,
    name: "Surfer SEO",
    category: "marketing",
    description: "AI + SEO optimization platform for content ranking.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["SEO", "Content Optimization", "Paid"],
    url: "https://surferseo.com/"
  },
  {
    id: 14,
    name: "AdCreative.ai",
    category: "marketing",
    description: "AI tool for generating high-converting ad creatives.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Ad Creatives", "AI", "Free Plan"],
    url: "https://www.adcreative.ai/"
  },
  {
    id: 15,
    name: "Canva",
    category: "image-video",
    description: "Graphic design tool with AI-powered features for creating stunning visuals.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Design", "Templates", "Free Plan"],
    url: "https://www.canva.com/"
  },

  {
    id: 16,
    name: "Trade Ideas",
    category: "trading",
    description: "AI-powered stock scanning and backtesting platform with real-time trading signals and automated bot execution.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["AI Bots", "Real-time Signals", "Desktop & Web"],
    url: "https://www.trade-ideas.com/"
  },
  {
    id: 17,
    name: "TradingView",
    category: "trading",
    description: "Advanced charting platform with AI-powered pattern recognition and live bot trading broker integrations.",
    imageUrl: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Charts", "Community", "Bot Integration"],
    url: "https://www.tradingview.com/"
  },
  {
    id: 18,
    name: "QuantConnect",
    category: "trading",
    description: "Open-source algorithmic trading platform with cloud backtesting and multi-asset algorithm development.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Open Source", "Cloud Backtesting", "Python/C#"],
    url: "https://www.quantconnect.com/"
  },
  {
    id: 19,
    name: "Alpaca",
    category: "trading",
    description: "Commission-free trading API platform with AI bot support and automated trading capabilities for stocks and crypto.",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["API-First", "Commission-Free", "AI Bots"],
    url: "https://alpaca.markets/"
  },
  {
    id: 20,
    name: "Tickeron",
    category: "trading",
    description: "AI-driven swing trading platform with automated bots and predictive analytics for stock market patterns.",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Swing Trading", "Pattern Recognition", "Predictive AI"],
    url: "https://www.tickeron.com/"
  },
  {
    id: 21,
    name: "TrendSpider",
    category: "trading",
    description: "AI-powered technical analysis platform with automated pattern recognition and backtesting capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Pattern Recognition", "Backtesting", "Technical Analysis"],
    url: "https://www.trendspider.com/"
  },
  {
    id: 22,
    name: "RockFlow",
    category: "trading",
    description: "Beginner-friendly AI trading app with simple design, auto-trading features, and live market analysis.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Beginner-Friendly", "Mobile App", "Auto-Trading"],
    url: "https://rockflow.ai/"
  },
  {
    id: 23,
    name: "BlackBoxStocks",
    category: "trading",
    description: "AI-powered options trading platform with real-time alerts and data-driven forecasting tools.",
    imageUrl: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Options Trading", "Real-time Alerts", "Forecasting"],
    url: "https://www.blackboxstocks.com/"
  },
  {
    id: 24,
    name: "WunderTrading",
    category: "trading",
    description: "Multi-exchange cryptocurrency trading platform with AI bots and automated portfolio management.",
    imageUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Crypto Trading", "Multi-Exchange", "Portfolio Management"],
    url: "https://wundertrading.com/"
  },
  {
    id: 25,
    name: "MetaTrader 5",
    category: "trading",
    description: "Professional trading platform with AI expert advisors, automated trading systems, and advanced analytics.",
    imageUrl: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Expert Advisors", "Forex", "Professional"],
    url: "https://www.metatrader5.com/en"
  },
  {
    id: 26,
    name: "Cryptohopper",
    category: "trading",
    description: "Cloud-based cryptocurrency trading bot with AI strategies and automated portfolio rebalancing.",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Crypto Bots", "Cloud-Based", "Rebalancing"],
    url: "https://www.cryptohopper.com/"
  },
  {
    id: 27,
    name: "LevelFields",
    category: "trading",
    description: "AI-based trading platform that analyzes market data across multiple asset classes for real-time opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Multi-Asset", "Real-time Analysis", "AI Insights"],
    url: "https://www.levelfields.com/"
  },
  {
    id: 28,
    name: "3Commas",
    category: "trading",
    description: "Smart cryptocurrency trading platform with AI-powered bots, DCA strategies, and portfolio tracking.",
    imageUrl: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["DCA Bots", "Portfolio Tracking", "Smart Trading"],
    url: "https://3commas.io/"
  },
  {
    id: 29,
    name: "Pionex",
    category: "trading",
    description: "Built-in trading bot exchange with 16 free AI trading bots and automated grid trading strategies.",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Built-in Bots", "Grid Trading", "16 Free Bots"],
    url: "https://www.pionex.com/"
  },
  {
    id: 30,
    name: "Quadency",
    category: "trading",
    description: "Professional cryptocurrency trading platform with AI portfolio automation and risk management tools.",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Portfolio Automation", "Risk Management", "Professional"],
    url: "https://quadency.com/"
  },
  {
    id: 31,
    name: "Shrimpy",
    category: "trading",
    description: "Automated crypto portfolio management with AI rebalancing algorithms and social trading features.",
    imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Portfolio Rebalancing", "Social Trading", "Automated"],
    url: "https://www.shrimpy.io/"
  },
  {
    id: 32,
    name: "Zignaly",
    category: "trading",
    description: "Crypto trading platform with AI profit-sharing services and professional trader copy-trading features.",
    imageUrl: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Profit Sharing", "Copy Trading", "Professional Traders"],
    url: "https://zignaly.com/"
  },
  {
    id: 33,
    name: "Kaktana",
    category: "trading",
    description: "AI-powered trading assistant with natural language processing for strategy development and execution.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["NLP Trading", "AI Assistant", "Strategy Development"],
    url: "https://www.kaktana.com/"
  },
  {
    id: 34,
    name: "Composer",
    category: "trading",
    description: "No-code AI trading platform for building automated investment strategies with visual programming.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["No-Code", "Visual Programming", "Investment Strategies"],
    url: "https://www.composer.trade/"
  },
  {
    id: 35,
    name: "Equbot",
    category: "trading",
    description: "AI-driven ETF management using IBM Watson for fundamental analysis and portfolio construction.",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["IBM Watson", "ETF Management", "Fundamental Analysis"],
    url: "https://www.equbot.com/"
  },
  {
    id: 36,
    name: "Sigmoidal",
    category: "trading",
    description: "Custom AI trading solutions with machine learning algorithms for institutional and retail traders.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Machine Learning", "Custom Solutions", "Institutional"],
    url: "https://sigmoidal.io/"
  },
  {
    id: 37,
    name: "Capitalise.ai",
    category: "trading",
    description: "AI stock analysis platform providing data-driven insights and automated screening for investment decisions.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Stock Analysis", "Automated Screening", "Data Insights"],
    url: "https://capitalise.ai/"
  },
  {
    id: 38,
    name: "Kavout",
    category: "trading",
    description: "AI investment platform using machine learning for stock ranking, portfolio optimization, and risk assessment.",
    imageUrl: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Stock Ranking", "Portfolio Optimization", "Risk Assessment"],
    url: "https://www.kavout.com/"
  },
  {
    id: 39,
    name: "Quantiacs",
    category: "trading",
    description: "Crowd-sourced quantitative trading platform with AI algorithm development and performance-based funding.",
    imageUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Crowd-Sourced", "Performance Funding", "Quant Algorithms"],
    url: "https://www.quantiacs.com/"
  },
  {
    id: 40,
    name: "Backtrader",
    category: "trading",
    description: "Python-based backtesting and trading platform with AI strategy development and historical data analysis.",
    imageUrl: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Python-Based", "Backtesting", "Historical Analysis"],
    url: "https://www.backtrader.com/"
  },
  {
    id: 41,
    name: "GitHub Copilot",
    category: "coding",
    description: "AI pair programmer that provides real-time code suggestions, completions, and explanations directly in your IDE.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["IDE Integration", "Real-time Suggestions", "OpenAI Powered"],
    url: "https://github.com/features/copilot"
  },
  {
    id: 42,
    name: "Tabnine",
    category: "coding",
    description: "AI code assistant with local model options, supporting 70+ languages and privacy-focused code completion.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["70+ Languages", "Local Models", "Privacy-First"],
    url: "https://www.tabnine.com/"
  },
  {
    id: 43,
    name: "Amazon CodeWhisperer",
    category: "coding",
    description: "AWS-optimized AI coding assistant with security scanning and cloud service integration capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["AWS Integration", "Security Scanning", "Cloud Optimized"],
    url: "https://aws.amazon.com/codewhisperer/"
  },
  {
    id: 44,
    name: "Cursor",
    category: "coding",
    description: "AI-first code editor with advanced context understanding and intelligent code generation capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["AI-First Editor", "Context Aware", "Advanced Generation"],
    url: "https://cursor.so/"
  },
  {
    id: 45,
    name: "Codeium",
    category: "coding",
    description: "Free AI-powered code completion tool with fast suggestions and support for 70+ programming languages.",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Free Tier", "Fast Suggestions", "70+ Languages"],
    url: "https://www.codeium.com/"
  },
  {
    id: 46,
    name: "Replit Ghostwriter",
    category: "coding",
    description: "Browser-based AI coding assistant integrated with Replit's collaborative development environment.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Browser-Based", "Collaborative", "Explain Code"],
    url: "https://replit.com/site/ghostwriter"
  },
  {
    id: 47,
    name: "Sourcegraph Cody",
    category: "coding",
    description: "AI coding assistant with codebase understanding and enterprise-grade security features.",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Codebase Understanding", "Enterprise Security", "Code Search"],
    url: "https://sourcegraph.com/cody"
  },
  {
    id: 48,
    name: "ChatGPT",
    category: "coding",
    description: "Conversational AI that can generate, explain, and debug code across multiple programming languages.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Conversational AI", "Code Explanation", "Multi-Language"],
    url: "https://chat.openai.com/chat"
  },
  {
    id: 49,
    name: "Claude",
    category: "coding",
    description: "AI assistant capable of complex code generation, debugging, and architectural planning with artifacts support.",
    imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Complex Generation", "Artifacts Support", "Architectural Planning"],
    url: "https://claude.ai/"
  },
  {
    id: 50,
    name: "CodeT5+",
    category: "coding",
    description: "Open-source AI model for code understanding, generation, and summarization tasks.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Open Source", "Code Understanding", "Summarization"],
    url: "https://huggingface.co/salesforce/codet5p"
  },
  {
    id: 51,
    name: "Windsurf Editor",
    category: "coding",
    description: "AI-powered development environment with intelligent code assistance and workflow automation.",
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Development Environment", "Workflow Automation", "Intelligent Assistance"],
    url: "https://windsurf.dev/"
  },
  {
    id: 52,
    name: "Qodo (formerly CodiumAI)",
    category: "coding",
    description: "AI-powered testing tool that generates meaningful tests and improves code quality automatically.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Test Generation", "Code Quality", "Automated Testing"],
    url: "https://qodo.ai/"
  },
  {
    id: 53,
    name: "FauxPilot",
    category: "coding",
    description: "Open-source alternative to GitHub Copilot that can be self-hosted for privacy and customization.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Open Source", "Self-Hosted", "Privacy Focused"],
    url: "https://fauxpilot.com/"
  },
  {
    id: 54,
    name: "Tabby",
    category: "coding",
    description: "Self-hosted AI coding assistant offering local deployment with customizable models and privacy control.",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Self-Hosted", "Customizable Models", "Privacy Control"],
    url: "https://tabby.sh/"
  },
  {
    id: 55,
    name: "Mutable.ai",
    category: "coding",
    description: "AI-powered code transformation tool with design-to-code capabilities and automatic refactoring features.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Design-to-Code", "Auto Refactoring", "Code Transformation"],
    url: "https://mutable.ai/"
  },
  {
    id: 56,
    name: "DeepCode",
    category: "coding",
    description: "AI-powered static analysis tool that detects bugs, security vulnerabilities, and code quality issues.",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Static Analysis", "Security Scanning", "Bug Detection"],
    url: "https://www.deepcode.ai/"
  },
  {
    id: 57,
    name: "Polycoder",
    category: "coding",
    description: "Open-source code generation model trained on multiple programming languages with customizable fine-tuning.",
    imageUrl: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Open Source", "Multi-Language", "Fine-Tuning"],
    url: "https://polycoder.ai/"
  },
  {
    id: 58,
    name: "CodeComplete",
    category: "coding",
    description: "Enterprise AI coding assistant with fine-tuned models for specific codebases and team workflows.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Enterprise Focus", "Fine-Tuned Models", "Team Workflows"],
    url: "https://codecomplete.ai/"
  },
  {
    id: 59,
    name: "Blackbox AI",
    category: "coding",
    description: "AI coding assistant with real-time code search, generation, and multi-language support capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Real-time Search", "Code Generation", "Multi-Language"],
    url: "https://blackbox-ai.com/"
  },
  {
    id: 60,
    name: "Kite",
    category: "coding",
    description: "AI-powered code completion engine with line-of-code completions and intelligent documentation lookup.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Line Completions", "Documentation Lookup", "Intelligent Engine"],
    url: "https://www.kite.com/"
  },
  {
    id: 61,
    name: "IntelliCode",
    category: "coding",
    description: "Microsoft's AI-powered development tool providing context-aware code completions in Visual Studio.",
    imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Microsoft", "Context-Aware", "Visual Studio"],
    url: "https://visualstudio.microsoft.com/services/intellicode/"
  },
  {
    id: 62,
    name: "Codex",
    category: "coding",
    description: "OpenAI's code generation model powering various coding assistants with natural language to code translation.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["OpenAI", "Natural Language", "Code Translation"],
    url: "https://openai.com/research/codex"
  },
  {
    id: 63,
    name: "Bind AI",
    category: "coding",
    description: "AI development environment with integrated code generation, testing, and deployment automation features.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Development Environment", "Testing Automation", "Deployment"],
    url: "https://bind.ai/"
  },
  {
    id: 64,
    name: "CodeGeeX",
    category: "coding",
    description: "Multilingual code generation model supporting 20+ programming languages with cross-language translation.",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Multilingual", "20+ Languages", "Cross-Language"],
    url: "https://codegeex.com/"
  },
  {
    id: 65,
    name: "Atomist",
    category: "coding",
    description: "AI-powered code transformation platform enabling automatic code modifications and refactoring at scale.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Code Transformation", "Auto Modifications", "Scale Refactoring"],
    url: "https://atomist.com/"
  },
  {
    id: 66,
    name: "Midjourney",
    category: "image & video",
    description: "AI image generator known for producing high-quality, artistic and visually striking images with exceptional stylistic control.",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Artistic Quality", "Stylized Images", "Discord-Based"],
    url: "https://www.midjourney.com/"
  },
  {
    id: 67,
    name: "DALL-E 3",
    category: "image & video",
    description: "OpenAI's conversational AI image generator that creates original and realistic images from detailed text prompts.",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Conversational AI", "Realistic Images", "Text-to-Image"],
    url: "https://openai.com/dall-e-3/"
  },
  {
    id: 68,
    name: "Stable Diffusion",
    category: "image & video",
    description: "Open-source AI image generation model with full customization options and local deployment capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Open Source", "Customizable", "Local Deployment"],
    url: "https://stability.ai/stable-diffusion"
  },
  {
    id: 69,
    name: "Runway ML",
    category: "image & video",
    description: "AI-powered creative suite for video generation, editing, and real-time collaboration with advanced Gen-3 Alpha model.",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Video Generation", "Creative Suite", "Gen-3 Alpha"],
    url: "https://runwayml.com/"
  },
  {
    id: 70,
    name: "Luma Dream Machine",
    category: "image & video",
    description: "AI video generator that creates high-quality videos from text and image prompts with smooth motion and lifelike visuals.",
    imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Text-to-Video", "Image-to-Video", "Smooth Motion"],
    url: "https://www.luma.ai/dream-machine"
  },
  {
    id: 71,
    name: "Pika Labs",
    category: "image & video",
    description: "AI-driven video generation platform enabling dynamic video creation from text or image prompts with enhanced motion.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Dynamic Videos", "Motion Enhancement", "Prompt-Based"],
    url: "https://www.pikalabs.ai/"
  },
  {
    id: 72,
    name: "OpenAI Sora",
    category: "image & video",
    description: "Advanced AI video model capable of generating highly realistic and imaginative scenes from text, images, and video inputs.",
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Highly Realistic", "Multi-Input", "Imaginative Scenes"],
    url: "https://openai.com/sora"
  },
  {
    id: 73,
    name: "Leonardo AI",
    category: "image & video",
    description: "AI image generator focused on creating game assets, concept art, and illustrations with fine-tuned control.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Game Assets", "Concept Art", "Fine-Tuned Control"],
    url: "https://leonardo.ai/"
  },
  {
    id: 74,
    name: "Synthesia",
    category: "image & video",
    description: "AI video platform for creating professional presenter videos with AI avatars and multilingual voice synthesis.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["AI Avatars", "Multilingual", "Professional Videos"],
    url: "https://www.synthesia.io/"
  },
  {
    id: 75,
    name: "Adobe Firefly",
    category: "image & video",
    description: "Adobe's AI-powered creative tool for generating images, text effects, and design elements integrated with Creative Suite.",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Creative Suite", "Text Effects", "Design Elements"],
    url: "https://www.adobe.com/sensei/generative-ai/firefly.html"
  },
  {
    id: 76,
    name: "Canva Text-to-Image",
    category: "image & video",
    description: "AI image generation tool integrated into Canva's design platform with 50 free generations and easy-to-use interface.",
    imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Design Integration", "50 Free Generations", "User-Friendly"],
    url: "https://www.canva.com/features/text-to-image/"
  },
  {
    id: 77,
    name: "Flux 1 Pro",
    category: "image & video",
    description: "State-of-the-art AI image generator delivering exceptional quality and detail in photorealistic image creation.",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Photorealistic", "Exceptional Quality", "State-of-the-Art"],
    url: "https://www.flux1pro.com/"
  },
  {
    id: 78,
    name: "Recraft V3",
    category: "image & video",
    description: "Advanced AI image generator with superior text rendering capabilities and precise control over visual elements.",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Text Rendering", "Precise Control", "Visual Elements"],
    url: "https://www.recraftv3.com/"
  },
  {
    id: 79,
    name: "Haiper AI",
    category: "image & video",
    description: "AI video generation platform specializing in creating dynamic and engaging video content from simple text prompts.",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Dynamic Content", "Engaging Videos", "Simple Prompts"],
    url: "https://www.haiper.ai/"
  },
  {
    id: 80,
    name: "Kling AI",
    category: "image & video",
    description: "Chinese AI video generator offering high-quality video synthesis with competitive features and pricing models.",
    imageUrl: "https://images.app.goo.gl/PeRkBfXChwvVxGh38",
    tags: ["High-Quality Synthesis", "Competitive Pricing", "Video Creation"],
    url: "https://app.klingai.com/global/?gad_source=1&gad_campaignid=22428399262&gbraid=0AAAAA_AcKMlikvDJXTo_wkMn6vqO8lVgB"
  },
  {
    id: 81,
    name: "Artbreeder",
    category: "image & video",
    description: "Collaborative AI art platform for blending and evolving images using genetic algorithms and GANs.",
    imageUrl: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Collaborative Art", "Genetic Algorithms", "Image Blending"],
    url: "https://www.artbreeder.com/"
  },
  {
    id: 82,
    name: "NightCafe Studio",
    category: "image & video",
    description: "AI art generator with multiple algorithms including Stable Diffusion, DALL-E, and neural style transfer options.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Multiple Algorithms", "Style Transfer", "Art Generator"],
    url: "https://nightcafe.studio/"
  },
  {
    id: 83,
    name: "DeepAI",
    category: "image & video",
    description: "AI image and video processing platform offering various generators, enhancers, and creative filters.",
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Image Processing", "Creative Filters", "Enhancers"],
    url: "https://deepai.org/"
  },
  {
    id: 84,
    name: "Jasper AI Art",
    category: "image & video",
    description: "AI-powered image generation tool integrated with Jasper's content creation platform for marketing materials.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Marketing Materials", "Content Integration", "AI-Powered"],
    url: "https://www.jasper.ai/art"
  },
  {
    id: 85,
    name: "Photosonic",
    category: "image & video",
    description: "Writesonic's AI image generator creating unique royalty-free images from text descriptions for various use cases.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Royalty-Free", "Unique Images", "Various Use Cases"],
    url: "https://writesonic.com/photosonic"
  },
  {
    id: 86,
    name: "Pictory",
    category: "image & video",
    description: "AI video creation platform that transforms scripts, blog posts, and articles into engaging short videos automatically.",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Script-to-Video", "Blog Posts", "Automatic Creation"],
    url: "https://pictory.ai/"
  },
  {
    id: 87,
    name: "Lensa AI",
    category: "image & video",
    description: "Mobile AI photo editor and avatar generator with advanced portrait enhancement and artistic style filters.",
    imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Mobile App", "Avatar Generator", "Portrait Enhancement"],
    url: "https://apps.apple.com/us/app/lensa-ai-photo-editor/id6472683301"
  },
  {
    id: 88,
    name: "Wombo Dream",
    category: "image & video",
    description: "Simple AI art generator app that creates colorful and abstract artwork from text prompts with various art styles.",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Simple Interface", "Abstract Artwork", "Various Styles"],
    url: "https://www.wombo.art/dream"
  },
  {
    id: 89,
    name: "Invideo AI",
    category: "image & video",
    description: "AI-powered video creation platform with automated editing, voice synthesis, and template-based video generation.",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Automated Editing", "Voice Synthesis", "Template-Based"],
    url: "https://invideo.io/ai/"
  },
  {
    id: 90,
    name: "Playground AI",
    category: "image & video",
    description: "Free AI image generator with a user-friendly interface, offering multiple models and editing capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    tags: ["Free Generator", "User-Friendly", "Multiple Models"],
    url: "https://playgroundai.com/"
  },
  
  {
    "id": 91,
    "name": "Notion AI",
    "category": "Productivity",
    "description": "An AI assistant integrated within the Notion workspace to summarize, rewrite, and brainstorm content directly in your documents and databases.",
    "imageUrl": "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Workspace", "Summarizer", "Note Taking"],
    "url": "https://www.notion.so/product/ai"
  },
  {
    "id": 92,
    "name": "Fireflies.ai",
    "category": "Productivity",
    "description": "An AI meeting assistant that records, transcribes, summarizes, and analyzes your voice conversations from various web-conferencing platforms.",
    "imageUrl": "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Transcription", "Meeting Assistant", "Automation"],
    "url": "https://fireflies.ai/"
  },
  {
    "id": 93,
    "name": "Motion",
    "category": "Productivity",
    "description": "Uses AI to automatically plan your day, schedule tasks, and manage projects by building an intelligent calendar.",
    "imageUrl": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["AI Scheduler", "Task Management", "Calendar"],
    "url": "https://www.usemotion.com/"
  },
  {
    "id": 94,
    "name": "ClickUp AI",
    "category": "Productivity",
    "description": "A role-based AI assistant inside ClickUp that helps generate action items, summarize tasks, and write project updates.",
    "imageUrl": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Project Management", "Team Collaboration", "Summarizer"],
    "url": "https://clickup.com/features/ai"
  },
  {
    "id": 95,
    "name": "Zapier",
    "category": "Productivity",
    "description": "An automation platform that connects your apps and services, allowing you to build AI-powered workflows without code.",
    "imageUrl": "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Automation", "Integration", "Workflow"],
    "url": "https://zapier.com/"
  },
  {
    "id": 96,
    "name": "Grammarly",
    "category": "Productivity",
    "description": "An AI-powered writing assistant that checks grammar, spelling, style, and tone, with generative AI features for rewriting and ideation.",
    "imageUrl": "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Writing Assistant", "Grammar Check", "Communication"],
    "url": "https://www.grammarly.com/"
  },
  {
    "id": 97,
    "name": "Tome",
    "category": "Productivity",
    "description": "An AI-powered storytelling and presentation tool that helps you generate entire narratives, slides, and images from a single prompt.",
    "imageUrl": "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Presentations", "Storytelling", "Generative AI"],
    "url": "https://tome.app/"
  },
  {
    "id": 98,
    "name": "Otter.ai",
    "category": "Productivity",
    "description": "Provides real-time transcription for meetings and conversations, and automatically generates summaries and action items.",
    "imageUrl": "https://images.unsplash.com/photo-1590650213764-3246034c2643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Live Transcription", "Meeting Notes", "Audio"],
    "url": "https://otter.ai/"
  },
  {
    "id": 99,
    "name": "Reclaim.ai",
    "category": "Productivity",
    "description": "An intelligent calendar assistant that automatically finds the best time for your tasks, habits, and meetings.",
    "imageUrl": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["AI Calendar", "Time Blocking", "Scheduling"],
    "url": "https://reclaim.ai/"
  },
  {
    "id": 100,
    "name": "SaneBox",
    "category": "Productivity",
    "description": "An AI tool that analyzes your email history to prioritize important messages and filter out distractions, keeping your inbox clean.",
    "imageUrl": "https://images.unsplash.com/photo-1589762382587-32b0e4b8a249?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Email Management", "Inbox Zero", "Filtering"],
    "url": "https://www.sanebox.com/"
  },
  {
    "id": 101,
    "name": "Microsoft 365 Copilot",
    "category": "Productivity",
    "description": "AI integrated across Microsoft 365 apps (Word, Excel, PowerPoint, Outlook) to draft documents, analyze data, and summarize emails.",
    "imageUrl": "https://images.unsplash.com/photo-1600132806378-43d0409a15f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Office Suite", "Data Analysis", "Enterprise AI"],
    "url": "https://www.microsoft.com/en-us/microsoft-365/copilot-for-microsoft-365"
  },
  {
    "id": 102,
    "name": "Gamma",
    "category": "Productivity",
    "description": "A fast, AI-powered alternative to slides. Helps create engaging presentations, documents, and webpages from text prompts.",
    "imageUrl": "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Presentations", "Document Creation", "No-Code"],
    "url": "https://gamma.app/"
  },
  {
    "id": 103,
    "name": "Mem",
    "category": "Productivity",
    "description": "A self-organizing workspace that uses AI to connect your notes, files, and calendar events, making information easy to find and use.",
    "imageUrl": "https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Knowledge Management", "Note Taking", "Personal CRM"],
    "url": "https://mem.ai/"
  },
  {
    "id": 104,
    "name": "Superhuman",
    "category": "Productivity",
    "description": "The fastest email experience ever made, with AI features for summarizing threads, writing drafts, and organizing your inbox.",
    "imageUrl": "https://images.unsplash.com/photo-1557997372-1c1a2523f6c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Email Client", "Speed", "Keyboard Shortcuts"],
    "url": "https://superhuman.com/"
  },
  {
    "id": 105,
    "name": "Clockwise",
    "category": "Productivity",
    "description": "An intelligent calendar assistant that optimizes your team's schedule to create more focus time and resolve meeting conflicts.",
    "imageUrl": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Calendar", "Focus Time", "Team Scheduling"],
    "url": "https://www.getclockwise.com/"
  },
  {
    "id": 106,
    "name": "Glean",
    "category": "Productivity",
    "description": "An AI-powered work search assistant that helps you find exactly what you need across all your company's apps and documents.",
    "imageUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Enterprise Search", "Knowledge Discovery", "Work Assistant"],
    "url": "https://www.glean.com/"
  },
  {
    "id": 107,
    "name": "Asana Intelligence",
    "category": "Productivity",
    "description": "AI features within Asana that provide project risk assessments, suggest tasks, and generate intelligent status reports.",
    "imageUrl": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Project Management", "Workflow", "Team Goals"],
    "url": "https://asana.com/product/ai"
  },
  {
    "id": 108,
    "name": "Sembly AI",
    "category": "Productivity",
    "description": "A smart meeting assistant that generates automated meeting minutes, identifies key items, and creates summaries with action points.",
    "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Meeting Notes", "AI Assistant", "Action Items"],
    "url": "https://www.sembly.ai/"
  },
  {
    "id": 109,
    "name": "Magical",
    "category": "Productivity",
    "description": "A text expander and automation tool that uses AI to instantly fill sheets, reply to messages, and automate repetitive data entry tasks.",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Automation", "Text Expander", "Data Entry"],
    "url": "https://www.getmagical.com/"
  },
  {
    "id": 110,
    "name": "Wrike",
    "category": "Productivity",
    "description": "A project management tool with AI features like task prioritization, predictive risk analysis, and automated document processing.",
    "imageUrl": "https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Project Management", "Risk Analysis", "Automation"],
    "url": "https://www.wrike.com/features/ai-project-management/"
  },
  {
    "id": 111,
    "name": "Timely",
    "category": "Productivity",
    "description": "An automated time tracking tool that uses AI to capture all your work activity and create accurate timesheets for you.",
    "imageUrl": "https://images.unsplash.com/photo-1497215868191-1ca9b1c0c3c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Time Tracking", "Automation", "Reporting"],
    "url": "https://timelyapp.com/"
  },
  {
    "id": 112,
    "name": "Make",
    "category": "Productivity",
    "description": "A visual automation platform similar to Zapier, allowing you to design, build, and automate anything from tasks to complex workflows.",
    "imageUrl": "https://images.unsplash.com/photo-1529119368499-315bc7f98543?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Workflow Automation", "No-Code", "Integration"],
    "url": "https://www.make.com/"
  },
  {
    "id": 113,
    "name": "Textio",
    "category": "Productivity",
    "description": "An AI writing platform that helps companies write more inclusive and effective job descriptions and performance feedback.",
    "imageUrl": "https://images.unsplash.com/photo-1553877522-c36980345885?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Inclusive Writing", "HR Tech", "Augmented Writing"],
    "url": "https://textio.com/"
  },
  {
    "id": 114,
    "name": "Todoist",
    "category": "Productivity",
    "description": "A task manager that uses natural language processing and AI-assisted features to help organize your work and life.",
    "imageUrl": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Task Manager", "To-Do List", "Organization"],
    "url": "https://todoist.com/"
  },
  {
    "id": 115,
    "name": "Google Workspace AI",
    "category": "Productivity",
    "description": "Formerly Duet AI, this suite of features brings generative AI to Google Docs, Gmail, Sheets, and Meet for drafting, summarizing, and analysis.",
    "imageUrl": "https://images.unsplash.com/photo-1610986603124-d2139dba42a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Google Suite", "Generative AI", "Collaboration"],
    "url": "https://workspace.google.com/solutions/ai/"
  },
  
  {
    "id": 116,
    "name": "Jasper",
    "category": "Content Creation",
    "description": "An advanced AI content platform for creating high-quality marketing copy, blog posts, social media updates, and other written content.",
    "imageUrl": "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["AI Writer", "Copywriting", "Marketing"],
    "url": "https://www.jasper.ai/"
  },
  {
    "id": 117,
    "name": "Midjourney",
    "category": "Content Creation",
    "description": "A premier AI image generator known for producing highly artistic, detailed, and high-resolution images from text prompts via Discord.",
    "imageUrl": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Image Generator", "Artistic", "Text-to-Image"],
    "url": "https://www.midjourney.com/"
  },
  {
    "id": 118,
    "name": "ElevenLabs",
    "category": "Content Creation",
    "description": "Generates realistic, human-like voiceovers and cloned voices from text using advanced deep learning models for videos, podcasts, and audiobooks.",
    "imageUrl": "https://images.unsplash.com/photo-1590235320392-a6390a3a41e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Voice Generator", "Text-to-Speech", "Audio"],
    "url": "https://elevenlabs.io/"
  },
  {
    "id": 119,
    "name": "Runway",
    "category": "Content Creation",
    "description": "An all-in-one content creation suite with powerful AI magic tools for video editing, including text-to-video, inpainting, and motion tracking.",
    "imageUrl": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Video Editing", "Text-to-Video", "AI Tools"],
    "url": "https://runwayml.com/"
  },
  {
    "id": 120,
    "name": "Copy.ai",
    "category": "Content Creation",
    "description": "An AI-powered copywriter that generates creative content for businesses, including sales copy, product descriptions, and digital ad copy.",
    "imageUrl": "https://images.unsplash.com/photo-1516245834210-c4c1427873ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Copywriting", "Marketing", "Content Generator"],
    "url": "https://www.copy.ai/"
  },
  {
    "id": 121,
    "name": "Synthesia",
    "category": "Content Creation",
    "description": "An AI video generation platform that allows you to create professional videos with AI avatars and voiceovers in minutes.",
    "imageUrl": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["AI Video", "Avatars", "Corporate Training"],
    "url": "https://www.synthesia.io/"
  },
  {
    "id": 122,
    "name": "DALL-E 3",
    "category": "Content Creation",
    "description": "OpenAI's image generation model that creates highly detailed and contextually accurate images from text descriptions, integrated into ChatGPT and other tools.",
    "imageUrl": "https://images.unsplash.com/photo-1664447979928-047b1836a44a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Image Generator", "OpenAI", "Creative"],
    "url": "https://openai.com/dall-e-3"
  },
  {
    "id": 123,
    "name": "Descript",
    "category": "Content Creation",
    "description": "An all-in-one editor that makes editing audio and video as simple as editing a text document, with AI features like overdub and studio sound.",
    "imageUrl": "https://images.unsplash.com/photo-1616541674175-f74f76274438?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Video Editing", "Podcasting", "Transcription"],
    "url": "https://www.descript.com/"
  },
  {
    "id": 124,
    "name": "Writesonic",
    "category": "Content Creation",
    "description": "An AI writer that creates SEO-friendly content for blogs, ads, and websites, complete with a chatbot builder and paraphrasing tools.",
    "imageUrl": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["AI Writer", "SEO", "Blog Posts"],
    "url": "https://writesonic.com/"
  },
  {
    "id": 125,
    "name": "Leonardo.Ai",
    "category": "Content Creation",
    "description": "A platform for generating high-quality game assets, concept art, and illustrations using a variety of fine-tuned AI models.",
    "imageUrl": "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Game Assets", "Image Generator", "Art"],
    "url": "https://leonardo.ai/"
  },
  {
    "id": 126,
    "name": "Murf.ai",
    "category": "Content Creation",
    "description": "A versatile AI voice generator that provides a library of realistic voices for creating voiceovers for videos and presentations.",
    "imageUrl": "https://images.unsplash.com/photo-1543269733-72a0f7a622a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Voiceover", "Text-to-Speech", "Audio Content"],
    "url": "https://murf.ai/"
  },
  {
    "id": 127,
    "name": "Surfer SEO",
    "category": "Content Creation",
    "description": "A content intelligence tool that helps you write and optimize articles to rank high on search engines by analyzing top competitors.",
    "imageUrl": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["SEO", "Content Optimization", "Auditing"],
    "url": "https://surferseo.com/"
  },
  {
    "id": 128,
    "name": "Pictory",
    "category": "Content Creation",
    "description": "An AI video generator that enables you to create and edit professional-quality videos from scripts or blog posts automatically.",
    "imageUrl": "https://images.unsplash.com/photo-1517436073-3b1a37c9f693?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Article-to-Video", "Video Automation", "Social Media"],
    "url": "https://pictory.ai/"
  },
  {
    "id": 129,
    "name": "Suno AI",
    "category": "Content Creation",
    "description": "An innovative AI music generator that creates original songs, complete with vocals and instruments, from a simple text prompt.",
    "imageUrl": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Music Generation", "AI Song", "Text-to-Music"],
    "url": "https://www.suno.ai/"
  },
  {
    "id": 130,
    "name": "Canva Magic Studio",
    "category": "Content Creation",
    "description": "A suite of AI-powered design tools within Canva, including Magic Write, Magic Design, and a text-to-image generator for effortless creation.",
    "imageUrl": "https://images.unsplash.com/photo-1611926653458-0929221b6a42?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Graphic Design", "AI Design", "Marketing Assets"],
    "url": "https://www.canva.com/magic-studio/"
  },
  {
    "id": 131,
    "name": "Rytr",
    "category": "Content Creation",
    "description": "An AI writing assistant that helps you create high-quality content for blogs, emails, and social media in just a few seconds.",
    "imageUrl": "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["AI Writer", "Affordable", "Content Generation"],
    "url": "https://rytr.me/"
  },
  {
    "id": 132,
    "name": "Opus Clip",
    "category": "Content Creation",
    "description": "An AI video repurposing tool that turns long videos into short, viral-ready clips for platforms like TikTok, YouTube Shorts, and Reels.",
    "imageUrl": "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Video Clipping", "Repurposing", "Social Media"],
    "url": "https://www.opus.pro/"
  },
  {
    "id": 133,
    "name": "Frase.io",
    "category": "Content Creation",
    "description": "An AI tool that helps you research, write, and optimize SEO content faster by generating content briefs and answering questions.",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["SEO", "Content Briefs", "Research"],
    "url": "https://www.frase.io/"
  },
  {
    "id": 134,
    "name": "Playground AI",
    "category": "Content Creation",
    "description": "A free-to-use online AI image creator with a user-friendly interface, offering multiple models and powerful editing capabilities.",
    "imageUrl": "https://images.unsplash.com/photo-1512418490979-92798e940478?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Free Generator", "User-Friendly", "Multiple Models"],
    "url": "https://playground.com/"
  },
  {
    "id": 135,
    "name": "InVideo",
    "category": "Content Creation",
    "description": "An online video editor with AI-powered features like text-to-video, pre-made templates, and a stock media library for quick video creation.",
    "imageUrl": "https://images.unsplash.com/photo-1533613225195-508a284a6839?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Video Editor", "Templates", "Text-to-Video"],
    "url": "https://invideo.io/"
  },
  {
    "id": 136,
    "name": "LALAL.AI",
    "category": "Content Creation",
    "description": "A high-quality stem splitter that uses AI to extract vocals, accompaniment, and individual instruments from any audio or video file.",
    "imageUrl": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Audio Editing", "Stem Splitter", "Music Production"],
    "url": "https://www.lalal.ai/"
  },
  {
    "id": 137,
    "name": "Gamma",
    "category": "Content Creation",
    "description": "A fast, AI-powered alternative to slides that helps you create engaging presentations, documents, and webpages from a simple prompt.",
    "imageUrl": "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Presentations", "Generative AI", "Design"],
    "url": "https://gamma.app/"
  },
  {
    "id": 138,
    "name": "AIVA",
    "category": "Content Creation",
    "description": "An Artificial Intelligence that composes emotional and royalty-free soundtracks for films, commercials, games, and television.",
    "imageUrl": "https://images.unsplash.com/photo-1567595332247-c0b893457143?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Music Composition", "Soundtrack", "Royalty-Free"],
    "url": "https://www.aiva.ai/"
  },
  {
    "id": 139,
    "name": "Luma AI",
    "category": "Content Creation",
    "description": "An AI tool that allows you to create photorealistic 3D models and scenes from video clips captured on your phone.",
    "imageUrl": "https://images.unsplash.com/photo-1655185497013-db98aca06149?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["3D Models", "Generative 3D", "Photogrammetry"],
    "url": "https://lumalabs.ai/"
  },
  {
    "id": 140,
    "name": "DeepL Write",
    "category": "Content Creation",
    "description": "An AI writing assistant that improves your text by fixing grammar and punctuation mistakes and suggesting alternative phrasing for clarity and style.",
    "imageUrl": "https://images.unsplash.com/photo-1491841550275-5b462bf48366?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Writing Assistant", "Paraphrasing", "Grammar"],
    "url": "https://www.deepl.com/write"
  },

  {
    "id": 141,
    "name": "HubSpot AI",
    "category": "Marketing",
    "description": "A suite of AI tools integrated into the HubSpot platform to help draft emails, generate blog ideas, create social media copy, and build reports.",
    "imageUrl": "https://images.unsplash.com/photo-1616469829935-c2f334a09a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["CRM", "Content Marketing", "Analytics"],
    "url": "https://www.hubspot.com/artificial-intelligence"
  },
  {
    "id": 142,
    "name": "Jasper",
    "category": "Marketing",
    "description": "The essential AI co-pilot for enterprise marketing teams to create high-quality ad copy, social media content, and marketing emails at scale.",
    "imageUrl": "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Ad Copy", "AI Writer", "Brand Voice"],
    "url": "https://www.jasper.ai/"
  },
  {
    "id": 143,
    "name": "Surfer SEO",
    "category": "Marketing",
    "description": "A content intelligence tool that helps marketers plan, write, and optimize blog content to rank higher on search engines.",
    "imageUrl": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["SEO", "Content Optimization", "Keyword Research"],
    "url": "https://surferseo.com/"
  },
  {
    "id": 144,
    "name": "AdCreative.ai",
    "category": "Marketing",
    "description": "Generates conversion-focused ad creatives and social media post creatives in seconds, helping to improve campaign performance.",
    "imageUrl": "https://images.unsplash.com/photo-1607703703520-bb638e84caf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Ad Creatives", "Performance Marketing", "Automation"],
    "url": "https://www.adcreative.ai/"
  },
  {
    "id": 145,
    "name": "Flick",
    "category": "Marketing",
    "description": "An all-in-one social media marketing platform with AI assistance for writing captions, finding hashtags, and scheduling posts.",
    "imageUrl": "https://images.unsplash.com/photo-1611162616805-6a405743f361?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Social Media", "Hashtags", "Content Scheduling"],
    "url": "https://www.flick.tech/"
  },
  {
    "id": 146,
    "name": "Klaviyo AI",
    "category": "Marketing",
    "description": "AI features within the Klaviyo platform that assist with email subject line generation, predictive analytics, and SMS content creation.",
    "imageUrl": "https://images.unsplash.com/photo-1589762382587-32b0e4b8a249?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Email Marketing", "SMS Marketing", "Predictive Analytics"],
    "url": "https://www.klaviyo.com/features/klaviyo-ai"
  },
  {
    "id": 147,
    "name": "MarketMuse",
    "category": "Marketing",
    "description": "An AI-powered content planning and optimization platform that helps marketers build topical authority and win at SEO.",
    "imageUrl": "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Content Strategy", "SEO", "Topical Authority"],
    "url": "https://www.marketmuse.com/"
  },
  {
    "id": 148,
    "name": "Unbounce Smart Builder",
    "category": "Marketing",
    "description": "An AI-powered landing page builder that suggests copy and design layouts optimized for your industry and conversion goals.",
    "imageUrl": "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Landing Pages", "Conversion Rate", "Page Builder"],
    "url": "https://unbounce.com/landing-page-builder/"
  },
  {
    "id": 149,
    "name": "Lately",
    "category": "Marketing",
    "description": "An AI content repurposing tool that turns long-form content like blogs and webinars into dozens of high-performing social media posts.",
    "imageUrl": "https://images.unsplash.com/photo-1612733848383-a9994b6d3a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Social Media", "Repurposing", "Content Automation"],
    "url": "https://www.lately.ai/"
  },
  {
    "id": 150,
    "name": "Synthesia",
    "category": "Marketing",
    "description": "Create professional-quality videos for marketing campaigns, product demos, and social media using AI avatars and voiceovers.",
    "imageUrl": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Video Marketing", "AI Avatars", "Explainer Videos"],
    "url": "https://www.synthesia.io/"
  },
  {
    "id": 151,
    "name": "Brandwatch",
    "category": "Marketing",
    "description": "A consumer intelligence platform that uses AI to analyze social media conversations, reviews, and news to uncover market trends.",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Social Listening", "Consumer Insights", "Analytics"],
    "url": "https://www.brandwatch.com/"
  },
  {
    "id": 152,
    "name": "Copy.ai",
    "category": "Marketing",
    "description": "An AI-powered copywriter that generates creative content for businesses, specializing in sales copy and digital ad copy.",
    "imageUrl": "https://images.unsplash.com/photo-1516245834210-c4c1427873ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Copywriting", "Sales Funnels", "Ad Copy"],
    "url": "https://www.copy.ai/"
  },
  {
    "id": 153,
    "name": "Pencil",
    "category": "Marketing",
    "description": "An AI ad generator that connects to your ad accounts and e-commerce store to create new ad variations predicted to perform well.",
    "imageUrl": "https://images.unsplash.com/photo-1620325867582-51b227515c46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Ad Creatives", "E-commerce", "Generative AI"],
    "url": "https://www.trypencil.com/"
  },
  {
    "id": 154,
    "name": "Ortto",
    "category": "Marketing",
    "description": "A customer data and marketing automation platform using AI to personalize customer journeys across email, SMS, and more.",
    "imageUrl": "https://images.unsplash.com/photo-1556740738-b6a63e2775d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Marketing Automation", "Customer Journey", "Personalization"],
    "url": "https://ortto.com/"
  },
  {
    "id": 155,
    "name": "Phrasee",
    "category": "Marketing",
    "description": "An AI platform that specializes in generating and optimizing on-brand marketing copy for emails, push notifications, and social ads.",
    "imageUrl": "https://images.unsplash.com/photo-1553877522-c36980345885?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Brand Voice", "Email Copy", "Enterprise"],
    "url": "https://phrasee.co/"
  },
  {
    "id": 156,
    "name": "Albert.ai",
    "category": "Marketing",
    "description": "An autonomous AI marketing platform that manages and optimizes digital advertising campaigns across various channels.",
    "imageUrl": "https://images.unsplash.com/photo-1614028674026-a0a143611317?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Autonomous AI", "Ad Optimization", "Cross-Channel"],
    "url": "https://albert.ai/"
  },
  {
    "id": 157,
    "name": "Mailchimp AI",
    "category": "Marketing",
    "description": "Features inside Mailchimp like a Content Optimizer and Creative Assistant that help improve email campaigns and generate designs.",
    "imageUrl": "https://images.unsplash.com/photo-1557997372-1c1a2523f6c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Email Marketing", "Content Optimizer", "Design"],
    "url": "https://mailchimp.com/features/ai-tools/"
  },
  {
    "id": 158,
    "name": "Seventh Sense",
    "category": "Marketing",
    "description": "An AI platform that personalizes email send times for each individual recipient to maximize open rates and engagement.",
    "imageUrl": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Email Optimization", "Send Time", "Engagement"],
    "url": "https://www.theseventhsense.com/"
  },
  {
    "id": 159,
    "name": "Perplexity AI",
    "category": "Marketing",
    "description": "A conversational search engine that acts as a powerful research tool for marketers to find insights, statistics, and customer trends.",
    "imageUrl": "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Market Research", "Search Engine", "Insights"],
    "url": "https://www.perplexity.ai/"
  },
  {
    "id": 160,
    "name": "Pictory",
    "category": "Marketing",
    "description": "An AI tool that turns long-form content like blogs into short, branded videos perfect for social media marketing.",
    "imageUrl": "https://images.unsplash.com/photo-1517436073-3b1a37c9f693?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Video Marketing", "Content Repurposing", "Branded Content"],
    "url": "https://pictory.ai/"
  },
  {
    "id": 161,
    "name": "Writesonic",
    "category": "Marketing",
    "description": "An AI writer for creating SEO-optimized and plagiarism-free content for blogs, ads, emails, and websites at high speed.",
    "imageUrl": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["AI Writer", "SEO", "Landing Pages"],
    "url": "https://writesonic.com/"
  },
  {
    "id": 162,
    "name": "Exceed.ai",
    "category": "Marketing",
    "description": "An AI-powered conversational marketing platform that qualifies leads through two-way automated email and chat conversations.",
    "imageUrl": "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Lead Qualification", "Conversational AI", "Sales Assistant"],
    "url": "https://www.exceed.ai/"
  },
  {
    "id": 163,
    "name": "Attentive",
    "category": "Marketing",
    "description": "A leading SMS marketing platform that uses AI to personalize text message campaigns and drive revenue for e-commerce brands.",
    "imageUrl": "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["SMS Marketing", "Personalization", "E-commerce"],
    "url": "https://www.attentive.com/"
  },
  {
    "id": 164,
    "name": "Drift",
    "category": "Marketing",
    "description": "A conversational marketing and sales platform that uses AI-powered chatbots to engage website visitors and book meetings.",
    "imageUrl": "https://images.unsplash.com/photo-1591696205602-2f950c41744a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["Conversational Marketing", "Chatbot", "Lead Generation"],
    "url": "https://www.drift.com/"
  },
  {
    "id": 165,
    "name": "Semrush",
    "category": "Marketing",
    "description": "A comprehensive SEO and marketing toolkit with AI features for keyword research, competitor analysis, and content strategy.",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    "tags": ["SEO", "Competitor Analysis", "Marketing Toolkit"],
    "url": "https://www.semrush.com/"
  }



];






const categories = [
  { id: "all", name: "All Tools", icon: null },
  { id: "content-creation", name: "Content Creation", icon: Pen },
  { id: "image-video", name: "Image & Video", icon: Camera },
  { id: "productivity", name: "Productivity", icon: Rocket },
  { id: "coding", name: "Coding", icon: Code },
  { id: "marketing", name: "Marketing", icon: TrendingUp },
  { id: "trading", name: "Trading", icon: TrendingUp },
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
    case "trading":
      return "Trading";
    default:
      return category.charAt(0).toUpperCase() + category.slice(1);
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
    case "trading":
      return "bg-yellow-100 text-yellow-800";
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
    const matchesCategory = activeCategory === "all" || tool.category.toLowerCase() === activeCategory.toLowerCase();
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
              <h1 className="text-xl font-bold text-slate-900">Tools Herd AI</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Browse</a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Categories</a>
              <FeedbackForm />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 animate-in fade-in duration-500">
            Tools Herd AI: Your Ultimate AI Directory
            <span className="block text-3xl lg:text-5xl text-blue-600 mt-2">
              Discover 2024's Best AI Tools by Category
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
      <main className="py-16 bg-slate-50" itemScope itemType="https://schema.org/CollectionPage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4" itemProp="name">Featured AI Tools</h2>
            <p className="text-lg text-slate-600" itemProp="description">Curated collection of the most powerful AI tools available today</p>
          </header>

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
                <h3 className="text-xl font-bold">Tools Herd AI</h3>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Discover, compare, and find the perfect AI tools for your needs. We curate the best AI solutions across all categories.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <TwitterIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <LinkedinIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <GithubIcon className="h-6 w-6" />
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
                <li><a href="#" className="hover:text-white transition-colors">Trading</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#feedback" className="hover:text-white transition-colors">Send Feedback</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 Tools Herd AI. All rights reserved.
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
