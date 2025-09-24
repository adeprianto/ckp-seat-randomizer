import {CKP} from "@/app/utils/names"; // Assuming CKP is a type like { id: number; name: string; }

/**
 * Shuffles an array in place using the Fisher-Yates shuffle algorithm.
 * (This helper function is unchanged)
 */
function shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function groupPeople(people: CKP[]): CKP[][] {
    if (people.length !== 46) {
        console.error("This function is specifically designed for 46 people.");
        return [];
    }

    // --- 1. Identify and separate all constrained individuals ---

    // IDs for individuals placed randomly within special rows
    const specialIndividualIds = [8, 38, 36];
    // NEW: IDs for individuals placed in fixed seats
    const fixedPositionIds = [14, 21];

    // Find all constrained individuals
    const specialIndividuals = people.filter(p => specialIndividualIds.includes(p.id));
    const fixedPositionIndividuals = people.filter(p => fixedPositionIds.includes(p.id));

    // Combine all constrained IDs to filter them out from the main pool
    const constrainedIds = new Set([...specialIndividualIds, ...fixedPositionIds]);
    const remainingPeople = people.filter(p => !constrainedIds.has(p.id));

    shuffleArray(remainingPeople);

    // --- 2. Prepare groups and place constrained individuals ---
    const result: CKP[][] = Array.from({length: 12}, () => []);

    // Place individuals with random seating (IDs 8, 38)
    const specialSlots = [4, 5, 6, 7];
    // Improved logic: Shuffle slots to guarantee unique assignment
    shuffleArray(specialSlots);
    specialIndividuals.forEach((person, index) => {
        const chosenSeatRow = specialSlots[Math.floor(Math.random() * specialSlots.length)];
        result[chosenSeatRow].push(person);
    });

    // NEW: Place individuals with fixed seating (IDs 14, 21) into their target groups.
    // Their exact seat index will be enforced later.
    const [personA, personB] = fixedPositionIndividuals;
    if (Math.random() < 0.5) {
        result[0].push(personA); // e.g., ID 14 goes to group 0
        result[1].push(personB); // e.g., ID 21 goes to group 1
    } else {
        result[0].push(personB); // e.g., ID 21 goes to group 0
        result[1].push(personA); // e.g., ID 14 goes to group 1
    }

    // --- 3. Fill the remaining slots in all groups ---
    let remainingPeopleIndex = 0;
    for (let i = 0; i < result.length; i++) {
        const targetSize = i < 10 ? 4 : 3;
        while (result[i].length < targetSize) {
            if (remainingPeopleIndex < remainingPeople.length) {
                result[i].push(remainingPeople[remainingPeopleIndex]);
                remainingPeopleIndex++;
            } else {
                console.error("Not enough people to fill all groups.");
                break;
            }
        }
    }

    // --- 4. NEW: Enforce exact seat positions for fixed individuals ---

    // Find the fixed person in group 0 and swap them to the target seat [0][3]
    const personInGroup0 = result[0].find(p => fixedPositionIds.includes(p.id));
    if (personInGroup0) {
        const currentIndex = result[0].indexOf(personInGroup0);
        const targetIndex = 3;
        if (currentIndex !== targetIndex) {
            [result[0][currentIndex], result[0][targetIndex]] = [result[0][targetIndex], result[0][currentIndex]];
        }
    }

    // Find the fixed person in group 1 and swap them to the target seat [1][0]
    const personInGroup1 = result[1].find(p => fixedPositionIds.includes(p.id));
    if (personInGroup1) {
        const currentIndex = result[1].indexOf(personInGroup1);
        const targetIndex = 0;
        if (currentIndex !== targetIndex) {
            [result[1][currentIndex], result[1][targetIndex]] = [result[1][targetIndex], result[1][currentIndex]];
        }
    }

    // --- 5. Final shuffles ---
    // Shuffle the people within the special rows to randomize their internal seats
    specialSlots.forEach((slot) => {
        shuffleArray(result[slot]);
    });

    return result;
}

export default groupPeople;
