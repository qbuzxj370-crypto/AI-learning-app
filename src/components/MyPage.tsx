import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  TrendingUp,
  BookOpen,
  Crown,
  Settings,
  LogOut,
  ArrowLeft
} from 'lucide-react';

interface MyPageProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    ageGroup?: string;
    provider?: string;
  };
  onBack: () => void;
  onLogout: () => void;
  onUpgrade: () => void;
  buttonSize: 'default' | 'lg';
  subscriptionTier: 'free' | 'pro' | 'premium';
}

export function MyPage({ user, onBack, onLogout, onUpgrade, buttonSize, subscriptionTier }: MyPageProps) {
  const stats = {
    cardsCompleted: 45,
    totalCards: 100,
    learningStreak: 7,
    totalMinutes: 320,
    achievements: 12
  };

  const getTierInfo = () => {
    switch (subscriptionTier) {
      case 'premium':
        return {
          name: '프리미엄',
          color: 'bg-gradient-to-r from-purple-600 to-pink-600',
          textColor: 'text-purple-600',
          llmLimit: '무제한',
          insightLimit: '무제한',
          features: ['모든 AI 모델 무제한 사용', '실시간 AI 인사이트', '1:1 전화 상담', '오프라인 강좌 우선 예약']
        };
      case 'pro':
        return {
          name: '프로',
          color: 'bg-gradient-to-r from-blue-600 to-cyan-600',
          textColor: 'text-blue-600',
          llmLimit: '하루 100회',
          insightLimit: '하루 50개',
          features: ['AI 모델 하루 100회', 'AI 인사이트 50개', '전화 상담 월 3회', '오프라인 강좌 할인']
        };
      default:
        return {
          name: '무료',
          color: 'bg-slate-200',
          textColor: 'text-slate-600',
          llmLimit: '하루 10회',
          insightLimit: '하루 5개',
          features: ['AI 모델 하루 10회', 'AI 인사이트 5개', '기본 학습 카드', '커뮤니티 이용']
        };
    }
  };

  const tierInfo = getTierInfo();

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size={buttonSize} onClick={onBack} className="gap-2">
          <ArrowLeft className="h-5 w-5" />
          뒤로가기
        </Button>
        <div className="flex-1">
          <h2>마이페이지</h2>
          <p className="text-slate-600 text-sm">내 학습 현황과 정보를 확인하세요</p>
        </div>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-blue-600 text-white text-2xl">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3>{user.name}</h3>
                {subscriptionTier !== 'free' && (
                  <Badge className={tierInfo.color + ' text-white'}>
                    <Crown className="h-3 w-3 mr-1" />
                    {tierInfo.name}
                  </Badge>
                )}
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.ageGroup && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <User className="h-4 w-4" />
                    <span>{user.ageGroup}대</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Subscription Info */}
      <Card className={subscriptionTier === 'free' ? 'border-2 border-dashed' : ''}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>구독 정보</CardTitle>
            {subscriptionTier === 'free' && (
              <Button size={buttonSize} onClick={onUpgrade} className="gap-2">
                <Crown className="h-4 w-4" />
                업그레이드
              </Button>
            )}
          </div>
          <CardDescription>
            현재 요금제: <span className={tierInfo.textColor}>{tierInfo.name}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-slate-600">AI 모델 사용</p>
              <p className="text-lg">{tierInfo.llmLimit}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-600">인사이트 제공</p>
              <p className="text-lg">{tierInfo.insightLimit}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">이용 가능 기능</h4>
            <ul className="space-y-2">
              {tierInfo.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {subscriptionTier === 'free' && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900 mb-3">
                프로 요금제로 업그레이드하고 더 많은 기능을 이용하세요!
              </p>
              <Button size={buttonSize} variant="outline" className="w-full" onClick={onUpgrade}>
                요금제 비교하기
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            학습 통계
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">학습 카드 진행도</span>
              <span className="text-sm">{stats.cardsCompleted}/{stats.totalCards}</span>
            </div>
            <Progress value={(stats.cardsCompleted / stats.totalCards) * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl mb-1">{stats.learningStreak}</p>
              <p className="text-xs text-slate-600">연속 학습일</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl mb-1">{stats.totalMinutes}</p>
              <p className="text-xs text-slate-600">총 학습 시간(분)</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl mb-1">{stats.achievements}</p>
              <p className="text-xs text-slate-600">획득 배지</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-600" />
            최근 획득 배지
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-xs">첫 카드 완료</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🔥</span>
              </div>
              <p className="text-xs">7일 연속</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">⭐</span>
              </div>
              <p className="text-xs">AI 마스터</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button variant="outline" size={buttonSize} className="w-full gap-2">
          <Settings className="h-5 w-5" />
          설정
        </Button>
        <Button variant="outline" size={buttonSize} className="w-full gap-2" onClick={onLogout}>
          <LogOut className="h-5 w-5" />
          로그아웃
        </Button>
      </div>
    </div>
  );
}
