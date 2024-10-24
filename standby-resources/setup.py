import subprocess
import time

def run_script(script_name):
    try:
        result = subprocess.run(['python', script_name], check=True)
        return result
    except subprocess.CalledProcessError as e:
        print(f"Error running {script_name}: {e}")
        return None

def main():
    print("=" * 25)
    print("Setting up...")
    print("=" * 25)
    print("Installing requirements...")
    run_script('requirements.py')

    time.sleep(5)

    print("=" * 25)
    print("Creating startup task...")
    run_script('task.py')

    print("=" * 25)
    print("Setup complete")

if __name__ == "__main__":
    main()
