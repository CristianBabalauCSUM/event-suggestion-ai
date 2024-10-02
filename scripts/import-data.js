const axios = require('axios');
const fs = require('fs');

const URL = 'http://localhost:8000/schedule'

const data = [
    {
        title: 'Team Stand-up Meeting',
        description: 'Daily sync-up with the project team',
        location: 'Zoom',
        start: '2024-09-04T09:00:00',
        end: '2024-09-02T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Meeting', 'Team', 'Stand-up', 'Comedy'],
        date: '2024-09-04',
    },
    {
        title: 'Tennis in the Park',
        description: 'Daily sync-up with the project team',
        location: 'Zoom',
        start: '2024-09-02T09:00:00',
        end: '2024-09-02T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Sports', 'Tennis', 'Park', 'Active', 'Fun', 'Healthy', 'Exercise'],
        date: '2024-09-02',
    },
    {
        title: 'Park walking with pets',
        description: 'Daily sync-up with the project team',
        location: 'Zoom',
        start: '2024-09-03T09:00:00',
        end: '2024-09-07T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social','Pets', 'Walking', 'Park', 'Active', 'Fun', 'Healthy', 'Exercise'],
        date: '2024-09-03',
    },
    {
        title: 'Picnic by the Lake',
        description: 'Daily sync-up with the project team ',
        location: 'Zoom',
        start: '2024-09-04T09:00:00',
        end: '2024-09-06T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social', 'Picnic', 'Lake', 'Active', 'Fun', 'Healthy', 'Exercise'],
        date: '2024-09-04',
    },
    {
        title: 'Hiking in the Mountains',
        description: 'Daily sync-up with the project team ',
        location: 'Zoom',
        start: '2024-09-14T09:00:00',
        end: '2024-09-16T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social', 'Hiking', 'Mountains', 'Active', 'Fun', 'Healthy', 'Exercise'],
        date: '2024-09-14',
    },
    {
        title: 'Ping Pong Tournament',
        description: 'Daily sync-up with the project team ',
        location: 'Zoom',
        start: '2024-09-14T09:00:00',
        end: '2024-09-16T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social', 'Ping Pong', 'Tournament', 'Active', 'Fun', 'Healthy', 'Exercise'],
        date: '2024-09-14',
    },
    
    {
        title: 'Foot Ball Tournament',
        description: 'Daily sync-up with the project team ',
        location: 'Zoom',
        start: '2024-09-14T09:00:00',
        end: '2024-09-16T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social', 'Foot Ball', 'Tournament', 'Active', 'Fun', 'Healthy', 'Exercise'],
        date: '2024-09-14',
    },

    {
        title: 'Meditation in the Park',
        description: 'Daily sync-up with the project team ',
        location: 'Zoom',
        start: '2024-09-14T09:00:00',
        end: '2024-09-16T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social', 'Meditaion', 'Active', 'Fun', 'Healthy', 'Exercise', 'Mental', 'Peace'],
        date: '2024-09-14',
    },

];

const generateDates = (prefix) =>{
    const dates = [];
    for (let i = 1; i <= 30; i++) {
        dates.push(`${prefix}${i}`);
    }
    return dates;
}

const writeJsonToFile = async (date, data) => {
    const readJson = fs.readFileSync('./scripts/data.json', 'utf8');
    const jsonData = JSON.parse(readJson);
    jsonData[date] = data;
    fs.writeFileSync('./scripts/data.json', JSON.stringify(jsonData));
}

const dates = generateDates('2024-09-');

const fetchData = async (today, otherSchedule) => {
    const response = await axios.post(URL, {
            today,
            otherSchedule
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
    });
    const json = response.data;
    return JSON.parse(json.suggestions);
}

(async () => {
    for (const date of dates) {
        console.log('Processing date:', date);
        const todaySchedule = data.filter((item) => item.date === date);
        const otherSchedule = data.filter((item) => item.date !== date);

        const suggestion = await fetchData(todaySchedule, otherSchedule);
        await writeJsonToFile(date, suggestion);
    }
})();


