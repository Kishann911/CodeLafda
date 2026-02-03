import { GameQuestion, TechStack } from './schema';

// Question pool organized by tech stack
export const questionPool: Record<TechStack, GameQuestion[]> = {
    'React': [
        {
            id: 'react-state-counter',
            title: 'Fix the Counter Bug',
            description: 'The counter increments by 2 instead of 1. Fix the state update logic.',
            starterCode: `# Fix this counter - it increments by 2!
counter = 0

def increment():
    global counter
    counter = counter + 1
    counter = counter + 1  # BUG: Extra increment
    return counter

# Test it
print(increment())  # Should be 1
print(increment())  # Should be 2
print(increment())  # Should be 3`,
            testCases: [
                { input: '', expectedOutput: '1\n2\n3' }
            ],
            difficulty: 'easy',
            techStack: 'React',
            compilerType: 'WEB_WORKER'
        },
        {
            id: 'react-list-render',
            title: 'Fix List Rendering',
            description: 'The list is not rendering all items. Fix the loop condition.',
            starterCode: `# Fix the list display
items = ['Apple', 'Banana', 'Cherry', 'Date']

def display_items():
    for i in range(len(items) - 1):  # BUG: Missing last item
        print(f"{i+1}. {items[i]}")

display_items()`,
            testCases: [
                { input: '', expectedOutput: '1. Apple\n2. Banana\n3. Cherry\n4. Date' }
            ],
            difficulty: 'easy',
            techStack: 'React',
            compilerType: 'WEB_WORKER'
        }
    ],
    'Node.js': [
        {
            id: 'nodejs-async-bug',
            title: 'Fix Async Function',
            description: 'The async function is not waiting properly. Fix the promise handling.',
            starterCode: `# Fix the async timing issue
import asyncio

async def fetch_data():
    await asyncio.sleep(0.1)
    return "Data loaded"

async def main():
    result = fetch_data()  # BUG: Missing await
    print(result)

asyncio.run(main())`,
            testCases: [
                { input: '', expectedOutput: 'Data loaded' }
            ],
            difficulty: 'medium',
            techStack: 'Node.js',
            compilerType: 'WEB_WORKER'
        }
    ],
    'Python': [
        {
            id: 'python-sort-bug',
            title: 'Fix the Sorting Algorithm',
            description: 'The sort function has a comparison bug. Fix the logic.',
            starterCode: `# Fix the sorting logic
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] < arr[j+1]:  # BUG: Wrong comparison
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

numbers = [64, 34, 25, 12, 22]
print(bubble_sort(numbers))`,
            testCases: [
                { input: '', expectedOutput: '[12, 22, 25, 34, 64]' }
            ],
            difficulty: 'easy',
            techStack: 'Python',
            compilerType: 'PYODIDE'
        }
    ],
    'TypeScript': [
        {
            id: 'ts-null-check',
            title: 'Fix Null Check',
            description: 'Add proper null checking to prevent errors.',
            starterCode: `# Fix the null safety issue
def get_user_name(user):
    return user['name'].upper()  # BUG: No null check

users = [
    {'name': 'Alice'},
    None,
    {'name': 'Bob'}
]

for user in users:
    print(get_user_name(user))`,
            testCases: [
                { input: '', expectedOutput: 'ALICE\nUnknown\nBOB' }
            ],
            difficulty: 'medium',
            techStack: 'TypeScript',
            compilerType: 'WEB_WORKER'
        }
    ],
    // Default questions for other stacks
    'Vue': [],
    'Angular': [],
    'Next.js': [],
    'Svelte': [],
    'Django': [],
    'Flask': [],
    'Spring Boot': [],
    'Ruby on Rails': [],
    'MongoDB': [],
    'PostgreSQL': [],
    'MySQL': [],
    'Redis': [],
    'Solidity': [],
    'Smart Contract Security': [],
    'Gas Optimization': [],
    'Wallet Integration': [],
    'JavaScript': [],
    'Java': [],
    'C++': [],
    'Rust': [],
    'Go': []

};

/**
 * Select a random question from the pool based on selected tech stacks
 */
export function selectQuestion(stacks: TechStack[]): GameQuestion | null {
    // Collect all available questions from selected stacks
    const availableQuestions: GameQuestion[] = [];

    for (const stack of stacks) {
        const stackQuestions = questionPool[stack] || [];
        availableQuestions.push(...stackQuestions);
    }

    // If no questions available, return null
    if (availableQuestions.length === 0) {
        return null;
    }

    // Select random question
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
}

/**
 * Get total question count for given stacks
 */
export function getQuestionCount(stacks: TechStack[]): number {
    return stacks.reduce((count, stack) => {
        return count + (questionPool[stack]?.length || 0);
    }, 0);
}
