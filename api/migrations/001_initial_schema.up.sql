-- ═══════════════════════════════════════════════════════════════
-- New Blossom Hotel & Spa — CMS Schema
-- Migration 001: Initial schema
-- ═══════════════════════════════════════════════════════════════

-- ── Extensions ──
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Admin Users ──
CREATE TABLE admin_users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    name        TEXT NOT NULL,
    role        TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'viewer')),
    is_active   BOOLEAN NOT NULL DEFAULT true,
    last_login  TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Generic content tables with i18n support ──
-- Each content type has a base table + a translations table for en/am

-- ── Rooms / Suites ──
CREATE TABLE rooms (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug            TEXT NOT NULL UNIQUE,
    image_url       TEXT,
    gallery_urls    JSONB NOT NULL DEFAULT '[]',
    price           NUMERIC(10,2),
    capacity        INTEGER NOT NULL DEFAULT 2,
    size_sqm        INTEGER,
    bed_type        TEXT,
    amenities       JSONB NOT NULL DEFAULT '[]',
    is_featured     BOOLEAN NOT NULL DEFAULT false,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_published    BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE room_translations (
    room_id     UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    locale      TEXT NOT NULL CHECK (locale IN ('en', 'am')),
    name        TEXT NOT NULL,
    description TEXT NOT NULL,
    features    JSONB NOT NULL DEFAULT '[]',
    PRIMARY KEY (room_id, locale)
);

-- ── Spa Services ──
CREATE TABLE spa_services (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug            TEXT NOT NULL UNIQUE,
    image_url       TEXT,
    gallery_urls    JSONB NOT NULL DEFAULT '[]',
    duration_mins   INTEGER,
    price           NUMERIC(10,2),
    is_featured     BOOLEAN NOT NULL DEFAULT false,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_published    BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE spa_service_translations (
    spa_service_id  UUID NOT NULL REFERENCES spa_services(id) ON DELETE CASCADE,
    locale          TEXT NOT NULL CHECK (locale IN ('en', 'am')),
    name            TEXT NOT NULL,
    description     TEXT NOT NULL,
    benefits        JSONB NOT NULL DEFAULT '[]',
    PRIMARY KEY (spa_service_id, locale)
);

-- ── Dining Venues ──
CREATE TABLE dining_venues (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug            TEXT NOT NULL UNIQUE,
    image_url       TEXT,
    gallery_urls    JSONB NOT NULL DEFAULT '[]',
    hours           TEXT,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_published    BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE dining_venue_translations (
    dining_venue_id UUID NOT NULL REFERENCES dining_venues(id) ON DELETE CASCADE,
    locale          TEXT NOT NULL CHECK (locale IN ('en', 'am')),
    name            TEXT NOT NULL,
    description     TEXT NOT NULL,
    PRIMARY KEY (dining_venue_id, locale)
);

-- ── Menu Items (restaurant menu) ──
CREATE TABLE menu_items (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venue_id        UUID REFERENCES dining_venues(id) ON DELETE SET NULL,
    category        TEXT NOT NULL,
    image_url       TEXT,
    price           NUMERIC(10,2) NOT NULL,
    is_available    BOOLEAN NOT NULL DEFAULT true,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_published    BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE menu_item_translations (
    menu_item_id    UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    locale          TEXT NOT NULL CHECK (locale IN ('en', 'am')),
    name            TEXT NOT NULL,
    description     TEXT,
    PRIMARY KEY (menu_item_id, locale)
);

-- ── Heritage Tours / Excursions ──
CREATE TABLE heritage_tours (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug            TEXT NOT NULL UNIQUE,
    image_url       TEXT,
    gallery_urls    JSONB NOT NULL DEFAULT '[]',
    duration_hours  INTEGER,
    price           NUMERIC(10,2),
    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_published    BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE heritage_tour_translations (
    heritage_tour_id    UUID NOT NULL REFERENCES heritage_tours(id) ON DELETE CASCADE,
    locale              TEXT NOT NULL CHECK (locale IN ('en', 'am')),
    name                TEXT NOT NULL,
    description         TEXT NOT NULL,
    highlights          JSONB NOT NULL DEFAULT '[]',
    PRIMARY KEY (heritage_tour_id, locale)
);

-- ── Wellness Retreats ──
CREATE TABLE wellness_retreats (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug            TEXT NOT NULL UNIQUE,
    image_url       TEXT,
    gallery_urls    JSONB NOT NULL DEFAULT '[]',
    duration_days   INTEGER NOT NULL,
    price           NUMERIC(10,2),
    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_published    BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE wellness_retreat_translations (
    wellness_retreat_id UUID NOT NULL REFERENCES wellness_retreats(id) ON DELETE CASCADE,
    locale              TEXT NOT NULL CHECK (locale IN ('en', 'am')),
    name                TEXT NOT NULL,
    description         TEXT NOT NULL,
    inclusions          JSONB NOT NULL DEFAULT '[]',
    itinerary           JSONB NOT NULL DEFAULT '[]',
    PRIMARY KEY (wellness_retreat_id, locale)
);

-- ── Bookings (spa & stay inquiries) ──
CREATE TABLE bookings (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type            TEXT NOT NULL CHECK (type IN ('stay', 'spa', 'dining', 'heritage', 'wellness')),
    reference_id    UUID,
    guest_name      TEXT NOT NULL,
    guest_email     TEXT NOT NULL,
    guest_phone     TEXT,
    check_in        DATE,
    check_out       DATE,
    adults          INTEGER NOT NULL DEFAULT 1,
    children        INTEGER NOT NULL DEFAULT 0,
    notes           TEXT,
    status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Site Settings (key-value with i18n) ──
CREATE TABLE site_settings (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key         TEXT NOT NULL UNIQUE,
    type        TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'json', 'image', 'contact')),
    is_public   BOOLEAN NOT NULL DEFAULT true,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE site_setting_translations (
    setting_id  UUID NOT NULL REFERENCES site_settings(id) ON DELETE CASCADE,
    locale      TEXT NOT NULL CHECK (locale IN ('en', 'am')),
    value       TEXT NOT NULL,
    PRIMARY KEY (setting_id, locale)
);

-- ── Testimonials ──
CREATE TABLE testimonials (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url       TEXT,
    rating          INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_published    BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE testimonial_translations (
    testimonial_id  UUID NOT NULL REFERENCES testimonials(id) ON DELETE CASCADE,
    locale          TEXT NOT NULL CHECK (locale IN ('en', 'am')),
    author_name     TEXT NOT NULL,
    author_location TEXT,
    quote           TEXT NOT NULL,
    PRIMARY KEY (testimonial_id, locale)
);

-- ── Indexes ──
CREATE INDEX idx_rooms_slug ON rooms(slug);
CREATE INDEX idx_rooms_published ON rooms(is_published);
CREATE INDEX idx_spa_services_slug ON spa_services(slug);
CREATE INDEX idx_spa_services_published ON spa_services(is_published);
CREATE INDEX idx_dining_venues_slug ON dining_venues(slug);
CREATE INDEX idx_menu_items_venue ON menu_items(venue_id);
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_heritage_tours_slug ON heritage_tours(slug);
CREATE INDEX idx_wellness_retreats_slug ON wellness_retreats(slug);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_type ON bookings(type);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);
CREATE INDEX idx_site_settings_key ON site_settings(key);

-- ── Auto-update updated_at ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_admin_users_updated BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_rooms_updated BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_spa_services_updated BEFORE UPDATE ON spa_services FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_dining_venues_updated BEFORE UPDATE ON dining_venues FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_menu_items_updated BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_heritage_tours_updated BEFORE UPDATE ON heritage_tours FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_wellness_retreats_updated BEFORE UPDATE ON wellness_retreats FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Seed: Default admin user ──
-- Password: admin123 (bcrypt hash — will be set by the app on first run)
INSERT INTO admin_users (email, password, name, role)
VALUES ('admin@newblossomdiredawa.com', '$2a$10$PLACEHOLDER_HASH_WILL_BE_UPDATED', 'Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- ── Seed: Default site settings ──
INSERT INTO site_settings (key, type, is_public) VALUES
    ('hotel_name', 'text', true),
    ('hotel_tagline', 'text', true),
    ('phone', 'contact', true),
    ('email', 'contact', true),
    ('address', 'contact', true),
    ('social_links', 'json', true),
    ('hero_image', 'image', true),
    ('meta_description', 'text', true)
ON CONFLICT (key) DO NOTHING;
