import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Volume2, 
  VolumeX, 
  Camera, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  RotateCcw,
  Share2
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Textarea } from './ui/textarea';

interface LearningCard {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  summary: string[];
  steps: string[];
  source: string;
  warning?: string;
  fraudRisk?: 'low' | 'medium' | 'high';
  hasVoice: boolean;
  hasVideo: boolean;
  relevantFor: string[];
}

interface TryItNowModalProps {
  card: LearningCard;
  onClose: () => void;
  easyMode: boolean;
  buttonSize: 'default' | 'lg';
}

export function TryItNowModal({ card, onClose, easyMode, buttonSize }: TryItNowModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [userInput, setUserInput] = useState('');

  const progress = ((currentStep + 1) / card.steps.length) * 100;

  const handleNext = () => {
    if (currentStep < card.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompleted(false);
    setUserInput('');
  };

  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled);
    // In real app, this would start/stop TTS
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`max-w-3xl max-h-[90vh] overflow-y-auto ${easyMode ? 'text-xl' : ''}`}>
        <DialogHeader>
          <DialogTitle>{card.title}</DialogTitle>
          <DialogDescription>
            단계별로 천천히 따라하세요. 언제든 다시 시작할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        {!completed ? (
          <div className="space-y-6">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">진행률</span>
                <span className="text-sm">
                  {currentStep + 1} / {card.steps.length}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Current Step */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  {currentStep + 1}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">{card.steps[currentStep]}</h3>
                  
                  {/* Voice Control */}
                  {card.hasVoice && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size={buttonSize}
                        variant={voiceEnabled ? 'default' : 'outline'}
                        onClick={handleVoiceToggle}
                        className="gap-2"
                      >
                        {voiceEnabled ? (
                          <>
                            <Volume2 className="h-5 w-5" />
                            음성 안내 중
                          </>
                        ) : (
                          <>
                            <VolumeX className="h-5 w-5" />
                            음성 안내 켜기
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Helper Tools */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button variant="outline" size={buttonSize} className="gap-2 h-auto py-4 flex-col">
                <Camera className="h-6 w-6" />
                <span className="text-sm">화면 촬영하기</span>
              </Button>
              <Button variant="outline" size={buttonSize} className="gap-2 h-auto py-4 flex-col">
                <FileText className="h-6 w-6" />
                <span className="text-sm">메모하기</span>
              </Button>
              <Button variant="outline" size={buttonSize} className="gap-2 h-auto py-4 flex-col">
                <Volume2 className="h-6 w-6" />
                <span className="text-sm">다시 듣기</span>
              </Button>
            </div>

            {/* Practice Area */}
            <div className="border rounded-lg p-4">
              <h4 className="mb-2">연습 공간</h4>
              <p className="text-sm text-slate-600 mb-3">
                실제로 해보고 결과를 아래에 적어보세요
              </p>
              <Textarea
                placeholder="여기에 입력하거나 결과를 적어보세요..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-24"
              />
            </div>

            {/* Warning Reminder */}
            {card.warning && currentStep === 0 && (
              <Alert>
                <AlertDescription className="flex items-start gap-2">
                  <span>⚠️</span>
                  <span>{card.warning}</span>
                </AlertDescription>
              </Alert>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              <Button
                size={buttonSize}
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                이전
              </Button>
              <Button
                size={buttonSize}
                className="flex-1 gap-2"
                onClick={handleNext}
              >
                {currentStep < card.steps.length - 1 ? (
                  <>
                    다음
                    <ArrowRight className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    완료
                    <CheckCircle className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <div>
              <h3 className="mb-2">축하합니다! 🎉</h3>
              <p className="text-slate-600">
                {card.title}를 완료하셨습니다
              </p>
            </div>

            <div className="bg-slate-50 border rounded-lg p-4">
              <p className="mb-2">배운 내용</p>
              <ul className="space-y-2 text-sm text-left">
                {card.summary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                size={buttonSize}
                variant="outline"
                onClick={handleReset}
                className="flex-1 gap-2"
              >
                <RotateCcw className="h-5 w-5" />
                다시 하기
              </Button>
              <Button
                size={buttonSize}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Share2 className="h-5 w-5" />
                공유하기
              </Button>
            </div>

            <Button
              size={buttonSize}
              onClick={onClose}
              className="w-full"
            >
              홈으로 돌아가기
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
