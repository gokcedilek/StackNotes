export class CopyPasteStack {
  constructor() {
    this.data = [];
    this.top = 0; //position to insert a new element
  }

  push = (item) => {
    this.data[this.top] = item;
    this.top = this.top + 1;
    console.log(this.data);
  };

  peek = () => {
    return this.data[this.top - 1];
  };

  pop = () => {
    if (this.top !== 0) {
      this.top = this.top - 1;
      return this.data.pop();
    }
  };
}
