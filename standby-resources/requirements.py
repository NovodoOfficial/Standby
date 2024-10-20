import subprocess
import sys
import os

def is_package_installed(package):
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'show', package], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except subprocess.CalledProcessError:
        return False

def install_requirements(requirements_file='requirements.txt'):
    try:
        with open(requirements_file, 'r') as file:
            packages = file.readlines()
        
        # Install each package using pip
        for package in packages:
            package = package.strip()
            if package:  # Skip empty lines
                if not is_package_installed(package):
                    print(f"Installing {package}...")
                    subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])
                else:
                    print(f"{package} is already installed.")

        print("All packages processed.")
        os._exit(0)
    except Exception as e:
        print(f"An error occurred: {e}")
        os._exit(1)

if __name__ == "__main__":
    install_requirements()

os._exit(1)
