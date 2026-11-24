const {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp
} = require("drizzle-orm/pg-core");

const items = pgTable("items", {

  id: serial("id").primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  url: text("url"),

  category: varchar("category", { length: 50 }).notNull(),

  notes: text("notes"),

  isFavorite: boolean("is_favorite").default(false).notNull(),

  isArchived: boolean("is_archived").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull()

});

module.exports = { items };