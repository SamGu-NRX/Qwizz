import requests
import openai
import json
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env.local')
load_dotenv(dotenv_path)

OPEN_API_KEY = os.environ.get("SECRET_KEY")
MONGO_PASSWORD = os.environ.get("DATABASE_PASSWORD")

def delete_thread(self, thread_id):
    url = f"https://api.openai.com/v1/threads/{thread_id}"
    headers = {
        "Authorization": f"Bearer {OPEN_API_KEY}",
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v1"
    }
    response = requests.delete(url, headers=headers)
    res = response.json()

    if res.get("deleted", False):
        print('Successfully deleted thread: ' + thread_id)
    else:
        print('Error with deleting: ' + thread_id)


def create_flashcards(context):

    client = openai.OpenAI(api_key=OPEN_API_KEY)
    thread = client.beta.threads.create()

    # Create a message in the new thread
    message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=context,
    )

    # Start a run in the newly created thread
    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id="asst_PTpGlF4xFObbEBUYl1IHO6Aq"
    )

    # Wait for the run to complete
    while True:
        keep_retrieving_run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
        )

        print(f"Status: {keep_retrieving_run.status}")
        if keep_retrieving_run.status == "completed":
            print("\n")
            break
        if keep_retrieving_run.status == "failed":
            print("\n")
            break

    # Retrieve and store messages from the completed thread
    returned_messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )

    # Assuming you want to store the response from the assistant
    returned_value = returned_messages.data[0].content[0].text.value
    print(returned_value)
    
    # Delete the thread after use
    delete_thread(thread.id)

