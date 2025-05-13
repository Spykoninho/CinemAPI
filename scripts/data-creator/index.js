const dotenv = require('dotenv');
dotenv.config();

// --- Configuration ---
const API_BASE_URL = process.env.API_BASE_URL;
const AUTH_BEARER = `Bearer ${process.env.AUTH_BEARER}`;

// --- Données de base statiques ---
const dataToCreate = {
    movies: [
        {
            placeholder_id: 1,
            name: "Le Réveil de l'Ancienne Forêt",
            duration: 145,
            description: 'Une aventure épique dans un monde oublié.',
        },
        {
            placeholder_id: 2,
            name: 'Monsieur Henri et le Facteur',
            duration: 92,
            description: 'Une comédie touchante sur une amitié improbable.',
        },
        {
            placeholder_id: 3,
            name: 'Code Rouge: Traque à Moscou',
            duration: 128,
            description: "Un thriller d'espionnage intense.",
        },
        {
            placeholder_id: 4,
            name: 'Les Chroniques de Zylos (Animation)',
            duration: 88,
            description: 'Les héros de Zylos sauvent la galaxie.',
        },
        {
            placeholder_id: 5,
            name: 'Après la Pluie',
            duration: 110,
            description: 'Un drame familial émouvant.',
        },
    ],
    rooms: [
        {
            placeholder_id: 1,
            name: 'Salle Aurore',
            description: 'Salle principale confortable.',
            capacity: 200,
            type: 'STANDARD',
            handicap_friendly: true,
            maintenance: false,
        },
        {
            placeholder_id: 2,
            name: 'Salle Crépuscule',
            description: 'Salle premium avec son immersif.',
            capacity: 150,
            type: 'IMAX',
            handicap_friendly: true,
            maintenance: false,
        },
        {
            placeholder_id: 3,
            name: 'Salle Zenith',
            description: 'Petite salle intimiste.',
            capacity: 75,
            type: 'STANDARD',
            handicap_friendly: false,
            maintenance: false,
        },
    ],
    tickets: [
        { placeholder_session_id: 1, userId: 101, isSuperTicket: false },
        { placeholder_session_id: 2, userId: 102, isSuperTicket: false },
        { placeholder_session_id: 7, userId: 103, isSuperTicket: false },
        { placeholder_session_id: 8, userId: 104, isSuperTicket: false },
        { placeholder_session_id: 13, userId: 101, isSuperTicket: false },
        { placeholder_session_id: 25, userId: 105, isSuperTicket: false },
        { placeholder_session_id: 50, userId: 106, isSuperTicket: false },
        { placeholder_session_id: 100, userId: 107, isSuperTicket: false },
        { placeholder_session_id: 150, userId: 108, isSuperTicket: false },
        {
            sessionId: null,
            userId: 201,
            isSuperTicket: true,
            remainingSessions: 5,
        },
        {
            sessionId: null,
            userId: 202,
            isSuperTicket: true,
            remainingSessions: 10,
        },
    ],
};

// --- Helpers ---

const movieDurations = new Map();
dataToCreate.movies.forEach((movie) => {
    movieDurations.set(movie.placeholder_id, movie.duration);
});

// --- Génération Statique des Sessions ---
function generateStaticSessions(numDays, sessionsPerRoomPerDay, movies, rooms) {
    const sessions = [];
    const usableRooms = rooms.filter((room) => !room.maintenance);
    const numUsableRooms = usableRooms.length;
    const numMovies = movies.length;
    const minStartHourUTC = 9;
    const maxEndHourUTC = 20;
    const startTimesUTC = [
        { hour: 10, minute: 0 },
        { hour: 14, minute: 30 },
    ];

    console.log(
        `\n--- Generating ${sessionsPerRoomPerDay} sessions per room per day for ${numDays} days ---`,
    );
    console.log(
        `(Constraint: Start >= ${minStartHourUTC}:00 UTC, End <= ${maxEndHourUTC}:00 UTC)`,
    );

    for (let day = 1; day <= numDays; day++) {
        for (let roomIndex = 0; roomIndex < numUsableRooms; roomIndex++) {
            const room = usableRooms[roomIndex];

            for (
                let sessionIndex = 0;
                sessionIndex < sessionsPerRoomPerDay;
                sessionIndex++
            ) {
                const movieIndex = (day + roomIndex + sessionIndex) % numMovies;
                const movie = movies[movieIndex];
                const duration = movieDurations.get(movie.placeholder_id);

                if (!duration) continue;

                const startTimeInfo =
                    startTimesUTC[sessionIndex % startTimesUTC.length];

                const startDate = new Date();
                startDate.setUTCDate(startDate.getUTCDate() + day);
                startDate.setUTCHours(
                    startTimeInfo.hour,
                    startTimeInfo.minute,
                    0,
                    0,
                );

                const endDate = new Date(
                    startDate.getTime() + duration * 60000,
                );

                const startHourCheck = startDate.getUTCHours();
                const endHourCheck = endDate.getUTCHours();
                const endMinutesCheck = endDate.getUTCMinutes();
                const endSecondsCheck = endDate.getUTCSeconds();
                const endMsCheck = endDate.getUTCMilliseconds();

                const isStartTimeValid = startHourCheck >= minStartHourUTC;
                const isEndTimeValid =
                    endHourCheck < maxEndHourUTC ||
                    (endHourCheck === maxEndHourUTC &&
                        endMinutesCheck === 0 &&
                        endSecondsCheck === 0 &&
                        endMsCheck === 0);

                if (isStartTimeValid && isEndTimeValid) {
                    sessions.push({
                        placeholder_movie_id: movie.placeholder_id,
                        placeholder_room_id: room.placeholder_id,
                        start_session: startDate.toISOString(),
                        end_session: endDate.toISOString(),
                    });
                } else {
                    console.warn(
                        `Skipped session generation: Day ${day}, Room ${room.placeholder_id}, Movie ${movie.placeholder_id}, Start ${startTimeInfo.hour}:${startTimeInfo.minute} UTC (End time ${endDate.toISOString()} exceeds ${maxEndHourUTC}:00 UTC)`,
                    );
                }
            }
        }
    }
    console.log(`Generated ${sessions.length} sessions.`);
    return sessions;
}

