import { PulseBoard } from '@/components/organisms/PulseBoard';
import { Navigation } from '@/components/organisms/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-axiom-bg">
      <Navigation />

      <main className="p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Pulse</h1>
          <p className="text-sm text-axiom-text-muted">
            Real-time token discovery across the ecosystem
          </p>
        </div>

        <PulseBoard />
      </main>
    </div>
  );
}
