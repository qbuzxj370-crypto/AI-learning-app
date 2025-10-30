import { useState } from 'react';
import { Home, Users, BookOpen, Settings, Phone, Bell, Mic, Camera, Briefcase, DollarSign, HelpCircle, Shield, Sparkles, LogOut, MessageSquare, UserCircle, CreditCard } from 'lucide-react';
import { Auth } from './components/Auth';
import { CardFeed } from './components/CardFeed';
import { Community } from './components/Community';
import { OfflineContent } from './components/OfflineContent';
import { UserSettings } from './components/UserSettings';
import { JobFeed } from './components/JobFeed';
import { FinanceDashboard } from './components/FinanceDashboard';
import { HelpHub } from './components/HelpHub';
import { ScamPrevention } from './components/ScamPrevention';
import { AIInsights } from './components/AIInsights';
import { MyPage } from './components/MyPage';
import { LLMChat } from './components/LLMChat';
import { Subscription } from './components/Subscription';
import { Onboarding } from './components/Onboarding';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card, CardContent } from './components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from './components/ui/avatar';

interface User {
  email: string;
  name: string;
  phone?: string;
  ageGroup?: '40s' | '50s' | '60s' | '70s';
  provider?: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [ageGroup, setAgeGroup] = useState<'40s' | '50s' | '60s' | '70s'>('60s');
  const [easyMode, setEasyMode] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [activeTab, setActiveTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'pro' | 'premium'>('free');

  // Age-specific styling
  const getAgeClass = () => {
    return `age-${ageGroup}`;
  };

  const getTextSize = () => {
    if (easyMode) return 'text-xl';
    switch (ageGroup) {
      case '40s': return 'text-base';
      case '50s': return 'text-lg';
      case '60s': return 'text-xl';
      case '70s': return 'text-2xl';
      default: return 'text-base';
    }
  };

  const getButtonSize = () => {
    if (easyMode || ageGroup === '60s' || ageGroup === '70s') return 'lg';
    return 'default';
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    if (userData.ageGroup) {
      setAgeGroup(userData.ageGroup);
    }
    // Show onboarding for new users
    if (!userData.provider) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = (data: any) => {
    setAgeGroup(data.ageGroup);
    setShowOnboarding(false);
  };

  const handleLogout = () => {
    // Reset all states to initial values
    setUser(null);
    setAgeGroup('60s');
    setEasyMode(false);
    setUnreadNotifications(3);
    setActiveTab('home');
    setShowOnboarding(false);
  };

  // Show auth screen if not logged in
  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  // Show onboarding on first visit
  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // 70s Simple Home
  if (ageGroup === '70s' && easyMode) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-white mb-8 text-center">
            <h1 className="text-3xl mb-2">AI 배움터</h1>
            <p className="text-xl text-slate-300">필요한 것을 선택하세요</p>
          </div>

          <div className="space-y-6">
            {/* Emergency Help */}
            <Card className="bg-white border-4 border-red-500">
              <CardContent className="p-8 text-center">
                <Phone className="h-20 w-20 text-red-600 mx-auto mb-4" />
                <h2 className="text-3xl mb-2">도움 요청</h2>
                <p className="text-xl text-slate-600 mb-6">
                  상담원이 바로 전화드립니다
                </p>
                <Button size="lg" variant="destructive" className="w-full h-16 text-xl">
                  지금 전화하기
                </Button>
              </CardContent>
            </Card>

            {/* Hospital */}
            <Card className="bg-white border-4 border-blue-500">
              <CardContent className="p-8 text-center">
                <HelpCircle className="h-20 w-20 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl mb-2">병원 · 복약</h2>
                <p className="text-xl text-slate-600 mb-6">
                  예약과 알림을 도와드려요
                </p>
                <Button size="lg" className="w-full h-16 text-xl">
                  병원 관리
                </Button>
              </CardContent>
            </Card>

            {/* Family */}
            <Card className="bg-white border-4 border-green-500">
              <CardContent className="p-8 text-center">
                <Users className="h-20 w-20 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl mb-2">가족 연결</h2>
                <p className="text-xl text-slate-600 mb-6">
                  가족과 함께 사용하세요
                </p>
                <Button size="lg" variant="outline" className="w-full h-16 text-xl">
                  가족 보기
                </Button>
              </CardContent>
            </Card>

            {/* Settings Toggle */}
            <Button 
              variant="ghost" 
              className="w-full text-white text-lg"
              onClick={() => setEasyMode(false)}
            >
              더 많은 기능 보기
            </Button>
          </div>
        </div>

        {/* Fixed Emergency Button */}
        <div className="fixed bottom-8 right-8">
          <Button size="lg" className="h-20 w-20 rounded-full shadow-2xl" variant="destructive">
            <Phone className="h-10 w-10" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 ${getAgeClass()}`}>
      {/* My Page View */}
      {activeTab === 'mypage' && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <MyPage
            user={user}
            onBack={() => setActiveTab('home')}
            onLogout={handleLogout}
            onUpgrade={() => setActiveTab('subscription')}
            buttonSize={getButtonSize()}
            subscriptionTier={subscriptionTier}
          />
        </main>
      )}

      {/* LLM Chat View */}
      {activeTab === 'chat' && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <LLMChat
            onBack={() => setActiveTab('home')}
            buttonSize={getButtonSize()}
            subscriptionTier={subscriptionTier}
            ageGroup={ageGroup}
          />
        </main>
      )}

      {/* Subscription View */}
      {activeTab === 'subscription' && (
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Subscription
            onBack={() => setActiveTab('mypage')}
            currentTier={subscriptionTier}
            onSelectPlan={(tier) => {
              setSubscriptionTier(tier);
              setActiveTab('mypage');
            }}
            buttonSize={getButtonSize()}
          />
        </main>
      )}

      {/* Main App View */}
      {!['mypage', 'chat', 'subscription'].includes(activeTab) && (
        <>
          {/* Header */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
              <div className="flex-shrink-0">
                <h1 className="text-blue-600">AI 배움터</h1>
                <p className="text-slate-600 text-sm">오늘도 한 가지 배워볼까요?</p>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Emergency Help (70s priority) */}
                {ageGroup === '70s' && (
                  <Button size={getButtonSize()} variant="destructive" className="gap-2 hidden md:flex">
                    <Phone className="h-5 w-5" />
                    <span className="hidden lg:inline">도움 요청</span>
                  </Button>
                )}
                
                {/* Phone Support (60s, 70s) */}
                {(ageGroup === '60s' || ageGroup === '70s') && (
                  <Button 
                    size={getButtonSize()} 
                    variant="outline" 
                    className="gap-2 hidden sm:flex"
                    onClick={() => setActiveTab('help')}
                  >
                    <Phone className="h-5 w-5" />
                    <span className="hidden lg:inline">전화 상담</span>
                  </Button>
                )}

                {/* AI Chat Button */}
                <Button 
                  size={getButtonSize()} 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setActiveTab('chat')}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="hidden lg:inline">AI 챗</span>
                </Button>
                
                {/* Notifications */}
                <Button size={getButtonSize()} variant="ghost" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarFallback className="bg-blue-600 text-white">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div>
                        <p>{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setActiveTab('mypage')}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      마이페이지
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('subscription')}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      구독 관리
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      설정
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 py-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto mb-6 -mx-4 px-4">
                <TabsList className={`inline-grid mb-6 min-w-full ${
                  ageGroup === '40s' ? 'grid-cols-7' : 
                  ageGroup === '50s' ? 'grid-cols-6' : 'grid-cols-5'
                } ${easyMode ? 'h-16' : 'h-14'} md:grid`}>
                  <TabsTrigger value="home" className="gap-1 md:gap-2">
                    <Home className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-xs md:text-sm">홈</span>
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="gap-1 md:gap-2">
                    <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-xs md:text-sm whitespace-nowrap">AI인사이트</span>
                  </TabsTrigger>
                  <TabsTrigger value="scam" className="gap-1 md:gap-2">
                    <Shield className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-xs md:text-sm whitespace-nowrap">사기예방</span>
                  </TabsTrigger>
                  {(ageGroup === '40s' || ageGroup === '50s') && (
                    <TabsTrigger value="jobs" className="gap-1 md:gap-2">
                      <Briefcase className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="text-xs md:text-sm">일자리</span>
                    </TabsTrigger>
                  )}
                  {ageGroup === '40s' && (
                    <TabsTrigger value="finance" className="gap-1 md:gap-2">
                      <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="text-xs md:text-sm">재무</span>
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="help" className="gap-1 md:gap-2">
                    <HelpCircle className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-xs md:text-sm">도움</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="gap-1 md:gap-2">
                    <Settings className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-xs md:text-sm">설정</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="home">
                <CardFeed ageGroup={ageGroup} easyMode={easyMode} buttonSize={getButtonSize()} />
              </TabsContent>

              <TabsContent value="insights">
                <AIInsights buttonSize={getButtonSize()} />
              </TabsContent>

              <TabsContent value="scam">
                <ScamPrevention buttonSize={getButtonSize()} />
              </TabsContent>

              {(ageGroup === '40s' || ageGroup === '50s') && (
                <TabsContent value="jobs">
                  <JobFeed ageGroup={ageGroup} buttonSize={getButtonSize()} />
                </TabsContent>
              )}

              {ageGroup === '40s' && (
                <TabsContent value="finance">
                  <FinanceDashboard ageGroup={ageGroup} buttonSize={getButtonSize()} />
                </TabsContent>
              )}

              <TabsContent value="help">
                <HelpHub ageGroup={ageGroup} buttonSize={getButtonSize()} />
              </TabsContent>

              <TabsContent value="settings">
                <UserSettings 
                  ageGroup={ageGroup} 
                  setAgeGroup={setAgeGroup}
                  easyMode={easyMode}
                  setEasyMode={setEasyMode}
                  buttonSize={getButtonSize()}
                />
              </TabsContent>
            </Tabs>
          </main>

          {/* FAB Buttons (Mic & Camera) - Not for 70s easy mode */}
          {!(ageGroup === '70s' && easyMode) && (
            <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
              <Button 
                size="lg" 
                className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
                title="음성으로 배우기"
              >
                <Mic className="h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                className="h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700"
                title="사진으로 배우기"
                onClick={() => setActiveTab('chat')}
              >
                <Camera className="h-6 w-6" />
              </Button>
            </div>
          )}

          {/* Emergency Quick Access (70s standard mode) */}
          {ageGroup === '70s' && !easyMode && (
            <div className="fixed bottom-6 left-6 z-40">
              <Button size="lg" className="h-16 w-16 rounded-full shadow-2xl" variant="destructive">
                <Phone className="h-8 w-8" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}