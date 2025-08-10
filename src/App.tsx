import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Setup ok 🎉</h1>
        <p className="text-sm text-muted-foreground">
          Tailwind v4 + tokens funcionando. Clique para testar o componente:
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => alert("Button ok!")}>Button padrão</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  );
}
