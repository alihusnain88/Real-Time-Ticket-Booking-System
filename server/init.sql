-- ============================================
-- USERS
-- ============================================

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================
-- VENUES
-- ============================================

CREATE TABLE venues (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


INSERT INTO venues (name, location)
VALUES
    ('The Arena', 'Lahore, Pakistan'),
    ('Expo Center', 'Lahore, Pakistan');


-- ============================================
-- EVENTS
-- ============================================

CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    venue_id BIGINT NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_events_venue
        FOREIGN KEY (venue_id)
        REFERENCES venues(id)
);


INSERT INTO events (name, venue_id, starts_at)
VALUES
    ('Live Concert', 1, '2026-10-10 19:00:00+05'),
    ('Tech Conference', 2, '2026-10-15 10:00:00+05'),
    ('Comedy Night', 1, '2026-10-20 20:00:00+05'),
    ('Rock Music Festival', 1, '2026-10-25 19:30:00+05'),
    ('Startup Summit Pakistan', 2, '2026-10-28 09:30:00+05'),
    ('Stand Up Comedy Live', 1, '2026-11-02 20:00:00+05'),
    ('AI & Future Tech Expo', 2, '2026-11-05 10:00:00+05'),
    ('Jazz Night Lahore', 1, '2026-11-10 19:00:00+05'),
    ('Gaming Championship', 2, '2026-11-14 14:00:00+05'),
    ('Business Leadership Conference', 2, '2026-11-18 09:00:00+05'),
    ('Pakistani Music Night', 1, '2026-11-22 19:30:00+05'),
    ('Food & Culture Festival', 2, '2026-11-27 17:00:00+05'),
    ('New Year Countdown Concert', 1, '2026-12-31 21:00:00+05');


-- ============================================
-- SEATS
-- ============================================

CREATE TABLE seats (
    id BIGSERIAL PRIMARY KEY,
    seatNumber VARCHAR(20) NOT NULL,
    venue_id BIGINT NOT NULL,
    row VARCHAR(20) NOT NULL,

    CONSTRAINT fk_seats_venue
        FOREIGN KEY (venue_id)
        REFERENCES venues(id),

    CONSTRAINT unique_seat_per_venue
        UNIQUE (seatNumber, venue_id)
);


-- Additional seats for The Arena
INSERT INTO seats (seatNumber, venue_id, row)
SELECT
    'A' || n,
    1,
    'A'
FROM generate_series(1, 50) AS n;


-- Additional seats for Expo Center
INSERT INTO seats (seatNumber, venue_id, row)
SELECT
    'A' || n,
    2,
    'A'
FROM generate_series(1, 50) AS n;


-- ============================================
-- EVENT SEATS
-- ============================================

CREATE TABLE event_seats (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL,
    seat_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available',
    held_by BIGINT REFERENCES users(id),
    held_at TIMESTAMP,

    CONSTRAINT fk_event_seats_event
        FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_event_seats_seat
        FOREIGN KEY (seat_id)
        REFERENCES seats(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_event_seat
        UNIQUE (event_id, seat_id)
);


-- ============================================
-- BOOKINGS
-- ============================================

CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_bookings_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_bookings_event
        FOREIGN KEY (event_id)
        REFERENCES events(id)
);

-- ============================================
-- BOOKING SEATS
-- ============================================
CREATE TABLE booking_seats (
    booking_id BIGINT NOT NULL,
    seat_id BIGINT NOT NULL,

    CONSTRAINT pk_booking_seats
        PRIMARY KEY (booking_id, seat_id),

    CONSTRAINT fk_booking_seats_booking
        FOREIGN KEY (booking_id)
        REFERENCES bookings(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_booking_seats_seat
        FOREIGN KEY (seat_id)
        REFERENCES seats(id)
        ON DELETE CASCADE
);

-- ============================================
-- CREATE EVENT-SEAT RECORDS
-- ============================================

INSERT INTO event_seats (event_id, seat_id)
SELECT
    e.id,
    s.id
FROM events e
JOIN seats s
    ON e.venue_id = s.venue_id
WHERE NOT EXISTS (
    SELECT 1
    FROM event_seats es
    WHERE es.event_id = e.id
      AND es.seat_id = s.id
);
