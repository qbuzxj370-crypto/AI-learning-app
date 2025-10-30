import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  PieChart, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Plus,
  CreditCard
} from 'lucide-react';
import { EmptyState } from './StateComponents';

interface FinanceDashboardProps {
  ageGroup: '40s' | '50s' | '60s' | '70s';
  buttonSize: 'default' | 'lg';
}

export function FinanceDashboard({ ageGroup, buttonSize }: FinanceDashboardProps) {
  const [currentMonth, setCurrentMonth] = useState(10);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const monthlyData = {
    totalExpense: 2450000,
    totalIncome: 3200000,
    savings: 750000,
    categories: [
      { name: '식비', amount: 680000, percent: 28 },
      { name: '교통', amount: 320000, percent: 13 },
      { name: '의료', amount: 450000, percent: 18 },
      { name: '교육', amount: 600000, percent: 24 },
      { name: '기타', amount: 400000, percent: 17 }
    ]
  };

  const handleQuickAdd = () => {
    if (amount && category) {
      // In real app, this would save to backend
      setAmount('');
      setCategory('');
      setShowQuickAdd(false);
    }
  };

  if (!hasData) {
    return (
      <EmptyState
        icon={<DollarSign className="h-12 w-12" />}
        title="첫 지출을 기록해보세요"
        description="간단한 입력으로 가계부를 시작할 수 있어요"
        action={{
          label: '지출 기록하기',
          onClick: () => {
            setHasData(true);
            setShowQuickAdd(true);
          }
        }}
        size={buttonSize === 'lg' ? 'lg' : 'default'}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>재무 관리</h2>
          <p className="text-slate-600 text-sm">한눈에 보는 가계 현황</p>
        </div>
        <Button size={buttonSize} variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          리포트 공유
        </Button>
      </div>

      {/* Month Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentMonth(prev => prev - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h3>2025년 {currentMonth}월</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentMonth(prev => prev + 1)}
              disabled={currentMonth >= 10}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>총 수입</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl">
                  {monthlyData.totalIncome.toLocaleString()}원
                </h3>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>총 지출</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl">
                  {monthlyData.totalExpense.toLocaleString()}원
                </h3>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardDescription>이번 달 저축</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl text-blue-600">
                  {monthlyData.savings.toLocaleString()}원
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  목표 대비 +15%
                </p>
              </div>
              <PieChart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Add */}
      {showQuickAdd ? (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5" />
              간이 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>금액</Label>
                <Input
                  type="number"
                  placeholder="예: 50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>카테고리</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">식비</SelectItem>
                    <SelectItem value="transport">교통</SelectItem>
                    <SelectItem value="medical">의료</SelectItem>
                    <SelectItem value="education">교육</SelectItem>
                    <SelectItem value="etc">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size={buttonSize} className="flex-1" onClick={handleQuickAdd}>
                저장
              </Button>
              <Button
                size={buttonSize}
                variant="outline"
                onClick={() => setShowQuickAdd(false)}
              >
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          size={buttonSize}
          variant="outline"
          className="w-full gap-2"
          onClick={() => setShowQuickAdd(true)}
        >
          <Plus className="h-4 w-4" />
          간이 입력으로 빠르게 기록
        </Button>
      )}

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            카테고리별 지출
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {monthlyData.categories.map((cat, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{cat.name}</span>
                  <Badge variant="outline">{cat.percent}%</Badge>
                </div>
                <span>{cat.amount.toLocaleString()}원</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tips for Age Group */}
      {ageGroup === '40s' && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <h4 className="mb-2">💡 40대 재무 팁</h4>
            <p className="text-sm text-slate-600">
              교육비와 주거비 관리가 중요해요. AI를 활용해 최적의 저축 플랜을 세워보세요.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
