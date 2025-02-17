class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

export default class LinkedList {
    constructor() {
         this.head = null;
    }

    append(value) {
        if (this.head == null) {
            this.prepend(value);
            return;
        }
        let currentNode = this.head;
        while (currentNode.nextNode != null) currentNode = currentNode.nextNode;
        currentNode.nextNode = new Node(value);
    }

    prepend(value) {
        const newNode = new Node(value, this.head);
        this.head = newNode;
    }

    size() {
        if (this.head == null) return 0;
        let counter = 1;
        let currentNode = this.head;
        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
            counter++;
        }
        return counter;
    }

    returnHead() {
        return this.head;
    }

    tail() {
        if (this.head == null) throw Error("List is empty");

        let currentNode = this.head;
        while (currentNode.nextNode != null) currentNode = currentNode.nextNode;
        return currentNode;
    }

    at(index) {
        if (this.head == null) throw Error("List is empty");

        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.nextNode;
            if (currentNode == null) return null;
        }
        return currentNode;
    }

    pop() {
        if (this.head == null) throw Error("List is empty");

        let currentNode = this.head;
        while (currentNode.nextNode.nextNode != null) currentNode = currentNode.nextNode;
        currentNode.nextNode = null;
    }

    shift() {
        if (this.head == null) throw Error("List is empty");
        let currentNode = this.head;
        this.head = currentNode.nextNode;
    }

    contains(value) {
        if (this.head == null) throw Error("List is empty");

        let currentNode = this.head;
        while (currentNode != null) {
            if (currentNode.value == value) return true;
            currentNode = currentNode.nextNode;
        }
        return false;
    }

    find(value) {
        if (this.head == null) throw Error("List is empty");
        let indexCounter = 0;
        let currentNode = this.head;
        while (currentNode != null) {
            if (currentNode.value == value) return indexCounter;
            currentNode = currentNode.nextNode;
            indexCounter++;
        }
        return null;
    }

    toString() {
        if (this.head == null) throw Error("List is empty");

        let string = "";
        let currentNode = this.head;
        // console.log(currentNode.value);
        while (currentNode != null) {
            string = string.concat(`( ${currentNode.value} ) -> `);
            currentNode = currentNode.nextNode;
        }
        string = string.concat("null");
        return string;
    }

    removeAt(index) {
        if (this.head == null) throw Error("List is empty");

        let currentNode = this.head;
        let lastNode = null;
        for (let i = 0; i < index; i++) {
            if (currentNode == null) throw Error("Index is greater than list size");
            lastNode = currentNode;
            currentNode = currentNode.nextNode;
        }
        if (lastNode == null) this.shift();
        else {
            lastNode.nextNode = currentNode.nextNode;
        }
    }
}