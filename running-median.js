/* General Heap constructor */
function Heap() {
  this.items = [],
  this.size = function () { return this.items.length; }
}
Heap.prototype.getLeftChildIndex = function (parentIndex) {
  return 2 * parentIndex + 1;     // Calculation is from heap structure theory
};
Heap.prototype.getRightChildIndex = function (parentIndex) {
  return 2 * parentIndex + 2;     // Calculation is from heap structure theory
};
Heap.prototype.getParentIndex = function (childIndex) {
  return Math.floor((childIndex - 1) / 2);    // Calculation is from heap structure theory
};
Heap.prototype.hasLeftChild = function (index) {
  return this.getLeftChildIndex(index) < this.size();
};
Heap.prototype.hasRightChild = function (index) {
  return this.getRightChildIndex(index) < this.size();
};
Heap.prototype.hasParent = function (index) {
  return this.getParentIndex(index) >= 0;
};
Heap.prototype.leftChild = function (index) {
  return this.items[this.getLeftChildIndex(index)];
};
Heap.prototype.rightChild = function (index) {
  return this.items[this.getRightChildIndex(index)];
};
Heap.prototype.parent = function (index) {
  return this.items[this.getParentIndex(index)];
};
Heap.prototype.isEmpty = function (methodName) {
  if (this.size() == 0)
    throw new RangeError("Cannot perform '" + methodName + 
                                    "' on an empty Heap.");
};
Heap.prototype.swap = function (index1, index2) {
  var temp = this.items[index1];
  this.items[index1] = this.items[index2];
  this.items[index2] = temp;
};
// Look at the first element of the heap
Heap.prototype.peek = function () {
  this.isEmpty("peek");
  return this.items[0];
};

/* MaxHeap constructor that inherits from Heap. */
function MaxHeap() {
  Heap.call(this);
}
MaxHeap.prototype = Object.create(Heap.prototype);
MaxHeap.prototype.constructor = MaxHeap;
/* Removes top element and replaces it with the last element.
  Then it checks downwards if it is bigger than its children, swapping as it goes. */
// Similar code below... Something more efficient???
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
};
/* Adds a new element at the bottom and checks if it is bigger than its parents.
  It swaps upwards untill it finds an element smaller or equal. */
// Similar code below... Something more efficient???
MaxHeap.prototype.add = function (data) {
  var index = this.items.push(data) - 1;
  while (this.hasParent(index) && this.parent(index) < this.items[index]) {
    this.swap(this.getParentIndex(index), index);
    index = this.getParentIndex(index);
  }
};

/* MinHeap constructor that inherits from Heap. */
function MinHeap() {
  Heap.call(this);
}
MinHeap.prototype = Object.create(Heap.prototype);
MinHeap.prototype.constructor = MinHeap;
/* Removes top element and replaces it with the last element.
  Then it checks downwards if it is smaller than its children, swapping as it goes. */
// Similar code above... Something more efficient???
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
};
/* Adds a new element at the bottom and checks if it is smaller than its parents.
  It swaps upwards untill it finds an element bigger or equal. */
// Similar code above... Something more efficient???
MinHeap.prototype.add = function (data) {
  var index = this.items.push(data) - 1;
  while (this.hasParent(index) && this.parent(index) > this.items[index]) {
    this.swap(this.getParentIndex(index), index);
    index = this.getParentIndex(index);
  }
};

// Takes a number and adds it to the appropriate heap.
function addNumber(number, maxH, minH) {
  if (maxH.size() == 0 || number < maxH.peek())
    maxH.add(number);
  else 
    minH.add(number);
}

/* Compares the two heaps so that |maxH.size - minH.size| <= 1
  If it isn't so, it polls the smaller one and adds the element to the other.
  This way the heaps are always equal in size or 
  one is bigger than the other by one. */
function rebalance(maxH, minH) {
  if (maxH.size() - minH.size() >= 2)
    minH.add(maxH.poll());
  else if (minH.size() - maxH.size() >= 2)
    maxH.add(minH.poll());
}

/* If the two heaps are equal in size, the median is the average of the two top elements.
  Else, the median is the top element of the biggest heap */
function getMedian(maxH, minH) {
  var median;
  if (maxH.size() == minH.size()) 
    median = (maxH.peek() + minH.peek()) / 2;
  else 
    median = (maxH.size() > minH.size()) ? maxH.peek() : minH.peek();
  return median.toFixed(1);     // Formats the result to one decimal point
}

/* Sample solution to the problem */
function solution() {
  /* "INPUT" is a showcase for a string with all the needed elements for the problem.
      So, one should use split(), map() etc. accordingly. */
  var n = parseInt(INPUT);    // The total number of the integer series
  var num;                    // Each integer.
  var minHeap = new MinHeap;
  var maxHeap = new MaxHeap;
  
  for (var i = 0; i < n; i++) {
    num = parseInt(INPUT); // "INPUT" is as above
    addNumber(num, maxHeap, minHeap);
    rebalance(maxHeap, minHeap);
    console.log(getMedian(maxHeap, minHeap));
  }
}
