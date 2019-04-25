class Dog {
	generateIndividualRandomHealthGene() {
		let randHealthPoint = Math.random();
		let healthVal = "h";
		if (randHealthPoint > .5) {
			healthVal = "H";
		}
		return healthVal;
	}

	generatePairRandomHealthGene() {
		let val1 = this.generateIndividualRandomHealthGene();
		let val2 = this.generateIndividualRandomHealthGene();
		let healthVal = val1 + val2;
		if (val1 == "h") {
			healthVal = val2 + val1;
		}
		return healthVal;
	}

	generateSetRandomHealthGene() {
		let healthVal = "";
		for (let i = 0; i < 5; i++) {
			healthVal += this.generatePairRandomHealthGene() + " ";
		}
		healthVal = healthVal.substring(0, healthVal.length - 1);
		return healthVal;
	}

	generateRandomGenetics() {
		let brain = this.generateSetRandomHealthGene();
		let heart = this.generateSetRandomHealthGene();
		let lungs = this.generateSetRandomHealthGene();
		let joints = this.generateSetRandomHealthGene();
		let coat = this.generateSetRandomHealthGene();
		return [brain, heart, lungs, joints, coat];
	}

	healthFocusSet(singleSet) {
		let setArray = singleSet.split(/[ ,]+/);
		let hCount = 0;

		for (let i = 0; i < setArray.length; i++) {
			let word = setArray[i];
			for(let j = 0; j < word.length; j++) {
				if (word[j] == "h") {
					hCount++;
				}
			}
		}

		if (hCount == 0) {
			return "Perfect";
		}
		if (hCount >= 1 && hCount <= 2) {
			return "Good";
		}
		if (hCount >= 3 && hCount <= 4) {
			return "Fair";
		}
		return "Poor"
	}

	generateHealthFocusWords() {
		let genetics = this.genetics;
		let healthWords = [];
		for (let i = 0; i < genetics.length; i++) {
			healthWords.push(this.healthFocusSet(genetics[i]));
		}
		return healthWords;
	}

	constructor(breed, name, gender) {
		this.breed = breed;
		this.breedPercent = [[breed, 100]];
		this.name = name;
		this.mother = null;
		this.father = null;
		this.children = [];
		this.genetics = this.generateRandomGenetics();
		this.healthFocusWords = this.generateHealthFocusWords();
		this.gender = gender; //true = female, false = male
	}
}

window.onload = function() {
	let testDog = new Dog("Doggo", "Pupper", true);
};