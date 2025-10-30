// AI 인사이트 페이지

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Sparkles, 
  TrendingUp, 
  Lightbulb, 
  Brain, 
  Globe,
  Search,
  Bookmark,
  ExternalLink,
  Clock,
  Share2,
  Shield
} from 'lucide-react';

interface AIInsightsProps {
  buttonSize: 'default' | 'lg';
}

interface Insight {
  id: string;
  title: string;
  summary: string;
  category: string;
  topic: string;
  readTime: string;
  date: string;
  url: string;
  source: string;
  tags: string[];
}

export function AIInsights({ buttonSize }: AIInsightsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [savedInsights, setSavedInsights] = useState<Set<string>>(new Set());

  // Mock insights - In real app, this would fetch from Perplexity API
  const insights: Insight[] = [
    {
      id: '1',
      title: 'ChatGPT-4의 새로운 음성 대화 기능',
      summary: 'OpenAI가 발표한 GPT-4의 음성 인터페이스는 자연스러운 대화가 가능합니다. 실시간 음성 인식과 감정 인식 기능이 추가되어 더욱 인간적인 상호작용이 가능해졌습니다.',
      category: 'AI 기술',
      topic: 'ChatGPT',
      readTime: '3분',
      date: '2시간 전',
      url: 'https://perplexity.ai',
      source: 'OpenAI Blog',
      tags: ['AI', '음성인식', '대화형AI']
    },
    {
      id: '2',
      title: '중장년층을 위한 AI 활용 가이드',
      summary: '50대 이상을 위한 실용적인 AI 도구 활용법. 일상생활에서 바로 쓸 수 있는 이메일 작성, 사진 편집, 문서 정리 등의 기능을 소개합니다.',
      category: '실용 가이드',
      topic: '시니어 AI',
      readTime: '5분',
      date: '5시간 전',
      url: 'https://perplexity.ai',
      source: 'TechCrunch',
      tags: ['시니어', '활용법', '실생활']
    },
    {
      id: '3',
      title: '최신 AI 사기 수법과 예방법',
      summary: 'AI 기술을 악용한 딥페이크 보이스피싱이 증가하고 있습니다. 가족의 목소리를 모방하는 사기 수법과 이를 구별하는 방법을 알아봅니다.',
      category: '보안',
      topic: '사기예방',
      readTime: '4분',
      date: '1일 전',
      url: 'https://perplexity.ai',
      source: '경찰청 사이버안전국',
      tags: ['보안', '딥페이크', '사기예방']
    },
    {
      id: '4',
      title: 'Google의 Gemini AI 완전 분석',
      summary: '구글의 최신 AI 모델 Gemini의 기능과 활용 방법. 멀티모달 처리로 텍스트, 이미지, 음성을 동시에 이해하고 생성할 수 있습니다.',
      category: 'AI 기술',
      topic: 'Google AI',
      readTime: '6분',
      date: '1일 전',
      url: 'https://perplexity.ai',
      source: 'Google AI Blog',
      tags: ['Google', 'Gemini', '멀티모달']
    },
    {
      id: '5',
      title: 'AI로 재무 계획 세우기',
      summary: '개인 재무 관리에 AI를 활용하는 방법. 지출 패턴 분석, 저축 목표 설정, 투자 포트폴리오 제안까지 AI가 도와줍니다.',
      category: '재무',
      topic: 'AI 재무관리',
      readTime: '5분',
      date: '2일 전',
      url: 'https://perplexity.ai',
      source: '한국경제',
      tags: ['재무', '투자', 'AI활용']
    },
    {
      id: '6',
      title: '노션 AI로 업무 효율 3배 높이기',
      summary: '노션의 AI 기능을 활용한 문서 자동화, 회의록 요약, 할 일 관리. 실제 직장인들의 생산성 향상 사례를 소개합니다.',
      category: '생산성',
      topic: '업무 도구',
      readTime: '4분',
      date: '2일 전',
      url: 'https://perplexity.ai',
      source: 'Notion Blog',
      tags: ['노션', '생산성', '업무자동화']
    },
    {
      id: '7',
      title: 'AI 이미지 생성 도구 비교',
      summary: 'Midjourney, DALL-E 3, Stable Diffusion의 장단점 비교. 각 도구의 특징과 어떤 상황에 어떤 도구를 사용하면 좋을지 안내합니다.',
      category: 'AI 기술',
      topic: '이미지 생성',
      readTime: '7분',
      date: '3일 전',
      url: 'https://perplexity.ai',
      source: 'The Verge',
      tags: ['이미지생성', 'Midjourney', 'DALL-E']
    },
    {
      id: '8',
      title: 'AI와 함께하는 건강 관리',
      summary: '건강 데이터 분석 AI 앱들이 개인 맞춤 건강 조언을 제공합니다. 운동, 식단, 수면 패턴을 분석하여 건강 목표 달성을 도와줍니다.',
      category: '건강',
      topic: '헬스케어 AI',
      readTime: '5분',
      date: '3일 전',
      url: 'https://perplexity.ai',
      source: 'Healthcare IT News',
      tags: ['건강', '헬스케어', 'AI분석']
    }
  ];

  const topics = [
    { value: 'all', label: '전체', icon: Globe },
    { value: 'ai-tech', label: 'AI 기술', icon: Brain },
    { value: 'practical', label: '실용 가이드', icon: Lightbulb },
    { value: 'security', label: '보안', icon: Shield },
    { value: 'productivity', label: '생산성', icon: TrendingUp }
  ];

  const toggleSave = (insightId: string) => {
    setSavedInsights(prev => {
      const newSet = new Set(prev);
      if (newSet.has(insightId)) {
        newSet.delete(insightId);
      } else {
        newSet.add(insightId);
      }
      return newSet;
    });
  };

  const filteredInsights = insights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || 
                        insight.category.toLowerCase().includes(selectedTopic.toLowerCase());
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h2>AI 인사이트</h2>
          </div>
          <p className="text-slate-600 text-sm">
            Powered by Perplexity AI - 최신 AI 트렌드와 인사이트
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          placeholder="인사이트 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Topic Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Button
              key={topic.value}
              variant={selectedTopic === topic.value ? 'default' : 'outline'}
              size="sm"
              className="gap-2 whitespace-nowrap"
              onClick={() => setSelectedTopic(topic.value)}
            >
              <Icon className="h-4 w-4" />
              {topic.label}
            </Button>
          );
        })}
      </div>

      {/* Insights Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredInsights.map((insight) => (
          <Card key={insight.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="outline">{insight.category}</Badge>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSave(insight.id)}
                  >
                    <Bookmark 
                      className={`h-4 w-4 ${
                        savedInsights.has(insight.id) ? 'fill-blue-600 text-blue-600' : ''
                      }`} 
                    />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{insight.title}</CardTitle>
              <CardDescription className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {insight.readTime}
                </span>
                <span>·</span>
                <span>{insight.date}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{insight.summary}</p>

              <div className="flex flex-wrap gap-2">
                {insight.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-600">
                  출처: {insight.source}
                </span>
                <Button size={buttonSize} variant="outline" className="gap-2" onClick={() => window.open(insight.url, '_blank')}>
                  자세히 보기
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredInsights.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="mb-2">검색 결과가 없습니다</h3>
            <p className="text-slate-600">다른 검색어를 시도해보세요</p>
          </CardContent>
        </Card>
      )}

      {/* Saved Insights */}
      {savedInsights.size > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-blue-600 fill-blue-600" />
              <span>저장한 인사이트 {savedInsights.size}개</span>
            </div>
            <Button variant="outline" size="sm">
              전체 보기
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="mb-1">Perplexity AI 인사이트란?</h4>
              <p className="text-sm text-slate-600">
                실시간으로 업데이트되는 AI 관련 최신 정보, 트렌드, 활용법을 제공합니다.
                신뢰할 수 있는 출처의 정보만을 엄선하여 전달합니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}