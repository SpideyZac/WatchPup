-- ------------------------------
-- OPTION
-- ------------------------------

OPTION IMPORT;

-- ------------------------------
-- TABLE: develops_service
-- ------------------------------

DEFINE TABLE develops_service TYPE RELATION IN user OUT service SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD can_edit ON develops_service TYPE bool PERMISSIONS FULL;
DEFINE FIELD in ON develops_service TYPE record<user> PERMISSIONS FULL;
DEFINE FIELD out ON develops_service TYPE record<service> PERMISSIONS FULL;

-- ------------------------------
-- TABLE: owns_service
-- ------------------------------

DEFINE TABLE owns_service TYPE RELATION IN user OUT service SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD in ON owns_service TYPE record<user> PERMISSIONS FULL;
DEFINE FIELD out ON owns_service TYPE record<service> PERMISSIONS FULL;

-- ------------------------------
-- TABLE: request
-- ------------------------------

DEFINE TABLE request TYPE NORMAL SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD created_at ON request TYPE datetime DEFAULT time::now() PERMISSIONS FULL;
DEFINE FIELD headers ON request FLEXIBLE TYPE object PERMISSIONS FULL;
DEFINE FIELD response ON request TYPE string PERMISSIONS FULL;
DEFINE FIELD response_time ON request TYPE int PERMISSIONS FULL;
DEFINE FIELD status ON request TYPE int PERMISSIONS FULL;

-- ------------------------------
-- TABLE: requested_service
-- ------------------------------

DEFINE TABLE requested_service TYPE RELATION IN request OUT service SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD in ON requested_service TYPE record<request> PERMISSIONS FULL;
DEFINE FIELD out ON requested_service TYPE record<service> PERMISSIONS FULL;

-- ------------------------------
-- TABLE: service
-- ------------------------------

DEFINE TABLE service TYPE NORMAL SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD created_at ON service TYPE datetime DEFAULT time::now() PERMISSIONS FULL;
DEFINE FIELD method ON service TYPE string PERMISSIONS FULL;
DEFINE FIELD name ON service TYPE string PERMISSIONS FULL;
DEFINE FIELD url ON service TYPE string PERMISSIONS FULL;

-- ------------------------------
-- TABLE: user
-- ------------------------------

DEFINE TABLE user TYPE NORMAL SCHEMAFULL PERMISSIONS NONE;

DEFINE FIELD created_at ON user TYPE datetime DEFAULT time::now() PERMISSIONS FULL;
DEFINE FIELD email ON user TYPE string PERMISSIONS FULL;
DEFINE FIELD password ON user TYPE string PERMISSIONS FULL;
DEFINE FIELD username ON user TYPE string PERMISSIONS FULL;
DEFINE FIELD verified ON user TYPE bool PERMISSIONS FULL;

DEFINE INDEX email_unique ON user FIELDS email UNIQUE;
DEFINE INDEX username_unique ON user FIELDS username UNIQUE;