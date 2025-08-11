import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateInput } from "@/components/ui/date-input";
import { Label } from "@/components/ui/label";
import { useCreateVisitor } from "@/hooks/visitors";
import {
  createVisitorSchema,
  type CreateVisitorInput,
} from "@/lib/schema/visitor";
import { maskCpfView, onlyDigits } from "@/lib/utils/format";
import type { Room } from "@/types/rooms";

interface CreateVisitorModalProps {
  onClose: () => void;
  rooms: Room[];
  roomMap: Map<string, { name: string; capacity: number; activeCount: number }>;
}

export function CreateVisitorModal({
  onClose,
  rooms,
  roomMap,
}: CreateVisitorModalProps) {
  const create = useCreateVisitor();

  const form = useForm<CreateVisitorInput>({
    resolver: zodResolver(createVisitorSchema),
    defaultValues: {
      name: "",
      cpf: "",
      roomId: "",
      email: "",
      birthDate: "",
    },
    mode: "onSubmit",
  });

  // Função para fechar modal e resetar form
  const handleClose = () => {
    form.reset();
    onClose();
  };

  async function onSubmit(values: CreateVisitorInput) {
    const payload = {
      ...values,
      cpf: onlyDigits(values.cpf),
      email: values.email || undefined,
      birthDate: values.birthDate || undefined,
    };

    const room = roomMap.get(payload.roomId);
    if (room && room.activeCount >= room.capacity) {
      form.setError("roomId", {
        message: `${room.name} está lotada (${room.activeCount}/${room.capacity}).`,
      });
      return;
    }

    try {
      await create.mutateAsync(payload);
      form.reset();
      onClose();
    } catch (error: unknown) {
      const err = error as { message?: string };
      form.setError("roomId", {
        message: err?.message || "Falha ao cadastrar",
      });
    }
  }

  return (
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle>Cadastrar visitante</DialogTitle>
      </DialogHeader>

      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Nome */}
        <div className="grid gap-1">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            placeholder="Ex.: Jane Foster"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-xs text-destructive">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <Label htmlFor="cpf">CPF</Label>
          <Controller
            name="cpf"
            control={form.control}
            render={({ field }) => (
              <Input
                id="cpf"
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={maskCpfView(field.value || "")}
                onChange={(e) => field.onChange(onlyDigits(e.target.value))}
              />
            )}
          />
          {form.formState.errors.cpf && (
            <p className="text-xs text-destructive">
              {form.formState.errors.cpf.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <Label>Sala de destino</Label>
          <Controller
            name="roomId"
            control={form.control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a sala" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name} — {room.activeCount}/{room.capacity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.roomId && (
            <p className="text-xs text-destructive">
              {form.formState.errors.roomId.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="grid gap-1">
            <Label htmlFor="birth">Data de nascimento (opcional)</Label>
            <DateInput id="birth" {...form.register("birthDate")} />
            {form.formState.errors.birthDate && (
              <p className="text-xs text-destructive">
                {form.formState.errors.birthDate.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">E-mail (opcional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="nome@exemplo.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={create.isPending}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
