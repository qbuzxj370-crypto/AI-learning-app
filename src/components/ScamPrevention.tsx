import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  Link as LinkIcon,
  MessageSquare,
  FileText
} from 'lucide-react';

interface ScamPreventionProps {
  buttonSize: 'default' | 'lg';
}

export function ScamPrevention({ buttonSize }: ScamPreventionProps) {
  const [quizScore, setQuizScore] = useState(3);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const scamTypes = [
    {
      id: '1',
      type: '스미싱',
      risk: 'high',
      description: '문자 메시지로 가짜 링크를 보내는 수법',
      examples: [
        '택배 조회를 위한 링크 클릭 요구',
        '카드 사용 내역 확인 유도',
        '정부 지원금 신청 안내'
      ],
      prevention: [
        '발신번호가 일반 전화번호면 의심',
        '링크 주소를 길게 눌러 전체 URL 확인',
        '의심되면 공식 앱이나 홈페이지로 직접 접속'
      ]
    },
    {
      id: '2',
      type: '보이스피싱',
      risk: 'high',
      description: '전화로 기관을 사칭하여 돈을 요구',
      examples: [
        '경찰·검찰 사칭 "계좌가 범죄에 연루"',
        '자녀 사칭 "급히 돈이 필요해"',
        '금융기관 사칭 "대출 승인 위해 인증"'
      ],
      prevention: [
        '전화로 절대 개인정보나 계좌번호 알려주지 않기',
        '급하게 돈을 요구하면 100% 사기',
        '끊고 공식 번호로 직접 확인'
      ]
    },
    {
      id: '3',
      type: '메신저피싱',
      risk: 'medium',
      description: '카카오톡 등으로 지인 사칭',
      examples: [
        '"전화번호 바뀌었어" 후 금전 요구',
        '선물 링크로 위장한 악성 링크',
        '급한 일이라며 계좌이체 요청'
      ],
      prevention: [
        '전화로 직접 본인 확인',
        '링크는 절대 클릭하지 말고 확인 먼저',
        '돈 요구는 반드시 통화로 재확인'
      ]
    }
  ];

  const quizQuestions = [
    {
      question: '"택배 조회하세요" 문자의 링크를 클릭해도 되나요?',
      answer: 'no',
      explanation: '절대 안됩니다. 택배 조회는 공식 앱이나 홈페이지로 직접 접속하세요.'
    },
    {
      question: '경찰이라며 전화가 왔어요. 계좌번호를 알려줘야 하나요?',
      answer: 'no',
      explanation: '경찰이나 검찰은 전화로 계좌번호를 묻지 않습니다. 100% 사기입니다.'
    },
    {
      question: '지인이 카톡으로 "전화번호 바뀌었어"라고 해요. 어떻게 하나요?',
      answer: 'call',
      explanation: '반드시 기존 번호로 전화해서 본인인지 확인하세요.'
    },
    {
      question: '의심스러운 링크를 받았어요. 어떻게 하나요?',
      answer: 'report',
      explanation: '절대 클릭하지 말고, 앱의 사기예방 센터나 112에 신고하세요.'
    },
    {
      question: '"급히 돈이 필요해"라는 전화를 받았어요. 어떻게 하나요?',
      answer: 'verify',
      explanation: '끊고 본인에게 직접 전화해서 확인하세요. 급한 돈 요청은 대부분 사기입니다.'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <h2>사기예방 센터</h2>
        </div>
        <p className="text-slate-600 text-sm">최신 사기 수법을 알고 안전하게 지키세요</p>
      </div>

      {/* Quiz Progress */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4>사기예방 퀴즈</h4>
              <p className="text-sm text-slate-600">완료 {quizScore}/5</p>
            </div>
            <Badge variant="secondary">{Math.round((quizScore / 5) * 100)}%</Badge>
          </div>
          <Progress value={(quizScore / 5) * 100} className="h-3 mb-4" />
          <Button size={buttonSize} onClick={() => setShowQuiz(!showQuiz)}>
            {showQuiz ? '퀴즈 숨기기' : '퀴즈 풀기'}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-red-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <h4 className="mb-2">의심스러운 연락 신고</h4>
            <p className="text-sm text-slate-600 mb-4">
              받은 문자나 전화가 의심되나요?
            </p>
            <Button size={buttonSize} variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              상담원 연결
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <LinkIcon className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h4 className="mb-2">링크 안전성 확인</h4>
            <p className="text-sm text-slate-600 mb-4">
              링크를 클릭하기 전에 확인하세요
            </p>
            <Button size={buttonSize} variant="outline">
              링크 검사하기
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Scam Types */}
      <div className="space-y-4">
        <h3>주요 사기 유형</h3>
        {scamTypes.map((scam) => (
          <Card key={scam.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {scam.type}
                    {scam.risk === 'high' && (
                      <Badge variant="destructive">⚠️ 주의</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{scam.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Examples */}
              <div>
                <h5 className="mb-2 text-sm">이런 방식으로 접근해요</h5>
                <ul className="space-y-1">
                  {scam.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div>
                <h5 className="mb-2 text-sm text-green-700">예방하는 방법</h5>
                <ul className="space-y-1">
                  {scam.prevention.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contact */}
      <Alert>
        <Shield className="h-5 w-5" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="mb-2">의심스러우면 즉시 연락하세요</p>
            <div className="flex gap-2">
              <Button size={buttonSize} variant="outline" className="flex-1 gap-2">
                <Phone className="h-4 w-4" />
                112 (경찰)
              </Button>
              <Button size={buttonSize} variant="outline" className="flex-1 gap-2">
                <Phone className="h-4 w-4" />
                1332 (금융)
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Recent Scam Alerts */}
      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            최근 주의보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert>
            <AlertDescription>
              <p className="mb-1">🚨 택배 사칭 스미싱 급증 (10월 3주)</p>
              <p className="text-sm text-slate-600">
                "택배 조회하세요" 문자에 악성 링크 포함. 절대 클릭하지 마세요.
              </p>
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertDescription>
              <p className="mb-1">⚠️ 정부 지원금 사칭 주의 (10월 2주)</p>
              <p className="text-sm text-slate-600">
                정부 지원금은 절대 문자나 전화로 신청받지 않습니다.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
