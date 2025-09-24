import {CKP} from "@/app/utils/names";

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

    // CHANGE: Group IDs 8 and 38 together
    const specialIndividualIds = [8, 38];

    // CHANGE: Find both special individuals at once
    const specialIndividuals = people.filter(p => specialIndividualIds.includes(p.id));

    const constrainedIds = new Set([...specialIndividualIds]);
    const remainingPeople = people.filter(p => !constrainedIds.has(p.id));

    shuffleArray(remainingPeople);

    // --- 2. Prepare groups and place constrained individuals ---
    const result: CKP[][] = Array.from({length: 12}, () => []);
    // const usedSlots = new Set<number>();

    const specialSlots = [4, 5, 6, 7, 8, 9];

    specialIndividuals.forEach((person) => {
        const chosenSeatRow = specialSlots[Math.floor(Math.random() * specialSlots.length)];
        result[chosenSeatRow].push(person);
    });

    // --- 3. Fill the remaining slots in all groups ---
    let remainingPeopleIndex = 0;
    for (let i = 0; i < result.length; i++) {
        const targetSize = i < 10 ? 4 : 3;
        const peopleNeeded = targetSize - result[i].length;

        if (peopleNeeded > 0) {
            const membersToAdd = remainingPeople.slice(remainingPeopleIndex, remainingPeopleIndex + peopleNeeded);
            result[i].push(...membersToAdd);
            remainingPeopleIndex += peopleNeeded;
        }
    }

    specialSlots.forEach((slot) => {
        shuffleArray(result[slot])
    })

    const specialFrontIds = [21, 14]
    const specialPeopleFront = people.filter(p => specialFrontIds.includes(p.id));
    shuffleArray(specialPeopleFront);

    specialPeopleFront.forEach((person, index) => {
        let tempPerson: CKP
        if (index === 1) {
            tempPerson = result[0][3];
        } else {
            tempPerson = result[1][0];
        }

        if (tempPerson.id !== person.id) {
            const targetPersonIndex = findIndexOfPerson(result, person);
            if (targetPersonIndex) {
                if (index === 0) {
                    result[0][3] = person;
                    result[targetPersonIndex[0]][targetPersonIndex[1]] = tempPerson;
                } else {
                    result[1][0] = person;
                    result[targetPersonIndex[0]][targetPersonIndex[1]] = tempPerson;
                }
            }
        }
    })

    console.log(result);

    return result;
}

function findIndexOfPerson(array: CKP[][], value: CKP) {
    for (let row = 0; row < array.length; row++) {
        const col = array[row].indexOf(value);
        if (col !== -1) {
            return [row, col]; // Return [row, column] if the value is found
        }
    }
    return null; // Return null if the value is not found
}

export default groupPeople;
