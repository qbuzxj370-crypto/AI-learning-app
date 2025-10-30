import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Sparkles, 
  Target, 
  Users, 
  Bell, 
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

interface OnboardingData {
  goals: string[];
  ageGroup: '40s' | '50s' | '60s' | '70s';
  notificationTime: string;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<'40s' | '50s' | '60s' | '70s' | null>(null);
  const [easyMode, setEasyMode] = useState(false);
  const [notificationTime, setNotificationTime] = useState('morning');

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const goals = [
    { id: 'work', label: 'AI로 업무 효율 높이기', icon: '💼', target: ['40s', '50s'] },
    { id: 'life', label: '일상에서 AI 활용하기', icon: '🏠', target: ['40s', '50s', '60s', '70s'] },
    { id: 'security', label: '사기 예방하기', icon: '🛡️', target: ['50s', '60s', '70s'] },
    { id: 'job', label: '재취업·창업 준비', icon: '🎯', target: ['50s', '60s'] },
    { id: 'finance', label: '재무 관리하기', icon: '💰', target: ['40s', '50s'] },
    { id: 'health', label: '건강 관리하기', icon: '❤️', target: ['60s', '70s'] }
  ];

  const ageOptions = [
    { 
      value: '40s', 
      label: '40대', 
      description: '실무·재무 관리 중심',
      color: 'bg-blue-500'
    },
    { 
      value: '50s', 
      label: '50대', 
      description: '재취업·창업 가이드',
      color: 'bg-green-500'
    },
    { 
      value: '60s', 
      label: '60대', 
      description: '쉬운 사용·지역 활동',
      color: 'bg-purple-500'
    },
    { 
      value: '70s', 
      label: '70대', 
      description: '초간단 모드·돌봄',
      color: 'bg-orange-500'
    }
  ];

  const notificationOptions = [
    { value: 'morning', label: '아침 (9-10시)', description: '하루를 시작하며' },
    { value: 'afternoon', label: '점심 (12-1시)', description: '쉬는 시간에' },
    { value: 'evening', label: '저녁 (6-7시)', description: '퇴근 후 편하게' },
    { value: 'none', label: '알림 받지 않기', description: '직접 확인할게요' }
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({
        goals: selectedGoals,
        ageGroup: selectedAge || '60s',
        notificationTime
      });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedGoals.length > 0;
    if (step === 2) return selectedAge !== null;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <h2>AI 배움터 시작하기</h2>
            </div>
            <Badge variant="outline">{step} / {totalSteps}</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Goals */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="mb-2">무엇을 배우고 싶으신가요?</h3>
                <p className="text-slate-600">관심있는 것을 모두 선택해주세요</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {goals.map((goal) => (
                  <Card
                    key={goal.id}
                    className={`cursor-pointer transition-all ${
                      selectedGoals.includes(goal.id)
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'hover:border-blue-200'
                    }`}
                    onClick={() => toggleGoal(goal.id)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{goal.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-sm">{goal.label}</h4>
                        </div>
                        {selectedGoals.includes(goal.id) && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Age & Easy Mode */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Users className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <h3 className="mb-2">연령대를 선택해주세요</h3>
                <p className="text-slate-600">맞춤 콘텐츠를 제공해드려요</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {ageOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all ${
                      selectedAge === option.value
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'hover:border-purple-200'
                    }`}
                    onClick={() => setSelectedAge(option.value as any)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center text-white`}>
                          <span className="text-xl">{option.label[0]}</span>
                        </div>
                        <div className="flex-1">
                          <h4>{option.label}</h4>
                          <p className="text-sm text-slate-600">{option.description}</p>
                        </div>
                        {selectedAge === option.value && (
                          <CheckCircle className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Easy Mode Toggle */}
              {(selectedAge === '60s' || selectedAge === '70s') && (
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="mb-2">쉬운 모드 사용하기</h4>
                        <p className="text-sm text-slate-600">
                          큰 글씨, 간편한 화면으로 더 편하게 사용하세요
                        </p>
                      </div>
                      <Button
                        variant={easyMode ? 'default' : 'outline'}
                        onClick={() => setEasyMode(!easyMode)}
                      >
                        {easyMode ? '사용 중' : '사용하기'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 3: Notifications */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Bell className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="mb-2">알림 받을 시간을 선택하세요</h3>
                <p className="text-slate-600">새로운 학습 카드를 보내드려요 (주 3회)</p>
              </div>

              <div className="space-y-3">
                {notificationOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all ${
                      notificationTime === option.value
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'hover:border-green-200'
                    }`}
                    onClick={() => setNotificationTime(option.value)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4>{option.label}</h4>
                          <p className="text-sm text-slate-600">{option.description}</p>
                        </div>
                        {notificationTime === option.value && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                이전
              </Button>
            )}
            <Button
              className="flex-1 gap-2"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {step === totalSteps ? '시작하기' : '다음'}
              {step < totalSteps && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>

          {/* Skip Option */}
          {step === 1 && (
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => onComplete({
                  goals: [],
                  ageGroup: '60s',
                  notificationTime: 'morning'
                })}
              >
                건너뛰기
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
