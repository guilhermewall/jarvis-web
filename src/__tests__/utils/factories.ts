import { faker } from "@faker-js/faker";
import type { ActiveVisitor, CreateVisitor } from "@/types/visitors";
import type { HistoryItem } from "@/types/history";
import type { LogItem } from "@/types/logs";
import type { Room } from "@/types/rooms";

export function createMockVisitor(
  overrides?: Partial<ActiveVisitor>
): ActiveVisitor {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    cpf: faker.string.numeric(11),
    roomId: faker.string.uuid(),
    roomName:
      faker.company.name() + " - Sala " + faker.number.int({ min: 1, max: 10 }),
    checkInAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}

export function createMockVisitors(count: number): ActiveVisitor[] {
  return Array.from({ length: count }, () => createMockVisitor());
}

export function createMockHistoryItem(
  overrides?: Partial<HistoryItem>
): HistoryItem {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    cpf: faker.string.numeric(11),
    roomId: faker.string.uuid(),
    roomName:
      faker.company.name() + " - Sala " + faker.number.int({ min: 1, max: 10 }),
    checkInAt: faker.date.past().toISOString(),
    checkOutAt: faker.datatype.boolean()
      ? faker.date.recent().toISOString()
      : null,
    ...overrides,
  };
}

export function createMockHistory(count: number): HistoryItem[] {
  return Array.from({ length: count }, () => createMockHistoryItem());
}

export function createMockLogItem(overrides?: Partial<LogItem>): LogItem {
  const levels = ["info", "warn", "error"] as const;
  return {
    id: faker.string.uuid(),
    message: faker.lorem.sentence(),
    level: faker.helpers.arrayElement(levels),
    createdAt: faker.date.recent().toISOString(),
    meta: faker.datatype.boolean()
      ? { source: faker.helpers.arrayElement(["api", "auth", "database"]) }
      : undefined,
    ...overrides,
  };
}

export function createMockLogs(count: number): LogItem[] {
  return Array.from({ length: count }, () => createMockLogItem());
}

export function createMockRoom(overrides?: Partial<Room>): Room {
  return {
    id: faker.string.uuid(),
    name:
      faker.company.name() + " - Sala " + faker.number.int({ min: 1, max: 20 }),
    capacity: faker.number.int({ min: 5, max: 50 }),
    activeCount: faker.number.int({ min: 0, max: 10 }),
    ...overrides,
  };
}

export function createMockRooms(count: number = 10): Room[] {
  return Array.from({ length: count }, () => createMockRoom());
}

// Factory para dados de formulário
export function createMockVisitorForm(): CreateVisitor {
  return {
    name: faker.person.fullName(),
    cpf: faker.string.numeric(11),
    roomId: faker.string.uuid(),
    email: faker.internet.email(),
    birthDate: faker.date.birthdate().toISOString().split("T")[0],
  };
}
