import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/schema/auth";
import { useLogin } from "@/hooks/auth";
import { auth } from "@/lib/auth";
import { appToast } from "@/lib/toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const from = state?.from?.pathname ?? "/";
  const [showPw, setShowPw] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "admin@stark.com", password: "admin123" },
    mode: "onSubmit",
  });

  const { mutate, isPending } = useLogin({
    onSuccess: (res) => {
      auth.set(res.token);
      appToast.auth.loginSuccess();
      navigate(from, { replace: true });
    },
    onError: (error) => {
      appToast.auth.loginError(error.message);
      form.setError("password", {
        message: error.message || "Credenciais inválidas",
      });
    },
  });

  function onSubmit(values: LoginInput) {
    mutate(values);
  }

  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <Card className="w-[min(440px,100%)]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">J.A.R.V.I.S</CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Use suas credenciais para acessar o painel administrativo
          </p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                autoComplete="username"
                {...form.register("email")}
                aria-invalid={!!form.formState.errors.email}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  {...form.register("password")}
                  aria-invalid={!!form.formState.errors.password}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:opacity-80"
                  aria-label={showPw ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPw ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Entrando…
                </span>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
