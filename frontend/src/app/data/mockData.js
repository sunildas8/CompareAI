/**
 * mockData.js – sample comparison data matching the API shape.
 */
export const MOCK_RESPONSE = {
  problem: "write a factorial function in javascript",
  solution_1: `Here's a factorial function in JavaScript. The factorial of a non-negative integer \`n\` is the product of all positive integers less than or equal to \`n\`. It is denoted by \`n!\`.

### Recursive Approach:
\`\`\`javascript
function factorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Example usage:
console.log(factorial(5)); // Output: 120 (5! = 5 * 4 * 3 * 2 * 1 = 120)
\`\`\`

### Iterative Approach:
\`\`\`javascript
function factorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Example usage:
console.log(factorial(5)); // Output: 120
\`\`\`

### Notes:
1. The factorial of \`0\` is \`1\` (\`0! = 1\`).
2. The function throws an error for negative numbers since factorial is not defined for them.
3. The recursive approach is elegant but may cause a stack overflow for very large \`n\`.
4. The iterative approach is more efficient for large \`n\` and avoids stack overflow issues.

Would you like any optimizations (e.g., memoization) or explanations for these implementations?`,

  solution_2: `Certainly! Below is a simple implementation of a factorial function in JavaScript using both iterative and recursive approaches.

### Iterative Approach
\`\`\`javascript
function factorialIterative(n) {
    if (n < 0) return undefined; // Factorial is not defined for negative numbers
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Example usage:
console.log(factorialIterative(5)); // Output: 120
\`\`\`

### Recursive Approach
\`\`\`javascript
function factorialRecursive(n) {
    if (n < 0) return undefined; // Factorial is not defined for negative numbers
    if (n === 0 || n === 1) return 1;
    return n * factorialRecursive(n - 1);
}

// Example usage:
console.log(factorialRecursive(5)); // Output: 120
\`\`\`

### Explanation:
- **Iterative Approach**: This method uses a loop to multiply numbers from 1 to \`n\`, storing the result in a variable.
- **Recursive Approach**: This method calls itself with a smaller value of \`n\` until it reaches the base case (\`n === 0\` or \`n === 1\`), then it multiplies the results as it returns.

Both functions handle the edge case where \`n\` is negative by returning \`undefined\`, as the factorial is not defined for negative numbers.

Choose the approach that best fits your needs!`,

  jude_recommendation: {
    solution_1_score: 10,
    solution_2_score: 8,
    solution_1_reasoning:
      "Solution 1 is excellent. It correctly handles invalid inputs by throwing an error, which is better practice for mathematical functions than returning undefined, as it allows the developer to catch the error. The notes provided are informative and show an understanding of the performance and stack constraints in JavaScript.",
    solution_2_reasoning:
      "Solution 2 is accurate and provides good implementations. However, returning undefined for invalid inputs is less robust than throwing an error, as it might lead to silent failures or unexpected type errors later in the code. It is still a very good, clean response.",
  },
};

/** A few sample chat history items for the sidebar */
export const INITIAL_HISTORY = [
  {
    id: 'factorial-js',
    problem: 'Write a factorial function in JS',
    time: 'Just now',
  },
];
