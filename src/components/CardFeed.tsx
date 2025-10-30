import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PlayCircle, Bookmark, Share2, AlertTriangle, CheckCircle, Volume2, Camera, FileText } from 'lucide-react';
import { TryItNowModal } from './TryItNowModal';
import { Alert, AlertDescription } from './ui/alert';

interface CardFeedProps {
  ageGroup: '40s' | '50s' | '60s' | '70s';
  easyMode: boolean;
  buttonSize: 'default' | 'lg';
}

interface LearningCard {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  summary: string[];
  steps: string[];
  source: string;
  warning?: string;
  fraudRisk?: 'low' | 'medium' | 'high';
  hasVoice: boolean;
  hasVideo: boolean;
  relevantFor: string[];
}

export function CardFeed({ ageGroup, easyMode, buttonSize }: CardFeedProps) {
  const [selectedCard, setSelectedCard] = useState<LearningCard | null>(null);
  const [savedCards, setSavedCards] = useState<Set<string>>(new Set());

  // Mock cards - personalized by age group
  const cards: LearningCard[] = [
    {
      id: '1',
      title: '챗GPT로 이메일 자동 작성하기',
      category: 'AI 실무',
      difficulty: 'easy',
      duration: '3분',
      summary: [
        '챗GPT를 이용해 업무 이메일을 빠르게 작성할 수 있습니다',
        '시간을 절약하고 더 전문적인 문장을 만들 수 있습니다',
        '주의: 민감한 정보는 입력하지 마세요'
      ],
      steps: [
        '챗GPT 웹사이트에 접속하기',
        '이메일 내용을 요청하는 메시지 입력하기',
        '결과를 복사해서 이메일에 붙여넣기'
      ],
      source: 'OpenAI 공식 가이드',
      warning: '회사 기밀이나 개인정보는 절대 입력하지 마세요',
      fraudRisk: 'low',
      hasVoice: true,
      hasVideo: true,
      relevantFor: ['40s', '50s']
    },
    {
      id: '2',
      title: '스미싱 문자 구별하는 방법',
      category: '보안',
      difficulty: 'easy',
      duration: '2분',
      summary: [
        '가짜 문자를 구별하는 3가지 방법을 알려드립니다',
        '클릭하기 전에 반드시 확인하세요',
        '의심스러우면 112나 가족에게 먼저 물어보세요'
      ],
      steps: [
        '발신번호가 정상인지 확인하기',
        '링크 주소가 공식 사이트인지 보기',
        '급하게 돈을 요구하면 100% 사기'
      ],
      source: '경찰청 사이버안전국',
      warning: '의심스러운 링크는 절대 클릭하지 마세요',
      fraudRisk: 'high',
      hasVoice: true,
      hasVideo: false,
      relevantFor: ['50s', '60s', '70s']
    },
    {
      id: '3',
      title: '카카오톡으로 사진 예쁘게 보내기',
      category: '생활 팁',
      difficulty: 'easy',
      duration: '2분',
      summary: [
        '사진을 원본 그대로 보내는 방법',
        '여러 장을 한 번에 보내는 방법',
        '앨범으로 정리해서 보내는 방법'
      ],
      steps: [
        '채팅방에서 + 버튼 누르기',
        '앨범에서 사진 선택하기',
        '원본 전송 체크하고 보내기'
      ],
      source: '카카오 공식 도움말',
      fraudRisk: 'low',
      hasVoice: true,
      hasVideo: true,
      relevantFor: ['60s', '70s']
    },
    {
      id: '4',
      title: 'AI로 재무 계획 세우기',
      category: 'AI 실무',
      difficulty: 'medium',
      duration: '5분',
      summary: [
        'AI를 활용해 가계부와 재무 목표를 관리할 수 있습니다',
        '대출 상환 계획과 저축 목표를 자동으로 계산합니다',
        '개인정보 보호를 위해 구체적인 금액보다는 비율로 입력하세요'
      ],
      steps: [
        'ChatGPT에 재무 상황 설명하기 (금액 대신 비율 사용)',
        '목표와 기간 알려주기',
        '제안받은 계획을 엑셀로 정리하기'
      ],
      source: '금융감독원 승인',
      warning: '구체적인 계좌번호나 자산 금액은 입력하지 마세요',
      fraudRisk: 'medium',
      hasVoice: true,
      hasVideo: true,
      relevantFor: ['40s', '50s']
    }
  ];

  // Filter cards by age group
  const relevantCards = cards.filter(card => card.relevantFor.includes(ageGroup));

  const toggleSave = (cardId: string) => {
    setSavedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRiskText = (risk?: string) => {
    switch (risk) {
      case 'high': return '⚠️ 주의 필요';
      case 'medium': return '주의';
      case 'low': return '안전';
      default: return '안전';
    }
  };

  return (
    <div className="space-y-6">
      {/* Today's Card */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2>오늘의 한 가지</h2>
          <Badge variant="default">추천</Badge>
        </div>
        
        {relevantCards.length > 0 && (
          <Card className="border-2 border-blue-500 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{relevantCards[0].category}</Badge>
                    <Badge variant={getRiskColor(relevantCards[0].fraudRisk)}>
                      {getRiskText(relevantCards[0].fraudRisk)}
                    </Badge>
                  </div>
                  <CardTitle>{relevantCards[0].title}</CardTitle>
                  <CardDescription className="mt-2">
                    {relevantCards[0].duration} 학습 · {relevantCards[0].difficulty === 'easy' ? '쉬움' : relevantCards[0].difficulty === 'medium' ? '보통' : '어려움'}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {relevantCards[0].hasVoice && (
                    <Button size="icon" variant="ghost">
                      <Volume2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* 3-line summary */}
              <div className="space-y-2 mb-4">
                {relevantCards[0].summary.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <p>{line}</p>
                  </div>
                ))}
              </div>

              {/* Warning if exists */}
              {relevantCards[0].warning && (
                <Alert className="mb-4">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertDescription>{relevantCards[0].warning}</AlertDescription>
                </Alert>
              )}

              {/* Source */}
              <p className="text-slate-600 text-sm">출처: {relevantCards[0].source}</p>
            </CardContent>

            <CardFooter className="flex gap-3">
              <Button 
                size={buttonSize} 
                className="flex-1 gap-2"
                onClick={() => setSelectedCard(relevantCards[0])}
              >
                <PlayCircle className="h-5 w-5" />
                따라해보기
              </Button>
              <Button
                size={buttonSize}
                variant="outline"
                onClick={() => toggleSave(relevantCards[0].id)}
              >
                <Bookmark className={savedCards.has(relevantCards[0].id) ? 'fill-current' : ''} />
              </Button>
              <Button size={buttonSize} variant="outline">
                <Share2 />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* More Cards */}
      <div>
        <h2 className="mb-4">맞춤 추천</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {relevantCards.slice(1).map((card) => (
            <Card key={card.id}>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{card.category}</Badge>
                  <Badge variant={getRiskColor(card.fraudRisk)}>
                    {getRiskText(card.fraudRisk)}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription>
                  {card.duration} · {card.difficulty === 'easy' ? '쉬움' : card.difficulty === 'medium' ? '보통' : '어려움'}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  {card.summary.slice(0, 2).map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-sm">{line}</p>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button 
                  size={buttonSize} 
                  className="flex-1 gap-2"
                  onClick={() => setSelectedCard(card)}
                >
                  <PlayCircle className="h-4 w-4" />
                  따라해보기
                </Button>
                <Button
                  size={buttonSize}
                  variant="outline"
                  onClick={() => toggleSave(card.id)}
                >
                  <Bookmark className={savedCards.has(card.id) ? 'fill-current' : ''} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Try It Now Modal */}
      {selectedCard && (
        <TryItNowModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          easyMode={easyMode}
          buttonSize={buttonSize}
        />
      )}
    </div>
  );
}
