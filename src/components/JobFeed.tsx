import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Phone, 
  Search,
  Filter,
  Briefcase,
  Heart
} from 'lucide-react';
import { EmptyState } from './StateComponents';

interface JobFeedProps {
  ageGroup: '40s' | '50s' | '60s' | '70s';
  buttonSize: 'default' | 'lg';
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  distance: string;
  hourlyPay: string;
  schedule: string;
  seniorFriendly: boolean;
  tags: string[];
  description: string;
}

export function JobFeed({ ageGroup, buttonSize }: JobFeedProps) {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSetPreferences, setHasSetPreferences] = useState(true);

  const jobs: Job[] = [
    {
      id: '1',
      title: '카페 바리스타 (교육 제공)',
      company: '따뜻한 카페',
      location: '강남구 역삼동',
      distance: '1.2km',
      hourlyPay: '시급 12,000원',
      schedule: '주 3일 · 오전 9시-2시',
      seniorFriendly: true,
      tags: ['시니어환영', '유연근무', '교육지원'],
      description: '경력 무관, 친절한 교육 제공'
    },
    {
      id: '2',
      title: '아파트 경비 (주간)',
      company: '○○아파트',
      location: '서초구 서초동',
      distance: '2.5km',
      hourlyPay: '월급 220만원',
      schedule: '주 5일 · 오전 9시-6시',
      seniorFriendly: true,
      tags: ['시니어우대', '정규직', '4대보험'],
      description: '50-65세 우대, 복지 우수'
    },
    {
      id: '3',
      title: '택배 상·하차 보조',
      company: '○○물류',
      location: '송파구 문정동',
      distance: '3.8km',
      hourlyPay: '시급 15,000원',
      schedule: '주 5일 · 오전 6시-10시',
      seniorFriendly: true,
      tags: ['시니어환영', '단시간', '일당지급'],
      description: '체력 필요, 즉시 근무 가능'
    },
    {
      id: '4',
      title: '학교 급식 보조',
      company: '○○초등학교',
      location: '강남구 대치동',
      distance: '1.8km',
      hourlyPay: '시급 11,000원',
      schedule: '주 5일 · 오전 9시-2시',
      seniorFriendly: true,
      tags: ['시니어환영', '방학있음', '4대보험'],
      description: '조리 경력 우대, 방학 휴무'
    }
  ];

  const toggleSave = (jobId: string) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  if (!hasSetPreferences) {
    return (
      <EmptyState
        icon={<Briefcase className="h-12 w-12" />}
        title="관심 직무를 먼저 설정해주세요"
        description="어떤 일을 찾으시나요? 3가지만 선택해주세요"
        action={{
          label: '관심 직무 설정하기',
          onClick: () => setHasSetPreferences(true)
        }}
        size={buttonSize === 'lg' ? 'lg' : 'default'}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2>시니어 친화 일자리</h2>
        <p className="text-slate-600 text-sm">경험을 살릴 수 있는 일자리를 찾아보세요</p>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="직무나 지역으로 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size={buttonSize} className="gap-2">
          <Filter className="h-4 w-4" />
          필터
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
          전체
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
          가까운 곳
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
          단시간
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
          유연근무
        </Badge>
      </div>

      {/* Job Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  {job.seniorFriendly && (
                    <Badge className="mb-2 bg-green-600">시니어 친화</Badge>
                  )}
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSave(job.id)}
                >
                  <Heart 
                    className={`h-5 w-5 ${savedJobs.has(job.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location} · {job.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.hourlyPay}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-4 w-4" />
                  <span>{job.schedule}</span>
                </div>
              </div>

              <p className="text-sm">{job.description}</p>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button size={buttonSize} className="flex-1">
                지원하기
              </Button>
              <Button size={buttonSize} variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                상담
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Saved Jobs Summary */}
      {savedJobs.size > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              <span>관심 일자리 {savedJobs.size}개</span>
            </div>
            <Button variant="outline" size="sm">
              전체 보기
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
