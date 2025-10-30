import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  Phone, 
  MessageCircle, 
  HelpCircle, 
  Clock,
  CheckCircle,
  PhoneCall
} from 'lucide-react';

interface HelpHubProps {
  ageGroup: '40s' | '50s' | '60s' | '70s';
  buttonSize: 'default' | 'lg';
}

interface RecentInquiry {
  id: string;
  type: 'phone' | 'chat';
  subject: string;
  date: string;
  status: 'completed' | 'pending';
}

export function HelpHub({ ageGroup, buttonSize }: HelpHubProps) {
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected'>('idle');

  const recentInquiries: RecentInquiry[] = [
    {
      id: '1',
      type: 'phone',
      subject: '챗GPT 사용법 문의',
      date: '2일 전',
      status: 'completed'
    },
    {
      id: '2',
      type: 'chat',
      subject: '스미싱 의심 문자',
      date: '5일 전',
      status: 'completed'
    }
  ];

  const faqs = [
    {
      question: 'AI를 처음 사용하는데 어렵나요?',
      answer: '걱정하지 마세요! 천천히 따라하기 기능으로 단계별로 배울 수 있어요. 음성 안내도 제공됩니다.'
    },
    {
      question: '개인정보는 안전한가요?',
      answer: '모든 데이터는 암호화되어 안전하게 보관되며, 사용자 동의 없이는 절대 공유되지 않습니다. 원하시면 언제든 삭제할 수 있어요.'
    },
    {
      question: '전화 상담 시간은 언제인가요?',
      answer: '평일 오전 9시부터 오후 6시까지 상담이 가능합니다. 점심시간(12-1시)에도 운영됩니다.'
    },
    {
      question: '오프라인 강좌는 어디서 하나요?',
      answer: '가까운 복지관, 도서관, 평생학습관에서 진행됩니다. 모임 탭에서 지역별 일정을 확인하세요.'
    },
    {
      question: '사기 문자를 받았어요. 어떻게 하나요?',
      answer: '절대 링크를 클릭하지 마세요. 앱의 사기예방 센터에서 확인하거나, 즉시 상담원에게 전화주세요.'
    }
  ];

  const handleCall = () => {
    setCallStatus('calling');
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };

  const handleEndCall = () => {
    setCallStatus('idle');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>도움이 필요하세요?</h2>
        <p className="text-slate-600 text-sm">언제든 편하게 문의하세요</p>
      </div>

      {/* Call Status */}
      {callStatus !== 'idle' && (
        <Card className="border-blue-500 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                  {callStatus === 'calling' ? (
                    <Phone className="h-6 w-6 text-white animate-pulse" />
                  ) : (
                    <PhoneCall className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h4>{callStatus === 'calling' ? '연결 중...' : '상담원 연결됨'}</h4>
                  <p className="text-sm text-slate-600">
                    {callStatus === 'calling' ? '잠시만 기다려주세요' : '통화 중'}
                  </p>
                </div>
              </div>
              {callStatus === 'connected' && (
                <Button variant="destructive" onClick={handleEndCall}>
                  종료
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-blue-500">
          <CardContent className="pt-6 text-center" onClick={handleCall}>
            <div className="h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-10 w-10 text-white" />
            </div>
            <h3 className="mb-2">상담원에게 전화</h3>
            <p className="text-sm text-slate-600 mb-3">
              친절한 상담원이 바로 도와드려요
            </p>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              평일 9-18시
            </Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="h-20 w-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="mb-2">채팅 상담</h3>
            <p className="text-sm text-slate-600 mb-3">
              문자로 편하게 상담하세요
            </p>
            <Badge variant="outline" className="gap-1 bg-green-50">
              <CheckCircle className="h-3 w-3" />
              실시간 응답
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* 70+ Emergency Options */}
      {ageGroup === '70s' && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg">긴급 도움</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button size={buttonSize} variant="destructive" className="w-full gap-2">
              <Phone className="h-5 w-5" />
              즉시 도움 요청
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button size={buttonSize} variant="outline">
                병원 예약
              </Button>
              <Button size={buttonSize} variant="outline">
                가족 연락
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            자주 묻는 질문
          </CardTitle>
          <CardDescription>
            궁금한 내용을 먼저 찾아보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Recent Inquiries */}
      {recentInquiries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">최근 문의 기록</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {inquiry.type === 'phone' ? (
                    <Phone className="h-5 w-5 text-slate-600" />
                  ) : (
                    <MessageCircle className="h-5 w-5 text-slate-600" />
                  )}
                  <div>
                    <p>{inquiry.subject}</p>
                    <p className="text-sm text-slate-600">{inquiry.date}</p>
                  </div>
                </div>
                <Badge variant={inquiry.status === 'completed' ? 'secondary' : 'default'}>
                  {inquiry.status === 'completed' ? '완료' : '진행중'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Contact Info */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6 space-y-2 text-sm text-center">
          <p>📞 고객센터: 1588-0000</p>
          <p>⏰ 평일 09:00-18:00 (점심시간 운영)</p>
          <p>📧 help@ailearning.kr</p>
        </CardContent>
      </Card>
    </div>
  );
}
