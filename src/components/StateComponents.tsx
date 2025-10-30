import { Loader2, AlertCircle, Inbox, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({ message = '불러오는 중...', size = 'md' }: LoadingStateProps) {
  const iconSize = size === 'lg' ? 'h-12 w-12' : size === 'md' ? 'h-8 w-8' : 'h-6 w-6';
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className={`${iconSize} animate-spin text-blue-600 mb-4`} />
      <p className="text-slate-600">{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  size?: 'default' | 'lg';
}

export function EmptyState({ icon, title, description, action, size = 'default' }: EmptyStateProps) {
  const iconSize = size === 'lg' ? 'h-16 w-16' : 'h-12 w-12';
  
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        {icon ? (
          <div className={`${iconSize} text-slate-400 mb-4`}>{icon}</div>
        ) : (
          <Inbox className={`${iconSize} text-slate-400 mb-4`} />
        )}
        <h3 className="mb-2">{title}</h3>
        {description && <p className="text-slate-600 mb-4 max-w-md">{description}</p>}
        {action && (
          <Button size={size} onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface ErrorStateProps {
  type?: 'network' | 'general' | 'permission';
  message?: string;
  onRetry?: () => void;
  size?: 'default' | 'lg';
}

export function ErrorState({ 
  type = 'general', 
  message, 
  onRetry,
  size = 'default' 
}: ErrorStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'network':
        return <WifiOff className="h-12 w-12" />;
      default:
        return <AlertCircle className="h-12 w-12" />;
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'network':
        return '인터넷 연결을 확인해주세요';
      case 'permission':
        return '권한이 필요합니다';
      default:
        return '오류가 발생했습니다';
    }
  };

  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-destructive mb-4">{getIcon()}</div>
        <h3 className="mb-2">{message || getDefaultMessage()}</h3>
        <p className="text-slate-600 mb-4">잠시 후 다시 시도해주세요</p>
        {onRetry && (
          <Button size={size} onClick={onRetry} variant="outline">
            다시 시도
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function SkeletonCard() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
          <div className="h-20 bg-slate-200 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 bg-slate-200 rounded animate-pulse flex-1" />
            <div className="h-10 bg-slate-200 rounded animate-pulse w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
