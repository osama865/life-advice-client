
import Dexie from "dexie";
import React from 'react'

export default function UseIndexedDB() {
    const db = new Dexie('mydb');
    db.version(1).stores({ advises: '++id' });
    // localStorage.setItem('count', parseInt(0))

    const insert = (doc) => {
        // delete(doc._id)
        return db.advises.put(doc).then(id => {
        })
    }

    const findOne = async (selector) => {
        try {
            return await db.advises.get(selector)
        } catch (error) {
            console.error(error);
        }

    }


    const find = async () => {
        try {
            let res = await db.advises.toArray()
            return res
        } catch {

        }
    }


    const update = (id, newValu) => {
        db.advises.update(id, newValu)
    }

    const remove = (selector) => {
        db.advises.delete(selector)
    }
    return { insert, remove, find, findOne, update }
}

export { UseIndexedDB }

