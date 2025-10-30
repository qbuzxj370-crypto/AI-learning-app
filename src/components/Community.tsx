import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  MessageSquare, 
  ThumbsUp, 
  Calendar, 
  MapPin, 
  Users, 
  Search,
  Plus,
  Clock,
  CheckCircle,
  Filter
} from 'lucide-react';

interface CommunityProps {
  ageGroup: '40s' | '50s' | '60s' | '70s';
  easyMode: boolean;
  buttonSize: 'default' | 'lg';
}

interface Post {
  id: string;
  author: string;
  age: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  category: string;
  verified?: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  category: string;
  description: string;
  ageGroup?: string;
}

export function Community({ ageGroup, easyMode, buttonSize }: CommunityProps) {
  const [activeTab, setActiveTab] = useState('posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>('all');
  const [showAgeFilter, setShowAgeFilter] = useState(false);

  const posts: Post[] = [
    {
      id: '1',
      author: '김영희',
      age: '60대',
      avatar: '김',
      time: '2시간 전',
      content: '오늘 챗GPT로 손주 생일 카드 만들어봤어요! 정말 신기하네요. 손주가 너무 좋아했습니다 😊',
      likes: 24,
      comments: 8,
      category: 'AI 활용 후기',
      verified: true
    },
    {
      id: '2',
      author: '이철수',
      age: '50대',
      avatar: '이',
      time: '5시간 전',
      content: '엑셀 자동화 강좌 듣고 회사에서 바로 써먹었습니다. 업무 시간이 절반으로 줄었어요!',
      likes: 45,
      comments: 12,
      category: '실무 활용',
      verified: true
    },
    {
      id: '3',
      author: '박순자',
      age: '70대',
      avatar: '박',
      time: '1일 전',
      content: '스미싱 문자 왔는데 배운 대로 확인해보니 가짜였어요. 덕분에 안 당했습니다. 감사합니다!',
      likes: 67,
      comments: 15,
      category: '보안',
      verified: true
    },
    {
      id: '4',
      author: '최민수',
      age: '40대',
      avatar: '최',
      time: '2일 전',
      content: 'AI로 아이들 학습 계획 짜는 법 아시는 분 계신가요? 궁금합니다.',
      likes: 18,
      comments: 23,
      category: '질문',
      verified: false
    },
    {
      id: '5',
      author: '정미영',
      age: '50대',
      avatar: '정',
      time: '3일 전',
      content: '지난주 복지관에서 열린 AI 강좌 정말 유익했어요! 같이 참석하신 분들 모두 만나서 반가웠습니다.',
      likes: 32,
      comments: 9,
      category: '모임 후기',
      verified: true
    },
    {
      id: '6',
      author: '강대호',
      age: '60대',
      avatar: '강',
      time: '4일 전',
      content: '네이버 AI로 식단 관리 시작했어요. 혈압도 관리하고 건강해지는 느낌입니다!',
      likes: 41,
      comments: 14,
      category: '건강',
      verified: true
    }
  ];

  const events: Event[] = [
    {
      id: '1',
      title: 'AI 활용 기초 오프라인 강좌',
      date: '2025년 10월 25일',
      time: '오후 2시 - 4시',
      location: '강남구 복지관',
      participants: 12,
      maxParticipants: 20,
      category: 'AI 교육',
      description: '챗GPT, 이미지 생성 AI 등 기초부터 배웁니다',
      ageGroup: '60s'
    },
    {
      id: '2',
      title: '시니어 디지털 모임',
      date: '2025년 10월 27일',
      time: '오전 10시 - 12시',
      location: '서초구 도서관',
      participants: 8,
      maxParticipants: 15,
      category: '정기 모임',
      description: '스마트폰 활용 팁을 함께 나누는 시간',
      ageGroup: '60s'
    },
    {
      id: '3',
      title: '보이스피싱 예방 특강',
      date: '2025년 10월 28일',
      time: '오후 3시 - 5시',
      location: '온라인 (줌)',
      participants: 45,
      maxParticipants: 100,
      category: '보안',
      description: '최신 사기 수법과 대처 방법 (경찰청 협력)',
      ageGroup: '70s'
    },
    {
      id: '4',
      title: '40대를 위한 재무 AI 활용법',
      date: '2025년 10월 29일',
      time: '오후 7시 - 9시',
      location: '온라인 (Zoom)',
      participants: 23,
      maxParticipants: 50,
      category: '재무',
      description: 'AI를 활용한 가계부, 투자 분석 실습',
      ageGroup: '40s'
    },
    {
      id: '5',
      title: '50대 창업 준비반',
      date: '2025년 10월 30일',
      time: '오후 2시 - 5시',
      location: '송파구 창업센터',
      participants: 15,
      maxParticipants: 25,
      category: '창업',
      description: '온라인 판매부터 SNS 마케팅까지',
      ageGroup: '50s'
    }
  ];

  const ageFilters = [
    { value: 'all', label: '전체 연령' },
    { value: '40s', label: '40대' },
    { value: '50s', label: '50대' },
    { value: '60s', label: '60대' },
    { value: '70s', label: '70대' }
  ];

  const getAgeColor = (age: string) => {
    if (age.includes('40')) return 'bg-blue-500';
    if (age.includes('50')) return 'bg-green-500';
    if (age.includes('60')) return 'bg-purple-500';
    if (age.includes('70')) return 'bg-orange-500';
    return 'bg-slate-500';
  };

  // Filter posts by selected age group
  const filteredPosts = selectedAgeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.age.includes(selectedAgeFilter.replace('s', '')));

  // Filter events by selected age group
  const filteredEvents = selectedAgeFilter === 'all'
    ? events
    : events.filter(event => !event.ageGroup || event.ageGroup === selectedAgeFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2>또래 커뮤니티</h2>
          <p className="text-slate-600 text-sm">같은 연령대의 경험과 팁을 나눠보세요</p>
        </div>
        <Button size={buttonSize} className="gap-2">
          <Plus className="h-5 w-5" />
          글쓰기
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          placeholder="궁금한 내용을 검색해보세요..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Age Group Filter */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h4>연령대별 보기</h4>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAgeFilter(!showAgeFilter)}
            >
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
          </div>
          
          {showAgeFilter && (
            <div className="flex flex-wrap gap-2">
              {ageFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedAgeFilter === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedAgeFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          )}

          {selectedAgeFilter !== 'all' && (
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="outline">
                {ageFilters.find(f => f.value === selectedAgeFilter)?.label} 커뮤니티
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAgeFilter('all')}
              >
                전체 보기
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            질문 & 후기 ({filteredPosts.length})
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-2">
            <Calendar className="h-4 w-4" />
            오프라인 모임 ({filteredEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback className={getAgeColor(post.age)}>
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm">{post.author}</h4>
                      <Badge variant="outline" className="text-xs">
                        {post.age}
                      </Badge>
                      {post.verified && (
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{post.time}</span>
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  도움돼요 {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  댓글 {post.comments}
                </Button>
              </CardFooter>
            </Card>
          ))}

          {filteredPosts.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="mb-2">게시글이 없습니다</h3>
                <p className="text-slate-600 mb-4">
                  {selectedAgeFilter !== 'all' 
                    ? `${ageFilters.find(f => f.value === selectedAgeFilter)?.label} 커뮤니티에 첫 글을 작성해보세요`
                    : '첫 번째 글을 작성해보세요'
                  }
                </p>
                <Button>글쓰기</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{event.category}</Badge>
                      {event.ageGroup && (
                        <Badge variant="secondary">
                          {ageFilters.find(f => f.value === event.ageGroup)?.label}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {event.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-slate-500" />
                  <span>참가 {event.participants}/{event.maxParticipants}명</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  size={buttonSize} 
                  className="w-full"
                  disabled={event.participants >= event.maxParticipants}
                >
                  {event.participants >= event.maxParticipants ? '마감' : '참가 신청'}
                </Button>
              </CardFooter>
            </Card>
          ))}

          {filteredEvents.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="mb-2">예정된 모임이 없습니다</h3>
                <p className="text-slate-600 mb-4">
                  {selectedAgeFilter !== 'all'
                    ? `${ageFilters.find(f => f.value === selectedAgeFilter)?.label} 모임을 만들어보세요`
                    : '새로운 모임을 만들어보세요'
                  }
                </p>
                <Button>모임 만들기</Button>
              </CardContent>
            </Card>
          )}

          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar className="h-12 w-12 text-slate-400 mb-3" />
              <h4 className="mb-2">우리 동네 모임 만들기</h4>
              <p className="text-sm text-slate-600 mb-4">
                가까운 곳에서 함께 배우고 나눌 수 있어요
              </p>
              <Button size={buttonSize} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                모임 만들기
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}