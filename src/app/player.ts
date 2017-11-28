export class Player {
  id: string;
  name: string;
  roomId: string;

  constructor(name: string = '**') {
    this.name = name;
  }
}
