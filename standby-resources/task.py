import os

def create_scheduled_task():
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define the task name and paths
    task_name = "Standby"
    vbs_path = os.path.join(script_dir, "run_hidden.vbs")  # Path to the VBS file

    # Command to create the scheduled task
    command = (
        f'SchTasks /Create /SC ONLOGON /TN "{task_name}" '
        f'/TR "{vbs_path}" /RL HIGHEST /F'
    )

    try:
        # Execute the command
        os.system(command)
        print(f'Task "{task_name}" created successfully.')
    except Exception as e:
        print(f'Error creating task: {e}')
        print()
        print("MAKE SURE THIS SCRIPT HAS BEEN RAN AS ADMIN FOR THIS TO WORK")

if __name__ == "__main__":
    create_scheduled_task()
