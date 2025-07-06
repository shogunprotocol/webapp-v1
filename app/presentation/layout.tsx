export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#020409]">
      {children}
    </div>
  );
} 