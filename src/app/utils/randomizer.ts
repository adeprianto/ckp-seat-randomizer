import {CKP} from "@/app/utils/names";

/**
 * Shuffles an array in place using the Fisher-Yates shuffle algorithm.
 * This generic function works with arrays of any type.
 * @param array The array to shuffle.
 */
function shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Randomly groups 46 people into 10 groups of 4 and 2 groups of 3,
 * with specific constraints for certain individuals.
 *
 * Constraints:
 * 1. Person IDs 13 & 26 are always together, and not in the last two groups.
 * 2. Person ID 8 is always in one of the first four groups.
 * 3. Person ID 38 is placed in the 5th, 7th, or 9th group.
 *
 * @param people The list of Person objects to group.
 * @returns An array of arrays, where each inner array is a group of Person objects.
 */
function groupPeople(people: CKP[]): CKP[][] {
    if (people.length !== 46) {
        console.error("This function is specifically designed for 46 people.");
        return [];
    }

    // --- 1. Isolate all people with constraints ---
    const coupleIds = [13, 26];
    const couple = people.filter(p => coupleIds.includes(p.id));

    const priorityPersonId = 8;
    const priorityPerson = people.find(p => p.id === priorityPersonId)!;

    // UPDATED: Only person with ID 38 is now a special individual
    const specialIndividualIds = [38];
    const specialIndividual = people.find(p => p.id === specialIndividualIds[0])!;

    const constrainedIds = new Set([...coupleIds, priorityPersonId, ...specialIndividualIds]);
    const remainingPeople = people.filter(p => !constrainedIds.has(p.id));

    shuffleArray(remainingPeople);

    // --- 2. Prepare group structure and place constrained individuals/pairs ---
    // Use an array of arrays to build groups incrementally
    const result: CKP[][] = Array.from({length: 12}, () => []);
    let remainingPeopleIndex = 0;

    // Constraint 3: Place the single special individual into group 5, 7, or 9
    const specialSlots = [6, 8, 10]; // 5th, 7th, 9th group slots
    const chosenSpecialSlot = specialSlots[Math.floor(Math.random() * specialSlots.length)];
    result[chosenSpecialSlot].push(specialIndividual);


    // Constraint 2: Place the priority person in a random empty slot in the first four groups
    const availablePrioritySlots = [];
    for (let i = 0; i < 4; i++) {
        if (result[i].length === 0) {
            availablePrioritySlots.push(i);
        }
    }
    const prioritySlotIndex = Math.floor(Math.random() * availablePrioritySlots.length);
    const priorityGroupSlot = availablePrioritySlots[prioritySlotIndex];
    result[priorityGroupSlot].push(priorityPerson);


    // Constraint 1: Place the couple in a random empty slot (but not in the last two)
    const availableCoupleSlots = [];
    for (let i = 0; i < 10; i++) { // Only check slots 0-9 (first 10 groups)
        if (result[i].length === 0) {
            availableCoupleSlots.push(i);
        }
    }
    const coupleSlotIndex = Math.floor(Math.random() * availableCoupleSlots.length);
    const coupleGroupSlot = availableCoupleSlots[coupleSlotIndex];
    result[coupleGroupSlot].push(...couple);

    // --- 3. Fill all groups to their target size ---
    for (let i = 0; i < result.length; i++) {
        // The last two groups have 3 people, the rest have 4
        const targetSize = i < 10 ? 4 : 3;
        const currentSize = result[i].length;
        const peopleNeeded = targetSize - currentSize;

        if (peopleNeeded > 0) {
            const membersToAdd = remainingPeople.slice(remainingPeopleIndex, remainingPeopleIndex + peopleNeeded);
            result[i].push(...membersToAdd);
            remainingPeopleIndex += peopleNeeded;
        }
    }

    return result;
}

export default groupPeople;
