import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  User, 
  Bell, 
  Shield, 
  Accessibility, 
  Users, 
  Download,
  Trash2,
  Link,
  Volume2,
  Eye,
  Moon,
  Phone
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface UserSettingsProps {
  ageGroup: '40s' | '50s' | '60s' | '70s';
  setAgeGroup: (age: '40s' | '50s' | '60s' | '70s') => void;
  easyMode: boolean;
  setEasyMode: (enabled: boolean) => void;
  buttonSize: 'default' | 'lg';
}

export function UserSettings({ 
  ageGroup, 
  setAgeGroup, 
  easyMode, 
  setEasyMode, 
  buttonSize 
}: UserSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2>설정</h2>
        <p className="text-slate-600 text-sm">나에게 맞게 앱을 설정하세요</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            프로필
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-3 block">연령대</Label>
            <RadioGroup 
              value={ageGroup} 
              onValueChange={(value) => setAgeGroup(value as '40s' | '50s' | '60s' | '70s')}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              <div>
                <RadioGroupItem value="40s" id="40s" className="peer sr-only" />
                <Label
                  htmlFor="40s"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-200 p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer"
                >
                  <span>40대</span>
                  <span className="text-xs text-slate-600 mt-1">실무 중심</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="50s" id="50s" className="peer sr-only" />
                <Label
                  htmlFor="50s"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-200 p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer"
                >
                  <span>50대</span>
                  <span className="text-xs text-slate-600 mt-1">재취업·창업</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="60s" id="60s" className="peer sr-only" />
                <Label
                  htmlFor="60s"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-200 p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer"
                >
                  <span>60대</span>
                  <span className="text-xs text-slate-600 mt-1">쉬운 사용</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="70s" id="70s" className="peer sr-only" />
                <Label
                  htmlFor="70s"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-200 p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer"
                >
                  <span>70대</span>
                  <span className="text-xs text-slate-600 mt-1">초간단 모드</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            접근성
          </CardTitle>
          <CardDescription>화면 크기와 음성 안내를 설정하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-slate-600" />
              <div>
                <Label>쉬운 모드</Label>
                <p className="text-sm text-slate-600">큰 글씨, 고대비, 간편한 화면</p>
              </div>
            </div>
            <Switch checked={easyMode} onCheckedChange={setEasyMode} />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-slate-600" />
              <Label>음성 안내</Label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">음성 속도</span>
              <span className="text-sm text-slate-600">보통</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-slate-600" />
              <div>
                <Label>고대비 모드</Label>
                <p className="text-sm text-slate-600">화면을 더 선명하게</p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            알림
          </CardTitle>
          <CardDescription>받고 싶은 알림만 선택하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>새로운 학습 카드</Label>
              <p className="text-sm text-slate-600">주 3회 (월/수/금)</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>주간 요약 리포트</Label>
              <p className="text-sm text-slate-600">매주 일요일 오전</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>보안 경고</Label>
              <p className="text-sm text-slate-600">사기 주의보, 긴급 알림</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>커뮤니티 활동</Label>
              <p className="text-sm text-slate-600">댓글, 좋아요, 새 모임</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            보안 및 개인정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>사기 예방 체크</Label>
              <p className="text-sm text-slate-600">링크 안전성 자동 확인</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>사기 예방 퀴즈</Label>
              <p className="text-sm text-slate-600">주기적으로 복습하기</p>
            </div>
            <Badge variant="secondary">완료 3/5</Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2" size={buttonSize}>
              <Download className="h-4 w-4" />
              내 데이터 다운로드
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" size={buttonSize}>
              <Trash2 className="h-4 w-4" />
              계정 삭제
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Family Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            가족 연결
          </CardTitle>
          <CardDescription>
            가족이나 보호자가 학습 활동을 볼 수 있습니다 (선택사항)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              연결된 가족은 학습 진행 상황과 안전 알림만 받습니다. 
              학습 내용이나 커뮤니티 활동은 공유되지 않습니다.
            </AlertDescription>
          </Alert>

          <Button variant="outline" className="w-full gap-2" size={buttonSize}>
            <Link className="h-4 w-4" />
            가족 초대 링크 만들기
          </Button>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            도움말 및 지원
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size={buttonSize}>
            자주 묻는 질문
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" size={buttonSize}>
            <Phone className="h-4 w-4" />
            전화 상담 (평일 9-18시)
          </Button>
          <Button variant="outline" className="w-full justify-start" size={buttonSize}>
            온라인 채팅 상담
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardContent className="pt-6 text-center text-sm text-slate-600">
          <p>AI 배움터 v1.0</p>
          <p className="mt-1">© 2025 모두를 위한 AI 교육</p>
          <div className="flex justify-center gap-4 mt-3">
            <button className="hover:text-blue-600">이용약관</button>
            <button className="hover:text-blue-600">개인정보처리방침</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
