let sampleGene1 = ["Hh HH HH Hh HH", "Hh hh Hh hh HH", "Hh hh Hh Hh Hh", "Hh Hh hh hh Hh", "Hh Hh Hh Hh hh"];
let sampleGene2 = ["HH hh hh Hh Hh", "Hh HH HH HH hh", "Hh HH Hh Hh HH", "Hh hh HH Hh hh", "Hh Hh Hh Hh HH"];

class Breed {
	sortBreedPercentage(pupPercent) {
		let sorted = [];
		let numVals = [];
		for (let i = 0; i < pupPercent.length; i++) {
			numVals.push(pupPercent[i][1]);
		}
		let sortedNumVals = numVals.sort();
		for (let i = 0; i < sortedNumVals.length; i++) {
			let idx = numVals.indexOf(sortedNumVals[i])
			sorted.push(pupPercent[idx]);
		}
		return sorted.reverse();
	}

	breedList(dogList) {
		let list = [];
		for (let i = 0; i < dogList.length; i++) {
			list.push(dogList[i][0]);
		}
		console.log(list);
		return list;
	}

	halfPercent(dogPercent) {
		let newPercent = [];
		for (let i = 0; i < dogPercent.length; i++) {
			newPercent.push([dogPercent[i][0], dogPercent[i][1]/2]);
		}
		return newPercent;
	} 

	determineDogBreed(dog1, dog2) {
		let dog1HalfPercent = this.halfPercent(dog1);
		let dog2HalfPercent = this.halfPercent(dog2);

		//Longer list is dog1
		if (dog1HalfPercent.length < dog2HalfPercent.length) {
			let temp = dog1HalfPercent;
			dog1HalfPercent = dog2HalfPercent;
			dog2HalfPercent = temp;
		}

		let pupPercent = [];
		let dog1List = this.breedList(dog1HalfPercent);
		let dog2List = this.breedList(dog2HalfPercent);

		for (let i = 0; i < dog1List.length; i++) {
			if(dog2List.includes(dog1List[i])) {
				let idx = dog2List.indexOf(dog1List[i]);
				pupPercent.push([dog1List[i], dog1HalfPercent[i][1] + dog2HalfPercent[idx][1]]);
			}
			else {
				pupPercent.push(dog1HalfPercent[i]);
			}
		}

		for (let i = 0; i < dog2List.length; i++) {
			if (!dog1List.includes(dog2List[i])) {
				pupPercent.push(dog2HalfPercent[i]);
			}
		}

		pupPercent = this.sortBreedPercentage(pupPercent);

		console.log(pupPercent);
		return pupPercent;
	}

	mixIndividualSet(dog1, dog2) {
		dog1 = dog1.split('');
		dog2 = dog2.split('');
		let possible = [dog1[0] + dog2[0], dog1[0] + dog2[1], dog1[1] + dog2[0], dog1[1] + dog1[1]];
		for (let i = 0; i < possible.length; i++) {
			if (possible[i][0] == "h") {
				possible[i] = possible[i][1] + possible[i][0];
			}
		}
		let chosen = Math.floor(Math.random() * Math.floor(4));
		return possible[chosen];
	}

	mixSingleSet(dog1, dog2) {
		let dog1Set = dog1.split(/[ ,]+/);
		let dog2Set = dog2.split(/[ ,]+/);
		let mixedSet = "";
		for (let i = 0; i < dog1Set.length; i++) {
			let dog1Ind = dog1Set[i];
			let dog2Ind = dog2Set[i];
			let mixedInd = this.mixIndividualSet(dog1Ind, dog2Ind);
			mixedSet += mixedInd + " ";
		}
		mixedSet = mixedSet.substring(0, mixedSet.length - 1);
		return mixedSet;
	}

	mixGenes(dog1, dog2) {
		let dog1Genes = dog1;
		let dog2Genes = dog2;
		let mixedGenes = [];
		if (dog1Genes.length != dog2Genes.length) 
		{
			console.log("ERROR: Gene lengths don't match.");
		}
		else {
			for (let i = 0; i < dog1Genes.length; i++) {
				let dog1GeneSet = dog1Genes[i];
				let dog2GeneSet = dog2Genes[i];
				let mixedSet = this.mixSingleSet(dog1GeneSet, dog2GeneSet);
				mixedGenes.push(mixedSet);
			}
			let pupGender = Math.random();
			if (pupGender < .5) {
				pupGender = true;
			}
			else {
				pupGender = false;
			}

			let breedPercent = this.determineDogBreed([["Lab", 100]], [["Golden", 2], ["GSD", 98]]);
			// let breedPercent = this.determineDogBreed([["Lab", 25], ["GSD", 50], ["Golden Retriever", 25]], [["Lab", 50], ["GSD", 50]]);
			// let breedPercent = this.determineDogBreed([["Lab", 100]], [["Lab", 50], ["GSD", 50]]);
			// let breedPercent = this.determineDogBreed([["Lab", 50], ["GSD", 50]], [["Lab", 100]]);
			// let breedPercent = this.determineDogBreed([["Lab", 100]], [["Lab", 100]]);

			i

			let puppy = new Dog("Dog", "Pup", pupGender);
			puppy.genetics = mixedGenes;
			puppy.healthFocusWords = puppy.generateHealthFocusWords();
			puppy.mother = dog1;
			puppy.father = dog2;
			puppy.breedPercent = breedPercent;
			console.log(puppy);
		}
	}
}

let testBreed = new Breed();
testBreed.mixGenes(sampleGene1, sampleGene2);