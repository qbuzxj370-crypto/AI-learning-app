import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Bot,
  User,
  Send,
  Loader2,
  Sparkles,
  ArrowLeft,
  Crown,
  AlertCircle,
  Trash2
} from 'lucide-react';

interface LLMChatProps {
  onBack: () => void;
  buttonSize: 'default' | 'lg';
  subscriptionTier: 'free' | 'pro' | 'premium';
  ageGroup: '40s' | '50s' | '60s' | '70s';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

export function LLMChat({ onBack, buttonSize, subscriptionTier, ageGroup }: LLMChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! AI 학습 도우미입니다. 무엇이든 물어보세요. 😊',
      timestamp: new Date(),
      model: 'GPT-4'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [dailyUsage, setDailyUsage] = useState(3);
  const scrollRef = useRef<HTMLDivElement>(null);

  const models = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: '가장 강력한 범용 AI',
      tier: 'free',
      icon: '🤖'
    },
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: '더 빠르고 긴 대화 가능',
      tier: 'pro',
      icon: '⚡'
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      description: '자연스러운 대화에 특화',
      tier: 'pro',
      icon: '💭'
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      description: 'Google의 최신 AI',
      tier: 'premium',
      icon: '✨'
    }
  ];

  const limits = {
    free: { daily: 10, remaining: 10 - dailyUsage },
    pro: { daily: 100, remaining: 100 - dailyUsage },
    premium: { daily: Infinity, remaining: Infinity }
  };

  const currentLimit = limits[subscriptionTier];
  const canUseModel = (modelTier: string) => {
    if (subscriptionTier === 'premium') return true;
    if (subscriptionTier === 'pro' && (modelTier === 'free' || modelTier === 'pro')) return true;
    if (subscriptionTier === 'free' && modelTier === 'free') return true;
    return false;
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (currentLimit.remaining <= 0) {
      alert('오늘의 사용 횟수를 모두 소진했습니다. 내일 다시 이용하거나 구독을 업그레이드하세요.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setDailyUsage(prev => prev + 1);

    // Simulate API call - In production, replace with actual OpenAI/Anthropic/Google API
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(userMessage.content),
        timestamp: new Date(),
        model: models.find(m => m.id === selectedModel)?.name
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateMockResponse = (question: string) => {
    // Mock AI responses based on common questions
    const responses = [
      `좋은 질문이세요! ${question}에 대해 설명드리겠습니다.\n\n첫째, 이것은 매우 중요한 개념입니다. 차근차근 알아보시면 어렵지 않습니다.\n\n둘째, 실생활에서 바로 활용하실 수 있는 방법들이 많이 있습니다.\n\n더 궁금하신 점이 있으시면 언제든 물어보세요!`,
      `이해하기 쉽게 설명드리겠습니다.\n\n${question}는 일상생활에서 자주 접하는 주제인데요, 간단한 예시로 설명드리면:\n\n1. 먼저 기본 개념을 이해합니다\n2. 실습을 통해 직접 경험합니다\n3. 반복 학습으로 완전히 익힙니다\n\n천천히 따라하시면 금방 익히실 수 있습니다!`,
      `훌륭한 질문입니다! 많은 분들이 궁금해하시는 내용이에요.\n\n${question}에 대해서는 이렇게 생각하시면 됩니다:\n\n- 핵심은 기본을 탄탄히 하는 것입니다\n- 너무 어렵게 생각하지 마세요\n- 조금씩 단계별로 배우면 됩니다\n\n도움이 되셨기를 바랍니다!`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (confirm('대화 내역을 모두 삭제하시겠습니까?')) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: '대화 내역이 삭제되었습니다. 새로운 질문을 해주세요! 😊',
        timestamp: new Date()
      }]);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size={buttonSize} onClick={onBack} className="gap-2">
            <ArrowLeft className="h-5 w-5" />
            뒤로가기
          </Button>
          <div>
            <h2 className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-blue-600" />
              AI 채팅
            </h2>
            <p className="text-slate-600 text-sm">
              궁금한 것을 물어보세요
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={clearChat}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Model Selection & Usage */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm mb-2 block">AI 모델 선택</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map(model => (
                    <SelectItem 
                      key={model.id} 
                      value={model.id}
                      disabled={!canUseModel(model.tier)}
                    >
                      <div className="flex items-center gap-2">
                        <span>{model.icon}</span>
                        <span>{model.name}</span>
                        {!canUseModel(model.tier) && (
                          <Crown className="h-3 w-3 text-yellow-600 ml-2" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 mt-1">
                {models.find(m => m.id === selectedModel)?.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">오늘 사용</p>
                <p className="text-2xl">
                  {dailyUsage}
                  {currentLimit.daily !== Infinity && (
                    <span className="text-sm text-slate-500">/{currentLimit.daily}</span>
                  )}
                </p>
              </div>
              {currentLimit.remaining !== Infinity && (
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">남은 횟수</p>
                  <p className="text-2xl text-green-600">{currentLimit.remaining}</p>
                </div>
              )}
            </div>
          </div>

          {subscriptionTier === 'free' && currentLimit.remaining <= 3 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                무료 플랜의 일일 사용량이 거의 다 찼습니다. 프로 요금제로 업그레이드하고 하루 100회까지 이용하세요!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className={message.role === 'user' ? 'bg-blue-600' : 'bg-slate-200'}>
                  <AvatarFallback>
                    {message.role === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-slate-600" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                  <div
                    className={`inline-block max-w-[80%] p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {message.model && (
                      <Badge variant="outline" className="mb-2 text-xs">
                        {message.model}
                      </Badge>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('ko-KR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="bg-slate-200">
                  <AvatarFallback>
                    <Bot className="h-5 w-5 text-slate-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-slate-100 p-4 rounded-lg">
                  <Loader2 className="h-5 w-5 animate-spin text-slate-600" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                ageGroup === '60s' || ageGroup === '70s'
                  ? '궁금한 것을 물어보세요...'
                  : 'AI에게 질문하세요...'
              }
              className="resize-none"
              rows={2}
              disabled={currentLimit.remaining <= 0}
            />
            <Button
              size={buttonSize}
              onClick={handleSend}
              disabled={!input.trim() || isLoading || currentLimit.remaining <= 0}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  {buttonSize === 'lg' && '전송'}
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Questions (for elderly users) */}
      {(ageGroup === '60s' || ageGroup === '70s') && messages.length === 1 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-sm">자주 묻는 질문</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-auto py-3 text-left whitespace-normal"
                onClick={() => setInput('스마트폰 사진 찍는 법 알려주세요')}
              >
                📱 스마트폰 사진 찍기
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-auto py-3 text-left whitespace-normal"
                onClick={() => setInput('보이스피싱 예방 방법 알려주세요')}
              >
                🛡️ 보이스피싱 예방
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-auto py-3 text-left whitespace-normal"
                onClick={() => setInput('카카오톡 사용법 알려주세요')}
              >
                💬 카카오톡 사용법
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-auto py-3 text-left whitespace-normal"
                onClick={() => setInput('건강 정보 찾는 방법 알려주세요')}
              >
                🏥 건강 정보 찾기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