const sessionsToCreate = generateStaticSessions(
    30,
    2,
    dataToCreate.movies,
    dataToCreate.rooms,
);

// --- Fonction pour appeler l'API (inchangée) ---
async function callApi(endpoint, method, data) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`\nCalling ${method} ${url}`);
    if (data) {
        console.log('Payload:', JSON.stringify(data, null, 2));
    }

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: AUTH_BEARER,
        },
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            let errorBody = 'N/A';
            try {
                errorBody = await response.text();
            } catch (e) {
                console.error('Error reading response body:', e.message);
            }
            throw new Error(
                `API Error: ${response.status} ${response.statusText}\nResponse Body:\n${errorBody}`,
            );
        }

        if (response.status === 201 || response.status === 200) {
            try {
                const responseData = await response.json();
                console.log(
                    'API Success:',
                    response.status,
                    response.statusText,
                );
                return responseData;
            } catch (e) {
                console.log(
                    'API Success:',
                    response.status,
                    response.statusText,
                    '(No JSON Body)',
                );
                return null;
            }
        } else {
            console.log('API Success:', response.status, response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Fetch Error:', error.message);
        throw error;
    }
}

// --- Logique principale d'exécution ---
async function createData() {
    const createdMovieIds = new Map();
    const createdRoomIds = new Map();
    const createdSessionIds = [];

    if (sessionsToCreate.length === 0) {
        console.error(
            'No sessions were generated. Check constraints or generation logic. Stopping script.',
        );
        return;
    }

    try {
        console.log('\n--- Creating Movies ---');
        for (const movieData of dataToCreate.movies) {
            const payload = { ...movieData };
            delete payload.placeholder_id;
            const createdMovie = await callApi('/movies', 'POST', payload);
            if (createdMovie && createdMovie.id) {
                createdMovieIds.set(movieData.placeholder_id, createdMovie.id);
            } else {
                console.warn(
                    'Could not get ID for created movie:',
                    movieData.name,
                );
            }
        }
        console.log('Movies created. Mapping:', createdMovieIds);

        console.log('\n--- Creating Rooms ---');
        for (const roomData of dataToCreate.rooms) {
            const payload = { ...roomData };
            delete payload.placeholder_id;
            if (roomData.maintenance) {
                console.log(
                    `Skipping creation of room '${roomData.name}' (maintenance).`,
                );
                continue;
            }
            const createdRoom = await callApi('/rooms', 'POST', payload);
            if (createdRoom && createdRoom.id) {
                createdRoomIds.set(roomData.placeholder_id, createdRoom.id);
            } else {
                console.warn(
                    'Could not get ID for created room:',
                    roomData.name,
                );
            }
        }
        console.log('Rooms created. Mapping:', createdRoomIds);

        console.log(`\n--- Creating ${sessionsToCreate.length} Sessions ---`);
        for (const sessionData of sessionsToCreate) {
            const realMovieId = createdMovieIds.get(
                sessionData.placeholder_movie_id,
            );
            const realRoomId = createdRoomIds.get(
                sessionData.placeholder_room_id,
            );

            if (!realMovieId || !realRoomId) {
                console.warn(
                    `Skipping session creation: Cannot find real ID for Movie (placeholder ${sessionData.placeholder_movie_id}) or Room (placeholder ${sessionData.placeholder_room_id}).`,
                );
                createdSessionIds.push(null);
                continue;
            }

            const payload = {
                startSession: sessionData.start_session,
                endSession: sessionData.end_session,
                idMovie: realMovieId,
                idRoom: realRoomId,
            };

            const createdSession = await callApi('/sessions', 'POST', payload);
            if (createdSession && createdSession.id) {
                createdSessionIds.push(createdSession.id);
            } else {
                console.warn('Could not get ID for created session:', payload);
                createdSessionIds.push(null);
            }
        }
        console.log(
            `Sessions creation attempted. ${createdSessionIds.filter((id) => id !== null).length} successful.`,
        );

        console.log('\n--- Creating Tickets ---');
        let createdTicketsCount = 0;
        for (const ticketData of dataToCreate.tickets) {
            const payload = { ...ticketData };

            if (
                payload.placeholder_session_id !== undefined &&
                payload.placeholder_session_id !== null
            ) {
                const sessionIndex = payload.placeholder_session_id - 1;

                if (
                    sessionIndex >= 0 &&
                    sessionIndex < createdSessionIds.length &&
                    createdSessionIds[sessionIndex] !== null
                ) {
                    payload.sessionId = createdSessionIds[sessionIndex];
                } else {
                    console.warn(
                        `Skipping ticket creation: Cannot find valid Session ID for placeholder ${payload.placeholder_session_id}.`,
                    );
                    delete payload.placeholder_session_id;
                    continue;
                }
                delete payload.placeholder_session_id;
            } else {
                delete payload.placeholder_session_id;
            }

            await callApi('/tickets', 'POST', payload);
            createdTicketsCount++;
        }
        console.log(`${createdTicketsCount} Tickets creation attempted.`);

        console.log('\n--- Data Creation Script Finished Successfully ---');
    } catch (error) {
        console.error('\n--- SCRIPT FAILED ---');
        console.error('An error occurred during the process:', error.message);
    }
}

createData();
