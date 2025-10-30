import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Download, 
  Play, 
  CheckCircle, 
  Lock, 
  BookOpen,
  Clock,
  Award,
  BarChart
} from 'lucide-react';

interface OfflineContentProps {
  ageGroup: '40s' | '50s' | '60s' | '70s';
  easyMode: boolean;
  buttonSize: 'default' | 'lg';
}

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  progress: number;
  downloaded: boolean;
  locked: boolean;
  relevantFor: string[];
}

export function OfflineContent({ ageGroup, easyMode, buttonSize }: OfflineContentProps) {
  const courses: Course[] = [
    {
      id: '1',
      title: 'AI 기초부터 활용까지',
      description: '챗GPT, 이미지 생성 AI 등 실생활에 바로 쓸 수 있는 AI 도구 10가지',
      lessons: 10,
      duration: '2시간',
      difficulty: 'easy',
      category: 'AI 실무',
      progress: 70,
      downloaded: true,
      locked: false,
      relevantFor: ['40s', '50s', '60s', '70s']
    },
    {
      id: '2',
      title: '보이스피싱·스미싱 완벽 대응',
      description: '최신 사기 수법과 예방법, 피해 발생 시 대처 방법까지',
      lessons: 8,
      duration: '1시간 30분',
      difficulty: 'easy',
      category: '보안',
      progress: 100,
      downloaded: true,
      locked: false,
      relevantFor: ['50s', '60s', '70s']
    },
    {
      id: '3',
      title: '스마트폰 200% 활용하기',
      description: '카카오톡, 사진, 앱 설치부터 유용한 기능까지',
      lessons: 12,
      duration: '2시간 30분',
      difficulty: 'easy',
      category: '생활 팁',
      progress: 30,
      downloaded: false,
      locked: false,
      relevantFor: ['60s', '70s']
    },
    {
      id: '4',
      title: '재무 관리 AI 도구',
      description: '가계부, 재무 계획, 투자 분석에 AI 활용하기',
      lessons: 15,
      duration: '3시간',
      difficulty: 'medium',
      category: 'AI 실무',
      progress: 0,
      downloaded: false,
      locked: false,
      relevantFor: ['40s', '50s']
    },
    {
      id: '5',
      title: '시니어 창업 가이드',
      description: '온라인 판매부터 SNS 마케팅까지 단계별 안내',
      lessons: 20,
      duration: '4시간',
      difficulty: 'medium',
      category: '창업',
      progress: 0,
      downloaded: false,
      locked: true,
      relevantFor: ['50s', '60s']
    },
    {
      id: '6',
      title: '건강 관리 스마트 도구',
      description: '복약 알림, 건강 기록, 병원 예약 앱 사용법',
      lessons: 10,
      duration: '2시간',
      difficulty: 'easy',
      category: '건강',
      progress: 50,
      downloaded: true,
      locked: false,
      relevantFor: ['60s', '70s']
    }
  ];

  const relevantCourses = courses.filter(course => course.relevantFor.includes(ageGroup));

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '쉬움';
      case 'medium': return '보통';
      case 'hard': return '어려움';
      default: return '쉬움';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'secondary';
      case 'medium': return 'default';
      case 'hard': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>오프라인 학습</h2>
        <p className="text-slate-600 text-sm">인터넷 없이도 언제든지 배울 수 있어요</p>
      </div>

      {/* Progress Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">전체 진행률</p>
              <h3>
                {Math.round(
                  relevantCourses.reduce((sum, course) => sum + course.progress, 0) / 
                  relevantCourses.length
                )}%
              </h3>
            </div>
            <div className="flex items-center gap-6 text-center">
              <div>
                <div className="flex items-center gap-1 text-slate-600">
                  <BookOpen className="h-4 w-4" />
                  <p className="text-sm">수강 중</p>
                </div>
                <p className="text-2xl">
                  {relevantCourses.filter(c => c.progress > 0 && c.progress < 100).length}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-slate-600">
                  <Award className="h-4 w-4" />
                  <p className="text-sm">완료</p>
                </div>
                <p className="text-2xl">
                  {relevantCourses.filter(c => c.progress === 100).length}
                </p>
              </div>
            </div>
          </div>
          <Progress 
            value={
              relevantCourses.reduce((sum, course) => sum + course.progress, 0) / 
              relevantCourses.length
            } 
            className="h-3" 
          />
        </CardContent>
      </Card>

      {/* Course List */}
      <div className="grid gap-4 md:grid-cols-2">
        {relevantCourses.map((course) => (
          <Card key={course.id} className={course.locked ? 'opacity-60' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="outline">{course.category}</Badge>
                <div className="flex gap-2">
                  <Badge variant={getDifficultyColor(course.difficulty)}>
                    {getDifficultyText(course.difficulty)}
                  </Badge>
                  {course.downloaded && (
                    <Badge variant="secondary" className="gap-1">
                      <Download className="h-3 w-3" />
                      저장됨
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons}개 강의</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Progress */}
              {course.progress > 0 && !course.locked && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">진행률</span>
                    <span className="text-sm">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              {course.progress === 100 && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5" />
                  <span>완료</span>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex gap-2">
              {course.locked ? (
                <Button size={buttonSize} className="flex-1" disabled>
                  <Lock className="h-4 w-4 mr-2" />
                  프리미엄
                </Button>
              ) : (
                <>
                  <Button size={buttonSize} className="flex-1 gap-2">
                    <Play className="h-4 w-4" />
                    {course.progress > 0 ? '이어보기' : '시작하기'}
                  </Button>
                  {!course.downloaded && (
                    <Button size={buttonSize} variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            학습 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">총 학습 시간</p>
              <p className="text-2xl">12시간</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">완료한 강의</p>
              <p className="text-2xl">23개</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">연속 학습</p>
              <p className="text-2xl">7일</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-1">획득 배지</p>
              <p className="text-2xl">5개</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
