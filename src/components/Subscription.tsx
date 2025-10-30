import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import {
  Check,
  Crown,
  Sparkles,
  Zap,
  ArrowLeft,
  Star
} from 'lucide-react';

interface SubscriptionProps {
  onBack: () => void;
  currentTier: 'free' | 'pro' | 'premium';
  onSelectPlan: (tier: 'free' | 'pro' | 'premium') => void;
  buttonSize: 'default' | 'lg';
}

export function Subscription({ onBack, currentTier, onSelectPlan, buttonSize }: SubscriptionProps) {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: 'free',
      name: '무료',
      icon: Star,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      price: { monthly: 0, yearly: 0 },
      features: [
        'AI 모델 하루 10회 사용',
        'AI 인사이트 하루 5개',
        '기본 학습 카드',
        '커뮤니티 이용',
        '사기 예방 알림',
      ],
      limits: {
        llm: '10회/일',
        insights: '5개/일',
        support: '커뮤니티',
        offline: '기본'
      }
    },
    {
      id: 'pro',
      name: '프로',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      price: { monthly: 9900, yearly: 99000 },
      popular: true,
      features: [
        'AI 모델 하루 100회 사용',
        'AI 인사이트 하루 50개',
        '모든 학습 카드',
        '전화 상담 월 3회',
        '오프라인 강좌 할인 20%',
        '광고 없음',
        '우선 고객 지원'
      ],
      limits: {
        llm: '100회/일',
        insights: '50개/일',
        support: '전화 상담 3회/월',
        offline: '20% 할인'
      }
    },
    {
      id: 'premium',
      name: '프리미엄',
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      borderColor: 'border-purple-300',
      price: { monthly: 29900, yearly: 299000 },
      features: [
        '모든 AI 모델 무제한 사용',
        'AI 인사이트 무제한',
        '모든 학습 카드 + 프리미엄 콘텐츠',
        '전화 상담 무제한',
        '1:1 맞춤 학습 코칭',
        '오프라인 강좌 우선 예약 + 무료',
        '가족 계정 3개 추가',
        '광고 없음',
        'VIP 고객 지원'
      ],
      limits: {
        llm: '무제한',
        insights: '무제한',
        support: '무제한 전화 + 1:1 코칭',
        offline: '무료 + 우선 예약'
      }
    }
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return '무료';
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  };

  const getYearlyDiscount = (plan: typeof plans[0]) => {
    if (plan.price.monthly === 0) return 0;
    const yearlyEquivalent = plan.price.monthly * 12;
    const savings = yearlyEquivalent - plan.price.yearly;
    const discountPercent = Math.round((savings / yearlyEquivalent) * 100);
    return discountPercent;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size={buttonSize} onClick={onBack} className="gap-2">
          <ArrowLeft className="h-5 w-5" />
          뒤로가기
        </Button>
        <div className="flex-1">
          <h2>구독 요금제</h2>
          <p className="text-slate-600 text-sm">나에게 맞는 요금제를 선택하세요</p>
        </div>
      </div>

      {/* Billing Toggle */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4">
            <span className={!isYearly ? 'font-medium' : 'text-slate-600'}>월간 결제</span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={isYearly ? 'font-medium' : 'text-slate-600'}>
              연간 결제
              <Badge variant="secondary" className="ml-2">최대 17% 할인</Badge>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrent = currentTier === plan.id;
          const price = isYearly ? plan.price.yearly : plan.price.monthly;
          const yearlyDiscount = getYearlyDiscount(plan);

          return (
            <Card
              key={plan.id}
              className={`relative ${plan.bgColor} ${plan.borderColor} border-2 ${
                plan.popular ? 'shadow-lg ring-2 ring-blue-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white">
                    <Sparkles className="h-3 w-3 mr-1" />
                    인기
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-8 w-8 ${plan.color}`} />
                  {isCurrent && (
                    <Badge variant="outline">현재 플랜</Badge>
                  )}
                </div>
                <CardTitle className={plan.color}>{plan.name}</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl">{formatPrice(price)}</span>
                    {price > 0 && (
                      <span className="text-slate-600 text-sm">
                        /{isYearly ? '년' : '월'}
                      </span>
                    )}
                  </div>
                  {isYearly && yearlyDiscount > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      월간 대비 {yearlyDiscount}% 할인
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Separator />

                <div>
                  <h4 className="mb-3 text-sm">포함 기능</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">AI 사용량</span>
                    <span>{plan.limits.llm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">인사이트</span>
                    <span>{plan.limits.insights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">지원</span>
                    <span className="text-right">{plan.limits.support}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">오프라인</span>
                    <span>{plan.limits.offline}</span>
                  </div>
                </div>

                <Button
                  size={buttonSize}
                  variant={isCurrent ? 'outline' : 'default'}
                  className="w-full"
                  disabled={isCurrent}
                  onClick={() => onSelectPlan(plan.id as 'free' | 'pro' | 'premium')}
                >
                  {isCurrent ? '현재 플랜' : plan.id === 'free' ? '무료로 시작' : '구독하기'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>자주 묻는 질문</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-2">언제든 플랜을 변경할 수 있나요?</h4>
            <p className="text-sm text-slate-600">
              네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 
              변경된 플랜은 즉시 적용되며, 비용은 일할 계산됩니다.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="mb-2">환불 정책은 어떻게 되나요?</h4>
            <p className="text-sm text-slate-600">
              구독 후 7일 이내에는 100% 환불이 가능합니다. 
              서비스가 마음에 들지 않으시면 언제든 환불받으실 수 있습니다.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="mb-2">가족과 함께 사용할 수 있나요?</h4>
            <p className="text-sm text-slate-600">
              프리미엄 플랜에서는 최대 3개의 가족 계정을 추가로 만들 수 있습니다. 
              각 계정은 독립적으로 학습 기록이 관리됩니다.
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="mb-2">오프라인 강좌는 어떻게 이용하나요?</h4>
            <p className="text-sm text-slate-600">
              프로 이상 플랜에서는 전국 복지관 및 도서관에서 진행되는 오프라인 강좌에 
              할인가로 참여하실 수 있습니다. 프리미엄 회원은 무료로 이용 가능합니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6 text-center">
          <p className="text-sm text-slate-600 mb-4">
            더 궁금하신 점이 있으신가요?
          </p>
          <Button variant="outline" size={buttonSize}>
            고객센터 문의하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
