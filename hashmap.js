import LinkedList from "./linkedList.js";

class HashMap {
    constructor() {
        this.buckets = new Array(16);
        this.capacity = this.buckets.length;
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = ( primeNumber * hashCode + key.charCodeAt(i) ) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {

        if (this.length() > this.capacity * this.loadFactor) this.doubleBuckets();

        const hashCode = this.hash(key);

        if (this.buckets[hashCode] === undefined) {
            this.buckets[hashCode] = new LinkedList;
            this.buckets[hashCode].prepend([key, value]);
            return;
        }

        //Check if key already exists, if so overwrite the old value with the new
        let currentNode = this.buckets[hashCode].head;
        while (currentNode != null) {
            if (currentNode.value[0] == key) {
                currentNode.value = [key, value];
                return;
            }
            currentNode = currentNode.nextNode;
        }

        this.buckets[hashCode].prepend([key, value]);
    }

    get(key) {
        const hashCode = this.hash(key);

        if (this.buckets[hashCode] === undefined) {
            return null;
        }
        let currentNode = this.buckets[hashCode].head;
        while (currentNode != null) {
            if (currentNode.value[0] == key) {
                return currentNode.value[1];
            }
            currentNode = currentNode.nextNode;
        }
        return null;
    }

    has(key) {
        const hashCode = this.hash(key);

        if (this.buckets[hashCode] === undefined) {
            return false;
        }
        let currentNode = this.buckets[hashCode].head;
        while (currentNode != null) {
            if (currentNode.value[0] == key) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }
        return false;
    }

    remove(key) {
        const hashCode = this.hash(key);

        if (this.buckets[hashCode] === undefined) {
            return false;
        }
        let currentNode = this.buckets[hashCode].head;
        let indexCounter = 0;
        while (currentNode != null) { // Loop through linkedlist
            if (currentNode.value[0] == key) {
                this.buckets[hashCode].removeAt(indexCounter);
                return true;
            }
            currentNode = currentNode.nextNode;
            indexCounter++;
        }

        return false;
    }

    length() {
        let counter = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] != undefined) {
                counter += this.buckets[i].size();
            }
        }
        return counter;
    }

    clear() {
        this.buckets = new Array(16);
    }

    keys() {
        const array = [];

        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) continue;

            let currentNode = this.buckets[i].head;
            while (currentNode != null) {
                array.push(currentNode.value[0]);
                currentNode = currentNode.nextNode;
            }
        }
        return array;
    }

    values() {
        const array = [];

        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) continue;

            let currentNode = this.buckets[i].head;
            while (currentNode != null) {
                array.push(currentNode.value[1]);
                currentNode = currentNode.nextNode;
            }
        }
        return array;
    }

    entries() {
        const array = [];

        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) continue;

            let currentNode = this.buckets[i].head;
            while (currentNode != null) {
                array.push(currentNode.value);
                currentNode = currentNode.nextNode;
            }
        }
        return array;
    }

    doubleBuckets() {
        const newBuckets = new Array(this.capacity * 2);
        this.capacity *= 2;
        const allEntries = this.entries();

        this.buckets = newBuckets;

        allEntries.forEach(element => {
            this.set(element[0], element[1]);
        });
    }
}