import {CKP} from "@/app/utils/names";

/**
 * Shuffles an array in place using the Fisher-Yates shuffle algorithm.
 * This generic function works with arrays of any type (no changes needed).
 * @param array The array to shuffle.
 */
function shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Randomly groups a list of people into groups of 4, with the last two groups having 3 people.
 * @param people The list of Person objects to group.
 * @returns An array of arrays, where each inner array is a group of Person objects.
 */
function groupPeople(people: CKP[]): CKP[][] {
    if (people.length !== 46) {
        console.error("This function is specifically designed for 46 people.");
        return [];
    }

    // Create a copy to avoid modifying the original array
    const shuffledPeople: CKP[] = [...people];
    shuffleArray(shuffledPeople);

    const result: CKP[][] = [];
    const itemsForGroupsOfThree = 6; // 2 groups * 3 people
    const itemsForGroupsOfFour = shuffledPeople.length - itemsForGroupsOfThree;

    // Create the 10 groups of 4
    for (let i = 0; i < itemsForGroupsOfFour; i += 4) {
        const group: CKP[] = shuffledPeople.slice(i, i + 4);
        result.push(group);
    }

    // Create the 2 groups of 3
    const remainingPeople: CKP[] = shuffledPeople.slice(itemsForGroupsOfFour);
    for (let i = 0; i < remainingPeople.length; i += 3) {
        const group: CKP[] = remainingPeople.slice(i, i + 3);
        result.push(group);
    }

    return result;
}

export default groupPeople
