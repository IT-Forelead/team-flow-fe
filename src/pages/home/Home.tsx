import { useAuthContext } from '@/hooks/use-auth-context';

export default function Home() {
  const { currentUser } = useAuthContext();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName =
    currentUser?.firstName && currentUser?.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : currentUser?.username || 'User';

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            {getGreeting()}, {displayName}! 👋
          </h1>
          <p className="text-xl text-muted-foreground">Welcome back to your dashboard</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <p className="text-muted-foreground text-sm">Access your most used features quickly</p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
            <p className="text-muted-foreground text-sm">Stay updated with your latest actions</p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            <p className="text-muted-foreground text-sm">Important updates and messages</p>
          </div>
        </div>
      </div>
    </div>
  );
}
