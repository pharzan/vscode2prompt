# dummy python code:
import random
import time

class DummyClass:
    def __init__(self, name):
        self.name = name
        self.data = []

    def generate_data(self, size):
        self.data = [random.randint(1, 100) for _ in range(size)]
        print(f"Generated {size} random numbers.")

    def process_data(self):
        if not self.data:
            print("No data to process.")
            return
        self.data = [x * 2 for x in self.data]
        print("Data processed by doubling each element.")

    def display_data(self)
        if not self.data:
            print("No data to display.")
            return
        print(f"Data: {self.data}")

def main():
    dummy = DummyClass("Example")
    dummy.generate_data(10)
    time.sleep(1)
    dummy.process_data()
    time.sleep(1)
    dummy.display_data()

if __name__ == "__main__":
    main()
    
#end of file with dummy code