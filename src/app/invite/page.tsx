import type { Metadata } from 'next';
import { Suspense } from 'react';
import InviteClient from './InviteClient';

type PageProps = {
  params: Promise<Record<string, string | string[]>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { searchParams }: PageProps
): Promise<Metadata> {
  const resolved = await searchParams;
  const rawCode = resolved?.code;
  const code = (Array.isArray(rawCode) ? rawCode[0] : rawCode) || 'FSH-INVITE';

  const rawName = resolved?.name;
  const rawFrom = resolved?.from || rawName;
  const rawTo = resolved?.to;
  const rawRole = resolved?.role || resolved?.fromRole;

  const role = ((Array.isArray(rawRole) ? rawRole[0] : rawRole) || '').toLowerCase();
  const isParentSender = role === 'parent' || code.toUpperCase().startsWith('PAR-');

  const senderName = (Array.isArray(rawFrom) ? rawFrom[0] : rawFrom) || (isParentSender ? 'Parent Guardian' : 'Student');
  const recipientName = (Array.isArray(rawTo) ? rawTo[0] : rawTo) || (isParentSender ? 'Student' : 'Parent Guardian');

  const senderLabel = isParentSender ? 'Parent Guardian' : 'Student';
  const recipientLabel = isParentSender ? 'Student' : 'Parent Guardian';

  const title = `🛡️ Connect ${senderName} & ${recipientName} on FocusDefend (${code})`;
  const description = `${senderName} (${senderLabel}) has invited ${recipientName} (${recipientLabel}) to pair devices on FocusDefend. Link accounts to sync study progress, supervise screen time, and unlock study rewards.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://focusdefend.vercel.app/invite?code=${encodeURIComponent(code)}&from=${encodeURIComponent(senderName)}&to=${encodeURIComponent(recipientName)}&role=${encodeURIComponent(role)}`,
      siteName: 'FocusDefend',
      images: [
        {
          url: 'https://focusdefend.vercel.app/banner.jpg',
          width: 1200,
          height: 630,
          alt: 'FocusDefend Family Device Pairing & Digital Wellbeing',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://focusdefend.vercel.app/banner.jpg'],
    },
  };
}

export default async function InvitePage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const rawCode = resolved?.code;
  const code = (Array.isArray(rawCode) ? rawCode[0] : rawCode) || undefined;

  const rawName = resolved?.name;
  const rawFrom = resolved?.from || rawName;
  const rawTo = resolved?.to;
  const rawRole = resolved?.role || resolved?.fromRole;

  const senderName = (Array.isArray(rawFrom) ? rawFrom[0] : rawFrom) || undefined;
  const recipientName = (Array.isArray(rawTo) ? rawTo[0] : rawTo) || undefined;
  const role = (Array.isArray(rawRole) ? rawRole[0] : rawRole) || undefined;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <Suspense
        fallback={
          <div className="p-8 rounded-3xl bg-neutral-900/80 border border-cyan-500/20 text-cyan-400 font-bold flex items-center gap-3">
            <span className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span>Loading FocusDefend Family Link…</span>
          </div>
        }
      >
        <InviteClient
          initialCode={code}
          initialSenderName={senderName}
          initialRecipientName={recipientName}
          initialRole={role}
        />
      </Suspense>
    </main>
  );
}
