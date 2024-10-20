import os
import win32com.client

try:
    def create_task():
        # Get the directory of the current script
        script_dir = os.path.dirname(os.path.abspath(__file__))
        vbs_file = os.path.join(script_dir, 'run_hidden.vbs')

        # Create the Task Scheduler service
        scheduler = win32com.client.Dispatch('Schedule.Service')
        scheduler.Connect()

        # Define the task name and action
        task_name = "Standby"
        task_action = win32com.client.Dispatch('Schedule.Service.TaskAction')
        task_action.Path = vbs_file
        task_action.WorkingDirectory = script_dir

        # Create the trigger
        task_trigger = win32com.client.Dispatch('Schedule.Service.TaskTrigger')
        task_trigger.Type = 4  # 4 means 'At logon'

        # Create the task definition
        task_def = scheduler.NewTask(0)
        task_def.Principal.UserId = 'SYSTEM'  # Run under system account
        task_def.Principal.LogonType = 3  # Logon interactively
        task_def.Triggers.Add(task_trigger)
        task_def.Actions.Add(task_action)

        # Set task settings
        task_def.Settings.Enabled = True
        task_def.Settings.DisallowStartIfOnBatteries = False
        task_def.Settings.StartWhenAvailable = True

        # Register the task
        folder = scheduler.GetFolder('\\')
        try:
            folder.RegisterTaskDefinition(task_name, task_def, 6, None, None, 3, None)  # 6 means 'Replace if exists'
            print(f'Task "{task_name}" created successfully.')
        except Exception as e:
            print(f'Failed to create task: {e}')

    if __name__ == "__main__":
        create_task()
except:
    os._exit(1)
os._exit(0)
