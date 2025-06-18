import {pgTable, text, uuid, integer, boolean, timestamp} from 'drizzle-orm/pg-core'
import {relations} from 'drizzle-orm'

export const files = pgTable("files", {
    id: uuid().defaultRandom().primaryKey(),
    name: text('name').notNull(),
    path: text('path').notNull(),
    size: integer('size').notNull(),
    type: text('type').notNull(),
    fileUrl: text('file_url').notNull(),
    thumbnailUrl: text('thumbnail'),
    userId: text('user_id').notNull(),
    parentId: uuid('parent_id'), // Parent folder if (null for root items)
    isFolder: boolean('is_folder').default(false).notNull(),
    isStarred: boolean('is_starred').default(false).notNull(),
    isTrash: boolean('is_trash').default(false).notNull(),

    //Timestamps
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('created_at').defaultNow().notNull()
})

/*
parent: Each File/Folder can have one parent folder
children: Each Folder can have many child files/folder
 */
export const filesRelations = relations(files, ({one, many}) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),

    // relationship to child file/folder
    children: many(files)
}))

export const File = typeof files.$inferSelect
export const NewFile = typeof files.$inferInsert