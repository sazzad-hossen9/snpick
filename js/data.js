/**
 * smpick - Stories Database
 * Centralized dataset for live search, category filtering, and recommendations
 */

const SMPICK_STORIES = [
  {
    id: "red-sea-shipping",
    title: "Why a shipping crisis in the Red Sea ends up on your grocery bill",
    category: "Middle East",
    type: "Analysis",
    author: "Mosharaf",
    date: "Sep 26, 2026",
    readTime: "8 min read",
    deck: "Longer routes mean higher freight and insurance — and consumers pay last. The whole supply chain, in one place.",
    url: "article.html",
    image: "assets/images/graphic-redsea.svg",
    popularRank: 2
  },
  {
    id: "climate-finance",
    title: "Climate finance: what was pledged vs. what actually arrived",
    category: "Climate",
    type: "Explainer",
    author: "Elena Rostova",
    date: "Sep 26, 2026",
    readTime: "6 min read",
    deck: "Summits announce billions. How much reaches the ground? Three questions to cut through it.",
    url: "article.html?id=climate-finance",
    image: "assets/images/graphic-climate.svg",
    popularRank: 5
  },
  {
    id: "global-rate-cuts",
    title: "Global rate cuts: what they mean for remittances and emerging currencies",
    category: "Economy",
    type: "Analysis",
    author: "Tariq Mansoor",
    date: "Sep 26, 2026",
    readTime: "7 min read",
    deck: "A weaker dollar has winners and losers. A simple guide for families who rely on money from abroad.",
    url: "article.html?id=global-rate-cuts",
    image: "assets/images/graphic-ratecuts.svg",
    popularRank: null
  },
  {
    id: "europe-ai-rules",
    title: "Why Europe's AI rules will reach the apps on your phone",
    category: "World",
    type: "Explainer",
    author: "Sophia Lind",
    date: "Sep 26, 2026",
    readTime: "9 min read",
    deck: "How regulation written in Brussels becomes a global standard, in five steps.",
    url: "article.html?id=europe-ai-rules",
    image: "assets/images/graphic-ai.svg",
    popularRank: 4
  },
  {
    id: "sudan-displacement",
    title: "Sudan's war: why the world's largest displacement isn't making headlines",
    category: "Africa",
    type: "Analysis",
    author: "Kamil Osman",
    date: "Sep 26, 2026",
    readTime: "6 min read",
    deck: "How media attention gets rationed — and what that costs in human terms.",
    url: "article.html?id=sudan-displacement",
    image: "assets/images/graphic-sudan.svg",
    popularRank: 3
  },
  {
    id: "refugee-repatriation",
    title: "The question nobody is asking in refugee repatriation talks",
    category: "Asia",
    type: "Opinion",
    author: "Amina Sen",
    date: "Sep 26, 2026",
    readTime: "5 min read",
    deck: "Without guarantees of safety and citizenship, return is a photo opportunity, not a policy.",
    url: "article.html?id=refugee-repatriation",
    image: "assets/images/graphic-sudan.svg",
    popularRank: 1
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SMPICK_STORIES };
}
