function Heap() {
  this.items = [],
  this.size = function () { return this.items.length; }
}
Heap.prototype.getLeftChildIndex = function (parentIndex) {
  return 2 * parentIndex + 1;
}
Heap.prototype.getRightChildIndex = function (parentIndex) {
  return 2 * parentIndex + 2;
}
Heap.prototype.getParentIndex = function (childIndex) {
  return Math.floor((childIndex - 1) / 2);
}
Heap.prototype.hasLeftChild = function (index) {
  return this.getLeftChildIndex(index) < this.size();
}
Heap.prototype.hasRightChild = function (index) {
  return this.getRightChildIndex(index) < this.size();
}
Heap.prototype.hasParent = function (index) {
  return this.getParentIndex(index) >= 0;
}
Heap.prototype.leftChild = function (index) {
  return this.items[this.getLeftChildIndex(index)];
}
Heap.prototype.rightChild = function (index) {
  return this.items[this.getRightChildIndex(index)];
}
Heap.prototype.parent = function (index) {
  return this.items[this.getParentIndex(index)];
}
Heap.prototype.isEmpty = function (methodName) {
  if (this.size() == 0)
    throw new RangeError("Cannot perform '" + methodName + 
                                    "' on an empty Heap.");
}
Heap.prototype.swap = function (index1, index2) {
  var temp = this.items[index1];
  this.items[index1] = this.items[index2];
  this.items[index2] = temp;
}
Heap.prototype.peek = function () {
  this.isEmpty("peek");
  return this.items[0];
}

function MaxHeap() {
  Heap.call(this);
}
MaxHeap.prototype = Object.create(Heap.prototype);
MaxHeap.prototype.constructor = MaxHeap;
MaxHeap.prototype.poll = function () {
  this.isEmpty("poll");
  var data = this.items[0];
  this.items[0] = this.items.pop();
  
  var index = 0;
  while (this.hasLeftChild(index)) {
    var smallerIndex = (this.hasRightChild(index) && 
                        this.rightChild(index) > this.leftChild(index)) ?
        this.getRightChildIndex(index) : this.getLeftChildIndex(index);
    if (this.items[index] > this.items[smallerIndex])
      break;
    else 
      this.swap(index, smallerIndex);
    index = smallerIndex;
  }
  return data;
}
MaxHeap.prototype.add = function (data) {
  var index = this.items.push(data) - 1;
  while (this.hasParent(index) && this.parent(index) < this.items[index]) {
    this.swap(this.getParentIndex(index), index);
    index = this.getParentIndex(index);
  }
}

function MinHeap() {
  Heap.call(this);
}
MinHeap.prototype = Object.create(Heap.prototype);
MinHeap.prototype.constructor = MinHeap;
MinHeap.prototype.poll = function () {
  this.isEmpty("poll");
  var data = this.items[0];
  this.items[0] = this.items.pop();
  
  var index = 0;
  while (this.hasLeftChild(index)) {
    var smallerIndex = (this.hasRightChild(index) && 
                        this.rightChild(index) < this.leftChild(index)) ?
        this.getRightChildIndex(index) : this.getLeftChildIndex(index);
    if (this.items[index] < this.items[smallerIndex]) 
      break;
    else 
      this.swap(index, smallerIndex);
    index = smallerIndex;
  }
  return data;
}
MinHeap.prototype.add = function (data) {
  var index = this.items.push(data) - 1;
  while (this.hasParent(index) && this.parent(index) > this.items[index]) {
    this.swap(this.getParentIndex(index), index);
    index = this.getParentIndex(index);
  }
}

function addNumber(number, maxH, minH) {
  if (maxH.size() == 0 || number < maxH.peek())
    maxH.add(number);
  else 
    minH.add(number);
}

function rebalance(maxH, minH) {
  if (maxH.size() - minH.size() >= 2)
    minH.add(maxH.poll());
  else if (minH.size() - maxH.size() >= 2)
    maxH.add(minH.poll());
}

function getMedian(maxH, minH) {
  var median;
  if (maxH.size() == minH.size()) 
    median = (maxH.peek() + minH.peek()) / 2;
  else 
    median = (maxH.size() > minH.size()) ? maxH.peek() : minH.peek();
  return median.toFixed(1);
}

function main() {
  var n = parseInt(readLine());
  var a;
  var minHeap = new MinHeap;
  var maxHeap = new MaxHeap;
  
  for (var i = 0; i < n; i++) {
    a = parseInt(readLine());
    addNumber(a, maxHeap, minHeap);
    rebalance(maxHeap, minHeap);
    console.log(getMedian(maxHeap, minHeap));
  }

}
