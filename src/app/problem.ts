export class Problem {
  mid: String = null;
  name: String = 'Default Problem';
  stem: String = 'No Body';
  items: Array<any>;
  answer: any;
  allotedTime: number;
  createdAt: number = Date.now();
  updatedAt: number = Date.now();
}
