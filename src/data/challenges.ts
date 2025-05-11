export interface TestCase {
  input: string;
  output: string;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tags: string[];
  timeLimit: number; // in minutes
  participants: number;
  testCases: TestCase[];
}

export const challenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Two Sum Problem',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    tags: ['Array', 'Hash Table'],
    timeLimit: 15,
    participants: 128,
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ]
  },
  {
    id: 'challenge-2',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    tags: ['Array', 'Sorting'],
    timeLimit: 25,
    participants: 84,
    testCases: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' }
    ]
  },
  {
    id: 'challenge-3',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    timeLimit: 35,
    participants: 47,
    testCases: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5' }
    ]
  },
  {
    id: 'challenge-4',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    tags: ['String', 'Stack'],
    timeLimit: 15,
    participants: 156,
    testCases: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ]
  },
  {
    id: 'challenge-5',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    timeLimit: 20,
    participants: 102,
    testCases: [
      { input: 's = "abcabcbb"', output: '3' },
      { input: 's = "bbbbb"', output: '1' },
      { input: 's = "pwwkew"', output: '3' }
    ]
  }
];

