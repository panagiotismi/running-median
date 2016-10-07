# running-median
An implementation of the running median problem in JS, using binary heaps.

The problem: "Given a series of integers, find the median of the numbers as they come"

In JavaScript, one could solve the problem by adding the numbers in an array and sorting it for every new number and then just find the median of this array.
But this way the complexity is too great (O(n^2) I think), so it takes too much time for large series of numbers.
So I prototyped two binary heaps (max and min) and used them to find the median, which is way faster.
