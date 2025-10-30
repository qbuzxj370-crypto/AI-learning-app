import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Mail, 
  Lock, 
  User, 
  Phone,
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface AuthProps {
  onAuthSuccess: (user: any) => void;
}

export function Auth({ onAuthSuccess }: AuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login - In real app, this would call Supabase
    setTimeout(() => {
      if (loginEmail && loginPassword) {
        onAuthSuccess({
          email: loginEmail,
          name: '사용자',
          ageGroup: '60s'
        });
      } else {
        setError('이메일과 비밀번호를 입력해주세요');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms || !agreePrivacy) {
      setError('필수 약관에 동의해주세요');
      return;
    }

    setIsLoading(true);

    // Simulate signup - In real app, this would call Supabase
    setTimeout(() => {
      if (signupEmail && signupPassword && signupName) {
        onAuthSuccess({
          email: signupEmail,
          name: signupName,
          phone: signupPhone,
          ageGroup: '60s'
        });
      } else {
        setError('모든 필수 항목을 입력해주세요');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = async (provider: 'google' | 'naver' | 'kakao') => {
    setIsLoading(true);
    setError('');

    // Simulate social login - In real app, this would use OAuth
    setTimeout(() => {
      onAuthSuccess({
        email: `user@${provider}.com`,
        name: `${provider} 사용자`,
        provider: provider,
        ageGroup: '60s'
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl text-blue-600">AI 배움터</h1>
          </div>
          <CardDescription className="text-base">
            모두를 위한 AI 학습 플랫폼
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">로그인</TabsTrigger>
              <TabsTrigger value="signup">회원가입</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">이메일</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="login-password">비밀번호</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? '로그인 중...' : '로그인'}
                </Button>

                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    비밀번호를 잊으셨나요?
                  </Button>
                </div>
              </form>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-slate-500">
                  또는
                </span>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  size="lg"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                  Google로 계속하기
                </Button>

                <Button
                  variant="outline"
                  className="w-full gap-2 bg-[#03C75A] hover:bg-[#02B350] text-white border-[#03C75A]"
                  size="lg"
                  onClick={() => handleSocialLogin('naver')}
                  disabled={isLoading}
                >
                  <span className="text-xl">N</span>
                  네이버로 계속하기
                </Button>

                <Button
                  variant="outline"
                  className="w-full gap-2 bg-[#FEE500] hover:bg-[#FADA0A] text-black border-[#FEE500]"
                  size="lg"
                  onClick={() => handleSocialLogin('kakao')}
                  disabled={isLoading}
                >
                  <span className="text-xl">K</span>
                  카카오로 계속하기
                </Button>
              </div>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">이름 *</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="홍길동"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-email">이메일 *</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="example@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-password">비밀번호 *</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="8자 이상 입력"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    영문, 숫자 포함 8자 이상
                  </p>
                </div>

                <div>
                  <Label htmlFor="signup-phone">휴대폰 번호 (선택)</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="010-0000-0000"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                      <span className="text-red-600">*</span> 이용약관에 동의합니다
                      <Button variant="link" className="h-auto p-0 ml-1 text-xs">
                        보기
                      </Button>
                    </label>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="privacy"
                      checked={agreePrivacy}
                      onCheckedChange={(checked) => setAgreePrivacy(checked as boolean)}
                    />
                    <label htmlFor="privacy" className="text-sm leading-tight cursor-pointer">
                      <span className="text-red-600">*</span> 개인정보처리방침에 동의합니다
                      <Button variant="link" className="h-auto p-0 ml-1 text-xs">
                        보기
                      </Button>
                    </label>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? '가입 중...' : '회원가입'}
                </Button>
              </form>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-slate-500">
                  SNS로 간편가입
                </span>
              </div>

              {/* Social Signup */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  size="lg"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                  Google로 가입하기
                </Button>

                <Button
                  variant="outline"
                  className="w-full gap-2 bg-[#03C75A] hover:bg-[#02B350] text-white border-[#03C75A]"
                  size="lg"
                  onClick={() => handleSocialLogin('naver')}
                  disabled={isLoading}
                >
                  <span className="text-xl">N</span>
                  네이버로 가입하기
                </Button>

                <Button
                  variant="outline"
                  className="w-full gap-2 bg-[#FEE500] hover:bg-[#FADA0A] text-black border-[#FEE500]"
                  size="lg"
                  onClick={() => handleSocialLogin('kakao')}
                  disabled={isLoading}
                >
                  <span className="text-xl">K</span>
                  카카오로 가입하기
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
