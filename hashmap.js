import LinkedList from "./linkedList.js";

class HashMap {
    constructor() {
        this.buckets = new Array(16);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = ( primeNumber * hashCode + key.charCodeAt(i) ) % this.buckets.length;
        }
        return hashCode;
    }

    set(key, value) {
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
        let lastNode = null;
        while (currentNode != null) { // Loop through linkedlist
            if (currentNode.value[0] == key) {
                if (currentNode.nextNode == null && lastNode == null) { //If its the only key in the bucket, remove bucket
                    this.buckets[hashCode] = undefined;
                    console.log("this ran");
                }
                else if (currentNode.nextNode == null) { //if its the last key
                    this.buckets[hashCode].pop();
                } else if (lastNode == null) { //if its the first key
                    this.buckets[hashCode].shift();
                } else { //if its not first or last, link last node to next node
                    lastNode.nextNode = currentNode.nextNode;
                }
                console.log("this ran 2");
                return true;
            }
            lastNode = currentNode;
            currentNode = currentNode.nextNode;
        }
        return false;
    }
}
