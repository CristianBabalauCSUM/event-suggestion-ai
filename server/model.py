from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

templateUserScheduling = """
Today's Schedule:
{today}

Other Schedule:
{otherSchedule}

Please suggest new activities or events for the user today, scheduled between 08:00 and 22:00, considering the following:

- The new events should not conflict with any existing events in today's schedule.
- The events should relate to the user's interests inferred from the provided schedules.
- The events should be appropriate for the time of day.

Output Format:

- Return only the new events in a JSON array (list) format with keys in lowercase.
- Each event in the array should include the following fields:
  - `title`: The title of the event.
  - `description`: A brief description of the event.
  - `location`: The location of the event.
  - `start`: The start time in ISO 8601 format (e.g., "2024-09-05T15:00:00").
  - `end`: The end time in ISO 8601 format.
  - `duration`: The duration of the event in minutes.
  - `time`: The time of the event in human-readable format (e.g., "3:00 PM - 4:00 PM").
  - `type`: A list of tags or categories for the event (e.g., ["Exercise", "Yoga"]).

Important:

- Do **not** include any text outside of the JSON output.
- Don not include json``` in the output.
- Ensure the new events fit within the user's available time between 08:00 and 22:00.

Example Output:

[{{
  "title": "Morning Run",
  "description": "A refreshing run in the park.",
  "location": "Central Park",
  "start": "2024-09-05T08:00:00",
  "end": "2024-09-05T08:45:00",
  "duration": 45,
  "time": "8:00 AM - 8:45 AM",
  "type": ["Exercise", "Running"]
}},
{{
  "title": "Evening Yoga Session",
  "description": "A relaxing yoga session to unwind after a busy day.",
  "location": "Local Yoga Studio",
  "start": "2024-09-05T18:00:00",
  "end": "2024-09-05T19:00:00",
  "duration": 60,
  "time": "6:00 PM - 7:00 PM",
  "type": ["Exercise", "Yoga", "Relaxation"]
}}]
"""

model = OllamaLLM(model="llama3.1")
prompt = ChatPromptTemplate.from_template(templateUserScheduling)
chain = prompt | model

def generate_prompt(today, otherSchedule):
    new_prompt = chain.invoke({ "today": today, "otherSchedule": otherSchedule })
    return new_prompt