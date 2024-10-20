import subprocess
import sys
import os

def install_requirements(requirements_file='requirements.txt'):
    try:
        with open(requirements_file, 'r') as file:
            packages = file.readlines()
        
        # Install each package using pip
        for package in packages:
            package = package.strip()
            if package:  # Skip empty lines
                print(f"Installing {package}...")
                subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])
        
        print("All packages installed successfully.")
        os._exit(0)
    except Exception as e:
        print(f"An error occurred: {e}")
        os._exit(1)

if __name__ == "__main__":
    install_requirements()

os._exit(1)
