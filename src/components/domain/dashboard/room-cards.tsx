import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Room } from "@/types/rooms";

interface RoomCardsProps {
  rooms: Room[];
}

export function RoomCards({ rooms }: RoomCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}

interface RoomCardProps {
  room: Room;
}

function RoomCard({ room }: RoomCardProps) {
  const isFull = room.activeCount >= room.capacity;
  const near = room.activeCount === room.capacity - 1;

  let badgeClass =
    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ";

  if (isFull) {
    badgeClass += "border-destructive text-destructive";
  } else if (near) {
    badgeClass += "border-amber-500 text-amber-600";
  } else {
    badgeClass += "border-emerald-500 text-emerald-600";
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{room.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Capacidade</div>
        <span className={badgeClass}>
          <Users className="size-3" />
          {room.activeCount}/{room.capacity}
        </span>
      </CardContent>
    </Card>
  );
}
