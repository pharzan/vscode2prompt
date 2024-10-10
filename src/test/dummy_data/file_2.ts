//  dummy typescript code:

class DummyClass {
    private name: string;
    private data: number[];

    constructor(name: string) {
        this.name = name;
        this.data = [];
    }

    generateData(size: number): void {
        this.data = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
        console.log(`Generated ${size} random numbers.`);
    }

    processData(): void {
        if (this.data.length === 0) {
            console.log("No data to process.");
            return;
        }
        this.data = this.data.map(x => x * 2);
        console.log("Data processed by doubling each element.");
    }

    displayData(): void {
        if (this.data.length === 0) {
            console.log("No data to display.");
            return;
        }
        console.log(`Data: ${this.data}`);
    }
}

function main(): void {
    const dummy = new DummyClass("Example");
    dummy.generateData(10);
    setTimeout(() => {
        dummy.processData();
        setTimeout(() => {
            dummy.displayData();
        }, 1000);
    }, 1000);
}

main();

// end of file