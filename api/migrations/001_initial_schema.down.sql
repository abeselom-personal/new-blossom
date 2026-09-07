-- Rollback: Drop all tables and functions

DROP TRIGGER IF EXISTS trg_testimonials_updated ON testimonials;
DROP TRIGGER IF EXISTS trg_site_settings_updated ON site_settings;
DROP TRIGGER IF EXISTS trg_bookings_updated ON bookings;
DROP TRIGGER IF EXISTS trg_wellness_retreats_updated ON wellness_retreats;
DROP TRIGGER IF EXISTS trg_heritage_tours_updated ON heritage_tours;
DROP TRIGGER IF EXISTS trg_menu_items_updated ON menu_items;
DROP TRIGGER IF EXISTS trg_dining_venues_updated ON dining_venues;
DROP TRIGGER IF EXISTS trg_spa_services_updated ON spa_services;
DROP TRIGGER IF EXISTS trg_rooms_updated ON rooms;
DROP TRIGGER IF EXISTS trg_admin_users_updated ON admin_users;

DROP FUNCTION IF EXISTS update_updated_at();

DROP TABLE IF EXISTS testimonial_translations;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS site_setting_translations;
DROP TABLE IF EXISTS site_settings;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS wellness_retreat_translations;
DROP TABLE IF EXISTS wellness_retreats;
DROP TABLE IF EXISTS heritage_tour_translations;
DROP TABLE IF EXISTS heritage_tours;
DROP TABLE IF EXISTS menu_item_translations;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS dining_venue_translations;
DROP TABLE IF EXISTS dining_venues;
DROP TABLE IF EXISTS spa_service_translations;
DROP TABLE IF EXISTS spa_services;
DROP TABLE IF EXISTS room_translations;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS admin_users;
