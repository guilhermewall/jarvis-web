// src/pages/Dashboard.tsx
import { useMemo, useState } from "react";

import { useRooms } from "@/hooks/rooms";
import { useActiveVisitors, useCheckoutVisitor } from "@/hooks/visitors";
import { useDashboardStore } from "@/stores/dashboard";

import {
  RoomCards,
  DashboardHeader,
  DashboardFilters,
  VisitorsTable,
  CreateVisitorModal,
} from "@/components/domain/dashboard";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const { data: rooms } = useRooms();
  const { search, roomId, setSearch, setRoomId, density, setDensity, reset } =
    useDashboardStore();

  const { data: active } = useActiveVisitors({
    search: search || undefined,
    roomId: roomId || undefined,
  });

  const checkout = useCheckoutVisitor();

  const roomMap = useMemo(() => {
    const map = new Map<
      string,
      { name: string; capacity: number; activeCount: number }
    >();
    rooms?.forEach((room) => map.set(room.id, room));
    return map;
  }, [rooms]);

  return (
    <div className="grid gap-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DashboardHeader
          density={density}
          onDensityChange={setDensity}
          trigger={
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4" /> Novo visitante
              </Button>
            </DialogTrigger>
          }
        />
        <CreateVisitorModal
          onClose={() => setOpen(false)}
          rooms={rooms ?? []}
          roomMap={roomMap}
        />
      </Dialog>

      {rooms && <RoomCards rooms={rooms} />}

      <DashboardFilters
        search={search}
        roomId={roomId}
        rooms={rooms ?? []}
        onSearchChange={setSearch}
        onRoomChange={setRoomId}
        onReset={reset}
      />

      <VisitorsTable
        visitors={active ?? []}
        density={density}
        onCheckout={(id) => checkout.mutate(id)}
        isCheckingOut={checkout.isPending}
      />
    </div>
  );
}
