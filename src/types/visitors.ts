export interface ActiveVisitor {
  id: string;
  name: string;
  cpf: string;
  roomId: string;
  roomName: string;
  checkInAt: string;
}

export interface CreateVisitor {
  name: string;
  cpf: string;
  roomId: string;
  email?: string;
  birthDate?: string;
}
