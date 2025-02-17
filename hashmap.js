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
}